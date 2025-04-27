// utils/lexicalToHtml.ts

// Updated LexicalNode interface to include listType and other properties
interface LexicalNode {
    type: string;
    children?: LexicalNode[];
    text?: string;
    format?: number; // For text formatting (bold, italic, etc.)
    url?: string; // For link nodes
    language?: string; // For code nodes
    version?: number; // Node version
    listType?: "bullet" | "number"; // For list nodes (ul or ol)
    tag?: "h1" | "h2" | "h3"; // For heading nodes
    [key: string]: any; // Allow additional properties for flexibility
  }
  
  export function lexicalToHtml(json: string): string {
    try {
      const editorState = JSON.parse(json);
      const root = editorState.root as LexicalNode;
      return convertNodeToHtml(root);
    } catch (error) {
      console.error("Error parsing Lexical JSON:", error);
      return "<p>Error rendering content</p>";
    }
  }
  
  function convertNodeToHtml(node: LexicalNode): string {
    if (!node) return "";
  
    switch (node.type) {
      case "root":
        return (node.children || []).map(convertNodeToHtml).join("");
  
      case "paragraph":
        return `<p>${(node.children || []).map(convertNodeToHtml).join("")}</p>`;
  
      case "heading":
        const tag = node.tag || "h1";
        return `<${tag}>${(node.children || []).map(convertNodeToHtml).join("")}</${tag}>`;
  
      case "list":
        const listTag = node.listType === "bullet" ? "ul" : "ol";
        return `<${listTag} style="list-style-position: outside; margin-left: 24px; margin: 8px 0; color: #ffffff;">${(
          node.children || []
        )
          .map(convertNodeToHtml)
          .join("")}</${listTag}>`;
  
      case "listitem":
        return `<li>${(node.children || []).map(convertNodeToHtml).join("")}</li>`;
  
      case "link":
        return `<a href="${node.url || "#"}" style="color: #f6ff7a; text-decoration: underline;">${(
          node.children || []
        )
          .map(convertNodeToHtml)
          .join("")}</a>`;
  
      case "code":
        return `<pre style="font-family: monospace; background: #2d2d2f; padding: 16px; border-radius: 4px; color: #f6ff7a; overflow-x: auto;"><code>${
          node.children?.[0]?.text || ""
        }</code></pre>`;
  
      case "text":
        let text = node.text || "";
        if (node.format) {
          if (node.format & 1) text = `<strong>${text}</strong>`; // Bold
          if (node.format & 2) text = `<em>${text}</em>`; // Italic
          if (node.format & 4) text = `<u>${text}</u>`; // Underline
          if (node.format & 8)
            text = `<code style="font-family: monospace; background: #2d2d2f; padding: 2px 4px; border-radius: 2px; color: #f6ff7a;">${text}</code>`; // Inline code
        }
        return text;
  
      default:
        console.warn(`Unhandled node type: ${node.type}`);
        return (node.children || []).map(convertNodeToHtml).join("");
    }
  }