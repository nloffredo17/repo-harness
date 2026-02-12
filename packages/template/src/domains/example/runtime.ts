/**
 * Runtime layer — may import from types, config, repo, service.
 * Exposes domain operations for UI and API.
 */

import { findExample } from "./service";

export const exampleRuntime = {
  findExample,
};
