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