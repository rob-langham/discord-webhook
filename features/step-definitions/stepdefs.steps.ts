import assert from "assert";
import { typedSteps } from "./cucumber-typed-wrapper.helper";

function isItFriday(today: string) {
  return today === "Friday" ? "TGIF" : "Nope";
}

type Context = { today: string; actualAnswer: string };

const { given, when, then } = typedSteps<Context>();

given("today is Sunday", function () {
  this.today = "Friday";
});

given("today is Friday", function () {
  this.today = "Friday";
});

when("I ask whether it's Friday yet", function () {
  this.actualAnswer = isItFriday(this.today);
});

then("I should be told {string}", function (expectedAnswer) {
  assert.strictEqual(this.actualAnswer, expectedAnswer);
});
