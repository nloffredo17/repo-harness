/**
 * Repo layer — may import from types, config.
 */

import type { ExampleItem } from "./types";
import { getExampleConfig } from "./config";

export function getExampleById(id: string): ExampleItem | null {
  const config = getExampleConfig();
  if (id === config.defaultItem.id) return config.defaultItem;
  return null;
}
