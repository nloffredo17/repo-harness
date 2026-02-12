/**
 * Config layer — may import from types only.
 */

import type { ExampleItem } from "./types";

export type ExampleConfig = {
  defaultItem: ExampleItem;
};

export function getExampleConfig(): ExampleConfig {
  return {
    defaultItem: { id: "0", name: "Example" },
  };
}
