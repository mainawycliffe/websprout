import type { TagNode, TagAttribute } from "@/types/tag-builder";

const VOID_ELEMENTS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr",
]);

interface Token {
  type: "open" | "close" | "self-close" | "text" | "comment";
  tagName?: string;
  attributes?: TagAttribute[];
  content?: string;
  position: { start: number; end: number };
}

function tokenize(html: string): Token[] {
  const tokens: Token[] = [];
  let pos = 0;

  while (pos < html.length) {
    // Comment
    if (html.slice(pos, pos + 4) === "<!--") {
      const endIdx = html.indexOf("-->", pos + 4);
      const end = endIdx === -1 ? html.length : endIdx + 3;
      tokens.push({
        type: "comment",
        content: html.slice(pos, end),
        position: { start: pos, end },
      });
      pos = end;
      continue;
    }

    // Closing tag
    if (html.slice(pos, pos + 2) === "</") {
      const endIdx = html.indexOf(">", pos);
      if (endIdx === -1) {
        tokens.push({
          type: "text",
          content: html.slice(pos),
          position: { start: pos, end: html.length },
        });
        break;
      }
      const tagName = html.slice(pos + 2, endIdx).trim().toLowerCase();
      tokens.push({
        type: "close",
        tagName,
        position: { start: pos, end: endIdx + 1 },
      });
      pos = endIdx + 1;
      continue;
    }

    // Opening tag
    if (html[pos] === "<" && pos + 1 < html.length && /[a-zA-Z]/.test(html[pos + 1])) {
      const endIdx = html.indexOf(">", pos);
      if (endIdx === -1) {
        tokens.push({
          type: "text",
          content: html.slice(pos),
          position: { start: pos, end: html.length },
        });
        break;
      }

      const tagContent = html.slice(pos + 1, endIdx);
      const isSelfClosing = tagContent.endsWith("/");
      const cleanContent = isSelfClosing ? tagContent.slice(0, -1) : tagContent;
      const parts = cleanContent.trim().split(/\s+/);
      const tagName = parts[0].toLowerCase();

      // Parse attributes (simple)
      const attributes: TagAttribute[] = [];
      for (let i = 1; i < parts.length; i++) {
        const attrMatch = parts[i].match(/^([^=]+)(?:=(?:"([^"]*)"|'([^']*)'|(\S+)))?$/);
        if (attrMatch) {
          attributes.push({
            name: attrMatch[1],
            value: attrMatch[2] ?? attrMatch[3] ?? attrMatch[4] ?? "",
          });
        }
      }

      const isVoid = VOID_ELEMENTS.has(tagName) || isSelfClosing;
      tokens.push({
        type: isVoid ? "self-close" : "open",
        tagName,
        attributes,
        position: { start: pos, end: endIdx + 1 },
      });
      pos = endIdx + 1;
      continue;
    }

    // Text content — find the next `<` that isn't at the current position
    const nextTag = html.indexOf("<", pos + 1);
    const end = nextTag === -1 ? html.length : nextTag;
    const text = html.slice(pos, end);
    if (text.trim()) {
      tokens.push({
        type: "text",
        content: text,
        position: { start: pos, end },
      });
    }
    pos = end;
  }

  return tokens;
}

export function parseHtml(html: string): TagNode[] {
  const tokens = tokenize(html);
  const root: TagNode[] = [];
  const stack: { node: TagNode; children: TagNode[] }[] = [];

  function currentChildren(): TagNode[] {
    return stack.length > 0 ? stack[stack.length - 1].children : root;
  }

  for (const token of tokens) {
    switch (token.type) {
      case "text": {
        currentChildren().push({
          type: "text",
          content: token.content,
          children: [],
          position: token.position,
        });
        break;
      }

      case "comment":
        break;

      case "self-close": {
        currentChildren().push({
          type: "element",
          tagName: token.tagName,
          attributes: token.attributes,
          children: [],
          position: token.position,
        });
        break;
      }

      case "open": {
        const node: TagNode = {
          type: "element",
          tagName: token.tagName,
          attributes: token.attributes,
          children: [],
          position: { start: token.position.start, end: token.position.end },
        };
        currentChildren().push(node);
        stack.push({ node, children: node.children });
        break;
      }

      case "close": {
        if (stack.length === 0) {
          currentChildren().push({
            type: "error",
            children: [],
            content: `</${token.tagName}>`,
            error: {
              type: "unexpected-close",
              message: `Unexpected closing tag </${token.tagName}> — there's no matching opening tag!`,
              position: token.position,
            },
            position: token.position,
          });
        } else {
          const top = stack[stack.length - 1];
          if (top.node.tagName === token.tagName) {
            top.node.position.end = token.position.end;
            stack.pop();
          } else {
            // Mismatched close — try to find matching open tag further up
            const matchIdx = stack.findLastIndex(
              (s) => s.node.tagName === token.tagName
            );
            if (matchIdx >= 0) {
              // Close everything down to the match
              while (stack.length > matchIdx + 1) {
                const unclosed = stack.pop()!;
                unclosed.node.error = {
                  type: "unclosed",
                  message: `<${unclosed.node.tagName}> was never closed!`,
                  position: unclosed.node.position,
                };
              }
              const matched = stack.pop()!;
              matched.node.position.end = token.position.end;
            } else {
              currentChildren().push({
                type: "error",
                children: [],
                content: `</${token.tagName}>`,
                error: {
                  type: "mismatched",
                  message: `Expected </${top.node.tagName}> but found </${token.tagName}>`,
                  position: token.position,
                },
                position: token.position,
              });
            }
          }
        }
        break;
      }
    }
  }

  // Mark remaining open tags as unclosed
  while (stack.length > 0) {
    const unclosed = stack.pop()!;
    unclosed.node.error = {
      type: "unclosed",
      message: `<${unclosed.node.tagName}> was never closed! Add </${unclosed.node.tagName}>.`,
      position: unclosed.node.position,
    };
  }

  return root;
}
