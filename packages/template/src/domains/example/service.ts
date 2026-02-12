/**
 * Service layer — may import from types, config, repo.
 */

import type { ExampleItem } from "./types";
import { getExampleById } from "./repo";

export function findExample(id: string): ExampleItem | null {
  return getExampleById(id);
}
