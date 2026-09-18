import { Fragment, createElement } from "react";
import Link from "next/link";
import { TEXT_FORMAT, resolveLexicalLink } from "../lib/sanitizeText";

// Renders Payload/Lexical rich text ({ root: { children } }) as React elements.
//
//   <RichText content={column.richText} />                       // full document
//   <RichText nodes={extractRichText(rt, ["paragraph"])} inline /> // inside an existing <p>
//
// `inline` renders only inline markup (marks, links, <br>) and joins blocks with
// a space, exactly like the old plain-text helper did, so it is safe to drop
// into the <p>/<h2> wrappers the components already have (no nested <p>).
// `classNames` maps a tag (p, h2, ul, li, a, ...) to the classes it should get.

const DEFAULT_CLASSNAMES = {
    a: "underline underline-offset-4 decoration-pink-500 hover:text-pink-400 transition-colors",
};

const BLOCK_TAGS = { paragraph: "p", quote: "blockquote", listitem: "li" };
const TEXT_ALIGN = { center: "center", right: "right", end: "right", justify: "justify" };

const alignStyle = (node) =>
    TEXT_ALIGN[node.format] ? { textAlign: TEXT_ALIGN[node.format] } : undefined;

function TextNode({ node, classNames }) {
    const format = typeof node.format === "number" ? node.format : 0;
    let out = node.text ?? "";

    // Innermost first so the outer element is the "strongest" mark
    if (format & TEXT_FORMAT.CODE) out = <code className={classNames.code}>{out}</code>;
    if (format & TEXT_FORMAT.SUBSCRIPT) out = <sub>{out}</sub>;
    if (format & TEXT_FORMAT.SUPERSCRIPT) out = <sup>{out}</sup>;
    if (format & TEXT_FORMAT.HIGHLIGHT) out = <mark>{out}</mark>;
    if (format & TEXT_FORMAT.STRIKETHROUGH) out = <s>{out}</s>;
    if (format & TEXT_FORMAT.UNDERLINE) out = <u className={classNames.u}>{out}</u>;
    if (format & TEXT_FORMAT.ITALIC) out = <em className={classNames.em}>{out}</em>;
    if (format & TEXT_FORMAT.BOLD) out = <strong className={classNames.strong}>{out}</strong>;

    return out;
}

function LinkNode({ node, ctx }) {
    const { href, internal, newTab } = resolveLexicalLink(node.fields);
    const children = renderNodes(node.children, ctx);

    // Unresolvable link (e.g. unpopulated internal doc): keep the text, drop the anchor
    if (!href) return children;

    const props = {
        className: ctx.classNames.a,
        ...(newTab && { target: "_blank", rel: "noopener noreferrer" }),
    };

    return internal ? (
        <Link href={href} {...props}>{children}</Link>
    ) : (
        <a href={href} {...props}>{children}</a>
    );
}

function renderNode(node, index, ctx) {
    if (!node || typeof node !== "object") return null;
    const { classNames, inline } = ctx;
    // In inline mode blocks collapse to fragments separated by a space (old join(" ") behaviour)
    const inlineBlock = (children) => (
        <Fragment key={index}>{index > 0 ? " " : null}{children}</Fragment>
    );

    switch (node.type) {
        case "text":
            return <TextNode key={index} node={node} classNames={classNames} />;
        case "linebreak":
            return <br key={index} />;
        case "tab":
            return <Fragment key={index}>{"\t"}</Fragment>;
        case "link":
        case "autolink":
            return <LinkNode key={index} node={node} ctx={ctx} />;

        case "paragraph":
        case "quote":
        case "listitem": {
            const children = renderNodes(node.children, ctx);
            if (inline) return inlineBlock(children);
            const tag = BLOCK_TAGS[node.type];
            return createElement(
                tag,
                { key: index, className: classNames[tag], style: alignStyle(node) },
                // An empty paragraph is intentional editor spacing
                children.length ? children : <br />
            );
        }
        case "heading": {
            const children = renderNodes(node.children, ctx);
            if (inline) return inlineBlock(children);
            const tag = /^h[1-6]$/.test(node.tag) ? node.tag : "h2";
            return createElement(tag, { key: index, className: classNames[tag], style: alignStyle(node) }, children);
        }
        case "list": {
            const children = renderNodes(node.children, ctx);
            if (inline) return inlineBlock(children);
            const tag = node.listType === "number" ? "ol" : "ul";
            const start = tag === "ol" && Number(node.start) > 1 ? Number(node.start) : undefined;
            return createElement(tag, { key: index, className: classNames[tag], start }, children);
        }
        case "horizontalrule":
            return inline ? null : <hr key={index} className={classNames.hr} />;

        default:
            // Unknown node (upload, block, ...): render whatever text it wraps so nothing is silently lost
            return node.children ? <Fragment key={index}>{renderNodes(node.children, ctx)}</Fragment> : null;
    }
}

function renderNodes(nodes, ctx) {
    if (!Array.isArray(nodes)) return [];
    return nodes.map((node, index) => renderNode(node, index, ctx)).filter((el) => el != null);
}

/**
 * @param {object} props
 * @param {{ root?: { children?: object[] } } | null} [props.content] full rich-text field
 * @param {object[] | null} [props.nodes] pre-selected top-level nodes (see extractRichText)
 * @param {boolean} [props.inline] render inline markup only (safe inside <p>, <h2>, ...)
 * @param {string} [props.as] wrapper element; none by default
 * @param {string} [props.className] class for the wrapper element
 * @param {Record<string, string>} [props.classNames] tag → class map (p, h1..h6, ul, ol, li, a, blockquote, hr, strong, em, u, code)
 * @param {import("react").ReactNode} [props.fallback] rendered when there is nothing to show
 */
export default function RichText({
    content,
    nodes,
    inline = false,
    as: Wrapper,
    className,
    classNames,
    fallback = null,
}) {
    const list = Array.isArray(nodes) ? nodes : content?.root?.children;
    if (!Array.isArray(list) || list.length === 0) return fallback;

    const ctx = { inline, classNames: { ...DEFAULT_CLASSNAMES, ...classNames } };
    const rendered = renderNodes(list, ctx);
    if (rendered.length === 0) return fallback;

    return Wrapper ? <Wrapper className={className}>{rendered}</Wrapper> : <>{rendered}</>;
}
