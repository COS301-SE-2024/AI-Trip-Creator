import "@testing-library/jest-dom/extend-expect";
import { TextDecoder, TextEncoder } from "text-encoding";

if (typeof TextDecoder === "undefined") {
  global.TextDecoder = require("util").TextDecoder;
}

global.TextEncoder = TextEncoder;
