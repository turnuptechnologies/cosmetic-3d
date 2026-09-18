// ---------------------------------------------------------------------------
// Rich-text (Payload / Lexical) helpers
//
// CMS rich text arrives as a Lexical tree: { root: { children: [node, ...] } }.
// The plain-text helpers below flatten that tree to strings and are kept for
// titles/labels/SEO. Use `extractRichText` + <RichText> (components/RichText.jsx)
// wherever the formatting an editor applied (links, bold, lists, ...) must
// survive to the rendered page.
// ---------------------------------------------------------------------------

/** Bit flags Lexical stores on a text node's `format` (Payload's editor defaults). */
export const TEXT_FORMAT = {
    BOLD: 1,
    ITALIC: 2,
    STRIKETHROUGH: 4,
    UNDERLINE: 8,
    CODE: 16,
    SUBSCRIPT: 32,
    SUPERSCRIPT: 64,
    HIGHLIGHT: 128,
};

/** Plain text of any Lexical node (text nodes and everything nested under it). */
export function getLexicalNodeText(node) {
    if (!node) return "";
    if (node.type === "text") return node.text || "";
    if (Array.isArray(node.children)) return node.children.map(getLexicalNodeText).join("");
    return "";
}

/**
 * Same selection as `extractPlainText(content, allowedTypes)` but returns the
 * matching top-level Lexical nodes untouched, so marks, links, lists and line
 * breaks are preserved for <RichText>. Returns null when there is no visible
 * text so callers can keep using `||` / `fallback` defaults.
 *
 * @param {{ root?: { children?: object[] } } | null | undefined} content
 * @param {string[]} allowedTypes e.g. ["paragraph"], ["heading"]; empty = all
 * @returns {object[] | null}
 */
export function extractRichText(content, allowedTypes = []) {
    const children = content?.root?.children;
    if (!Array.isArray(children)) return null;

    const nodes = allowedTypes.length
        ? children.filter((node) => allowedTypes.includes(node?.type))
        : children;

    return nodes.length && nodes.map(getLexicalNodeText).join("").trim() ? nodes : null;
}

// Where Payload's internal links (`relationTo`) live on this site
const INTERNAL_ROUTE_PREFIX = { pages: "", posts: "/blog", products: "/products" };

/**
 * Resolve a Lexical `link` / `autolink` node's `fields` to an href.
 * Payload sends `{ linkType: "custom", url }` or
 * `{ linkType: "internal", doc: { relationTo, value: { slug } }, newTab }`.
 *
 * @returns {{ href: string | null, internal: boolean, newTab: boolean }}
 */
export function resolveLexicalLink(fields) {
    const { linkType, url, doc, newTab } = fields || {};

    if (linkType === "internal" && doc) {
        const slug = typeof doc.value === "object" ? doc.value?.slug : null;
        if (slug != null) {
            const prefix = INTERNAL_ROUTE_PREFIX[doc.relationTo] ?? `/${doc.relationTo}`;
            const path = String(slug).replace(/^\/+/, "");
            const href = !path || path === "home" ? prefix || "/" : `${prefix}/${path}`;
            return { href, internal: true, newTab: Boolean(newTab) };
        }
    }

    const href = typeof url === "string" && url.trim() ? url.trim() : null;
    const internal = Boolean(href && href.startsWith("/") && !href.startsWith("//"));
    return { href, internal, newTab: Boolean(newTab) };
}

export function extractPlainText(content, allowedTypes = []) {
    if (!content?.root?.children) return "";

    const walk = (node, parentAllowed = false) => {
        // If node is text, include it only if its parent is allowed OR no filter is set
        if (node.type === "text") {
            return parentAllowed || allowedTypes.length === 0 ? node.text : "";
        }

        // Determine if this node is allowed
        const isAllowed = allowedTypes.length === 0 || allowedTypes.includes(node.type);

        // Recursively walk children
        return (node.children || []).map(child => walk(child, isAllowed)).join("");
    };

    return content.root.children.map(node => walk(node)).join(" ").trim();
}

export function joinParagraphChildren(childrenArray) {
    if (!childrenArray || !Array.isArray(childrenArray)) return "";

    return childrenArray
        .map(child => (child.type === "text" && child.text ? child.text : "")) // only text
        .join("") // join into a single string
        .trim();
}

export function extractTextInPoints(children) {
    if (!children || !Array.isArray(children)) return "";
    return children
        .filter(child => child.type === "paragraph")
        .map(child => child.children[0]?.text).join(' ')
} 