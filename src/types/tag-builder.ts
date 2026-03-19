export interface TagNode {
  type: "element" | "text" | "error";
  tagName?: string;
  children: TagNode[];
  content?: string;
  attributes?: TagAttribute[];
  error?: TagError;
  position: { start: number; end: number };
}

export interface TagAttribute {
  name: string;
  value: string;
}

export interface TagError {
  type: "unclosed" | "unexpected-close" | "mismatched" | "invalid-nesting";
  message: string;
  position: { start: number; end: number };
}

export interface ValidationError {
  type: TagError["type"];
  message: string;
  position: { start: number; end: number };
  severity: "error" | "warning";
}
