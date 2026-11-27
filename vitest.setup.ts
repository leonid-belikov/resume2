import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// RTL unmounts automatically only when Vitest globals are enabled; they are not.
afterEach(() => {
  cleanup();
});
