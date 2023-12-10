import assert from "assert";
import { typedSteps } from "./cucumber-typed-wrapper.helper";
import { mock, spec } from "pactum";
import { faker } from "@faker-js/faker";
import { given, when, then, before, after } from "./cucumber";
import { DataTable } from "@cucumber/cucumber";

const appUrl = `http://localhost:${process.env.PORT || 3000}`;

function parseInts(dataTable: { [k: string]: string }): { [k: string]: number | string } {
  const rows = Object.entries(dataTable).map(([key, value]) => [
    key,
    isNaN(+value) ? value : +value,
  ]);
  return Object.fromEntries(rows);
}

when(
  "the following template was stored with key {string} for the webhook:",
  async function (templateName: string, template: string) {
    await spec()
      .put(`${appUrl}/template`)
      .withJson({
        name: templateName,
        template: template,
        webhook: this.webhook.path,
      })
      .expectStatus(204);
  }
);

when(
  "the template test is called without any parameters for {string}",
  async function (template: string) {
    this.spec = spec();
    await this.spec
      .post(`${appUrl}/template/test`)
      .withHeaders({
        "Content-Type": "application/json",
      })
      .withJson({
        template,
      })
      .expectStatus(200)
      .toss();
  }
);

when(
  "the template test is called for {string}:",
  async function (template: string, dataTable: DataTable) {
    const params = parseInts(dataTable.rowsHash());
    this.spec = spec();
    await this.spec
      .post(`${appUrl}/template/test`)
      .withHeaders({
        "Content-Type": "application/json",
      })
      .withJson({
        ...params,
        template,
      })
      .expectStatus(200)
      .toss();
  }
);

then("the template is rendered as:", function (docString) {
  // Write code here that turns the phrase above into concrete actions
  this.spec!.response().should.have.body(docString);
});
