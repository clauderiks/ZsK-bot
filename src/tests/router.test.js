import { describe,it,expect } from "vitest";
import { router } from "../router/index.js";

describe("router",()=>{

it("should return a response",async()=>{

const result=await router("Hello");

expect(result).toBeDefined();

});

});
