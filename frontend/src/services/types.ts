interface ParagraphBlock {
  type: "paragraph";
  code?: boolean;
  children: Block[];
}

interface TextBlock {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
}

interface ListBlock {
  type: "list";
  format: "unordered" | "ordered";
  children: Block[];
}

interface ListItemBlock {
  type: "list-item";
  children: Block[];
}

interface LinkBlock {
  type: "link";
  url: string;
  children: Block[];
}

interface HeadingBlock {
  type: "heading";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: Block[];
}

export type Block =
  | ParagraphBlock
  | TextBlock
  | LinkBlock
  | ListBlock
  | ListItemBlock
  | HeadingBlock;
