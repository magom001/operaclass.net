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

export interface SingleType<T> {
  data: {
    id: number;
    attributes: T;
  };
}

export interface CollectionType<T> {
  data: {
    id: number;
    attributes: T;
  }[];
}

export interface CityType {
  name: string;
  code: string;
}

export interface LanguageType {
  name: string;
  alpha2: string;
}

export interface RecommendationType {
  id: number;
  name: string;
  profileLink: string;
}

export interface GoalType {
  name: string;
  code: string;
}

export interface ExperienceType {
  name: string;
  code: string;
}

export interface ProfileTypeType {
  name: string;
  code: "pianist" | "vocal-coach";
}

export interface VideoLinkType {
  id: number;
  url: string;
}

export interface ContactInfoType {
  type:
    | "email"
    | "phone"
    | "whatsapp"
    | "telegram"
    | "facebook"
    | "instagram"
    | "linkedin"
    | "url"
    | "vk";
  data: string;
}

export interface ProfileType {
  id: number;
  attributes: {
    firstName?: string;
    lastName?: string;
    slug: string;
    sex?: "m" | "f";
    bio?: Block[];
    rating?: number;
    city?: SingleType<CityType>;
    recommendations?: RecommendationType[];
    speaks?: CollectionType<LanguageType>;
    reads?: CollectionType<LanguageType>;
    phonetics?: CollectionType<LanguageType>;
    goals?: CollectionType<GoalType>;
    experiences?: CollectionType<ExperienceType>;
    profileTypes?: CollectionType<ProfileTypeType>;
    contacts?: ContactInfoType[];
    videos?: VideoLinkType[];
  };
}

export interface MetaData {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface ResponseType<T> {
  data: T[];
  meta: MetaData;
}

export interface ProfilePreview {
  id: number;
  fullName: string;
  slug: string;
  city?: string;
  sex?: "m" | "f";
  previewVideo?: VideoLinkType;
}
