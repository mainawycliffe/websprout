import type { TagNode } from "@/types/tag-builder";
import type { ValidationError } from "@/types/tag-builder";

export function validateTags(nodes: TagNode[]): ValidationError[] {
  const errors: ValidationError[] = [];

  function walk(node: TagNode) {
    if (node.error) {
      errors.push({
        type: node.error.type,
        message: node.error.message,
        position: node.error.position,
        severity: "error",
      });
    }

    for (const child of node.children) {
      walk(child);
    }
  }

  for (const node of nodes) {
    walk(node);
  }

  return errors;
}
