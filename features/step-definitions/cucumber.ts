import type Spec from "pactum/src/models/Spec";
import { typedSteps } from "./cucumber-typed-wrapper.helper";
import type { spec } from "pactum";

type Context = {
  discordSpec: typeof spec;
  webhook: {
    id: string;
    token: string;
    path: string;
  };
  spec?: Spec;
};

export const { given, when, then, before, after } = typedSteps<Context>();
