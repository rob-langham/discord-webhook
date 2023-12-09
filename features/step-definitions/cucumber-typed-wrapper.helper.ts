import assert from "assert";
import {
  Given,
  When,
  Then,
  Before,
  BeforeAll,
  After,
  AfterAll,
  IWorld,
  BeforeStep,
  AfterStep,
} from "@cucumber/cucumber";
import { IDefineStep } from "@cucumber/cucumber/lib/support_code_library_builder/types";

function isItFriday(today: string) {
  return today === "Friday" ? "TGIF" : "Nope";
}

type obj = { [key: string]: any };
type World<Params, Context> = Pick<IWorld<Params>, "attach" | "log" | "parameters"> & Context;
//typescript wrapper for cucumber's Given function

function typedStepWrapper<Context = obj>(step: IDefineStep) {
  return (pattern: string, fn: (this: World<any, Context>, ...args: any[]) => any | Promise<any>) =>
    step(pattern, fn);
}

export function typedSteps<Context = obj>() {
  return {
    given: typedStepWrapper<Context>(Given),
    when: typedStepWrapper<Context>(When),
    then: typedStepWrapper<Context>(Then),
    before: Before, // TODO
    beforeAll: BeforeAll, // TODO
    after: After, // TODO
    afterAll: AfterAll, // TODO
    beforeStep: BeforeStep, // TODO
    afterStep: AfterStep, // TODO
  };
}
