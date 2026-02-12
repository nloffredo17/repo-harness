"use client";

import type { ExampleItem } from "../types";

/**
 * UI layer — may import from types, runtime (not repo/service directly).
 */

type ExampleCardProps = { item: ExampleItem };

export function ExampleCard({ item }: ExampleCardProps) {
  return (
    <div className="rounded border p-4">
      <span className="font-medium">{item.name}</span>
      <span className="ml-2 text-sm text-gray-500">#{item.id}</span>
    </div>
  );
}
