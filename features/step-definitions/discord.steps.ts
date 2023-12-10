import { typedSteps } from "./cucumber-typed-wrapper.helper";
import { mock, spec } from "pactum";
import { faker } from "@faker-js/faker";

type Context = {
  discordSpec: typeof spec;
  webhook: {
    id: string;
    token: string;
    path: string;
  };
};

const { given, when, then, before, after } = typedSteps<Context>();

// setup context for each scenario
before(async function () {
  this.discordSpec = spec();
  const id = faker.string.hexadecimal();
  const token = faker.string.uuid();
  this.webhook = {
    id,
    token,
    path: `/api/webhooks/${id}/${token}`,
  };
});

given("a webhook was created", async function () {
  const { path } = this.webhook;
  mock.addInteraction({
    request: {
      method: "POST",
      path,
    },
    response: {
      status: 204,
    },
  });
});

given("a webhook was not created", async function () {
  const { path } = this.webhook;
  mock.addInteraction({
    request: {
      method: "POST",
      path,
    },
    response: {
      status: 401,
      body: {
        message: "Invalid Webhook Token",
        code: 50027,
      },
    },
  });
});

given(
  `the following template was stored with key {string}:`,
  async function (name: string, template: string) {
    console.log("name", name);
    console.log("template", template);
  }
);

then("the webook recieves message:", async function (message: string) {
  const { path } = this.webhook;
  console.log("path", path);
  console.log("message", message);
});
