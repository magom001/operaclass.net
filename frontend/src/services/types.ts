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
  data?: {
    id: number;
    attributes: T;
  };
}

export interface CollectionType<T> {
  data?: {
    id: number;
    attributes: T;
  }[];
}

export interface CodeNameType {
  name: string;
  code: string;
}

export interface CodeNameResponseType {
  id: number;
  attributes: CodeNameType;
}

export interface CityType {
  name: string;
  code: string;
  country?: SingleType<CountryType>;
}

export interface CountryType {
  name: string;
  alpha2: string;
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
    pictures?: { data: StrapiMediaType[] };
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

export interface ProfilePreviewType {
  id: number;
  fullName: string;
  slug: string;
  city?: string;
  country?: string;
  sex?: "m" | "f";
  previewVideo?: VideoLinkType;
  profileTypes: string[];
}

interface StrapiMediaFormatType {
  ext: string;
  url: string;
  mime: string;
  width: number;
  height: number;
}

export interface StrapiMediaType {
  id: number;
  attributes: {
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    url: string;
    previewUrl?: string;
    formats: {
      large?: StrapiMediaFormatType;
      medium?: StrapiMediaFormatType;
      small?: StrapiMediaFormatType;
      thumbnail?: StrapiMediaFormatType;
    };
  };
}

interface BlogContentType {
  __component: "generic.blog-content";
  text: Block[];
}

interface GalleryType {
  __component: "generic.gallery";
  images: {
    data: StrapiMediaType[];
  };
}

type BlogPostContentType = BlogContentType | GalleryType;

export interface BlogPostType {
  title: string;
  subtitle?: string;
  slug: string;
  date: string;
  author: string;
  tags: { name: string }[];
  content: BlogPostContentType[];
}
