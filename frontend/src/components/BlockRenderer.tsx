import { Block } from "@/services/types";

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return blocks.map((block, index) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p key={index} className="font-light mb-3 text-sm">
            <BlockRenderer blocks={block.children} />
          </p>
        );
      case "text":
        const classes = [
          block.bold && "font-bold",
          block.italic && "italic",
          block.underline && "underline",
          block.strikethrough && "line-through",
        ]
          .filter(Boolean)
          .join(" ");
        return (
          <span key={index} className={classes}>
            {block.text}
          </span>
        );
      case "list":
        if (block.format === "unordered") {
          return (
            <ul
              key={index}
              className="max-w-md space-y-1 list-disc list-inside"
            >
              <BlockRenderer blocks={block.children} />
            </ul>
          );
        } else {
          return (
            <ol
              key={index}
              className="max-w-md space-y-1 list-decimal list-inside"
            >
              <BlockRenderer blocks={block.children} />
            </ol>
          );
        }
      case "list-item":
        return (
          <li key={index}>
            <BlockRenderer blocks={block.children} />
          </li>
        );
      case "link":
        return (
          <a
            key={index}
            href={block.url}
            target="_blank"
            rel="noopener norefrer"
            className="font-medium text-blue-600 underline hover:text-blue-700 hover:no-underline"
          >
            <BlockRenderer blocks={block.children} />
          </a>
        );
      case "heading":
        switch (block.level) {
          case 1:
            return (
              <h1 key={index} className="text-5xl font-extrabold">
                <BlockRenderer blocks={block.children} />
              </h1>
            );
          case 2:
            return (
              <h2 key={index} className="text-4xl font-extrabold">
                <BlockRenderer blocks={block.children} />
              </h2>
            );
          case 3:
            return (
              <h3 key={index} className="text-3xl font-bold">
                <BlockRenderer blocks={block.children} />
              </h3>
            );
          case 4:
            return (
              <h4 key={index} className="text-2xl font-bold">
                <BlockRenderer blocks={block.children} />
              </h4>
            );
          case 5:
            return (
              <h5 key={index} className="text-xl font-bold">
                <BlockRenderer blocks={block.children} />
              </h5>
            );
          case 6:
            return (
              <h6 key={index} className="text-lg font-bold">
                <BlockRenderer blocks={block.children} />
              </h6>
            );
        }
    }
  });
}
