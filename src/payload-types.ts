/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * Supported timezones in IANA format.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportedTimezones".
 */
export type SupportedTimezones =
  | 'Pacific/Midway'
  | 'Pacific/Niue'
  | 'Pacific/Honolulu'
  | 'Pacific/Rarotonga'
  | 'America/Anchorage'
  | 'Pacific/Gambier'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Denver'
  | 'America/Phoenix'
  | 'America/Chicago'
  | 'America/Guatemala'
  | 'America/New_York'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Santiago'
  | 'America/Buenos_Aires'
  | 'America/Sao_Paulo'
  | 'Atlantic/South_Georgia'
  | 'Atlantic/Azores'
  | 'Atlantic/Cape_Verde'
  | 'Europe/London'
  | 'Europe/Berlin'
  | 'Africa/Lagos'
  | 'Europe/Athens'
  | 'Africa/Cairo'
  | 'Europe/Moscow'
  | 'Asia/Riyadh'
  | 'Asia/Dubai'
  | 'Asia/Baku'
  | 'Asia/Karachi'
  | 'Asia/Tashkent'
  | 'Asia/Calcutta'
  | 'Asia/Dhaka'
  | 'Asia/Almaty'
  | 'Asia/Jakarta'
  | 'Asia/Bangkok'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Noumea'
  | 'Pacific/Auckland'
  | 'Pacific/Fiji';

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  blocks: {};
  collections: {
    users: User;
    pages: Page;
    media: Media;
    form_submissions: FormSubmission;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    pages: PagesSelect<false> | PagesSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    form_submissions: FormSubmissionsSelect<false> | FormSubmissionsSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  globals: {
    'site-options': SiteOption;
  };
  globalsSelect: {
    'site-options': SiteOptionsSelect<false> | SiteOptionsSelect<true>;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  first_name?: string | null;
  last_name?: string | null;
  role?: ('admin' | 'editor') | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: number;
  title: string;
  hero?: {
    blocks?: (FullscreenHero | TextOnlyHero)[] | null;
  };
  content?: {
    blocks?: (Title | ContentBlock | ImageCTA | Carousel | ImageAndText | Quotes | FormAndText | FAQS)[] | null;
  };
  meta?: {
    title?: string | null;
    description?: string | null;
  };
  slug?: string | null;
  slugLock?: boolean | null;
  publishedAt?: string | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FullscreenHero".
 */
export interface FullscreenHero {
  media_upload?: (number | null) | Media;
  label?: string | null;
  title?: string | null;
  message?: string | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'fullscreenHero';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt?: string | null;
  _key?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    square?: {
      _key?: string | null;
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "TextOnlyHero".
 */
export interface TextOnlyHero {
  label?: string | null;
  title?: string | null;
  message?: string | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'textonlyhero';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Title".
 */
export interface Title {
  label?: string | null;
  header?: string | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'title';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ContentBlock".
 */
export interface ContentBlock {
  richText?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'content';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ImageCTA".
 */
export interface ImageCTA {
  media_upload?: (number | null) | Media;
  label?: string | null;
  header?: string | null;
  link?: {
    link_type?: ('internal' | 'external') | null;
    url?: string | null;
    page?: (number | null) | Page;
    link_text?: string | null;
  };
  id?: string | null;
  blockName?: string | null;
  blockType: 'imagecta';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Carousel".
 */
export interface Carousel {
  slider?:
    | {
        media_upload?: (number | null) | Media;
        caption?: string | null;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'carousel';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ImageAndText".
 */
export interface ImageAndText {
  layout: 'layoutA' | 'layoutB';
  media_upload?: (number | null) | Media;
  content?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'image_and_text';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Quotes".
 */
export interface Quotes {
  quotes?:
    | {
        credit?: string | null;
        quote?: string | null;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'quotes';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FormAndText".
 */
export interface FormAndText {
  content?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'formAndText';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FAQS".
 */
export interface FAQS {
  questions?:
    | {
        question?: string | null;
        answer?: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        } | null;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'faqs';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "form_submissions".
 */
export interface FormSubmission {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  weddingAttendance?: string | null;
  ukReceptionAttendance?: string | null;
  dietryRequirements?: string | null;
  ownArrangements?: string | null;
  message?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'pages';
        value: number | Page;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null)
    | ({
        relationTo: 'form_submissions';
        value: number | FormSubmission;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  first_name?: T;
  last_name?: T;
  role?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages_select".
 */
export interface PagesSelect<T extends boolean = true> {
  title?: T;
  hero?:
    | T
    | {
        blocks?:
          | T
          | {
              fullscreenHero?: T | FullscreenHeroSelect<T>;
              textonlyhero?: T | TextOnlyHeroSelect<T>;
            };
      };
  content?:
    | T
    | {
        blocks?:
          | T
          | {
              title?: T | TitleSelect<T>;
              content?: T | ContentBlockSelect<T>;
              imagecta?: T | ImageCTASelect<T>;
              carousel?: T | CarouselSelect<T>;
              image_and_text?: T | ImageAndTextSelect<T>;
              quotes?: T | QuotesSelect<T>;
              formAndText?: T | FormAndTextSelect<T>;
              faqs?: T | FAQSSelect<T>;
            };
      };
  meta?:
    | T
    | {
        title?: T;
        description?: T;
      };
  slug?: T;
  slugLock?: T;
  publishedAt?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FullscreenHero_select".
 */
export interface FullscreenHeroSelect<T extends boolean = true> {
  media_upload?: T;
  label?: T;
  title?: T;
  message?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "TextOnlyHero_select".
 */
export interface TextOnlyHeroSelect<T extends boolean = true> {
  label?: T;
  title?: T;
  message?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Title_select".
 */
export interface TitleSelect<T extends boolean = true> {
  label?: T;
  header?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ContentBlock_select".
 */
export interface ContentBlockSelect<T extends boolean = true> {
  richText?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ImageCTA_select".
 */
export interface ImageCTASelect<T extends boolean = true> {
  media_upload?: T;
  label?: T;
  header?: T;
  link?:
    | T
    | {
        link_type?: T;
        url?: T;
        page?: T;
        link_text?: T;
      };
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Carousel_select".
 */
export interface CarouselSelect<T extends boolean = true> {
  slider?:
    | T
    | {
        media_upload?: T;
        caption?: T;
        id?: T;
      };
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ImageAndText_select".
 */
export interface ImageAndTextSelect<T extends boolean = true> {
  layout?: T;
  media_upload?: T;
  content?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Quotes_select".
 */
export interface QuotesSelect<T extends boolean = true> {
  quotes?:
    | T
    | {
        credit?: T;
        quote?: T;
        id?: T;
      };
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FormAndText_select".
 */
export interface FormAndTextSelect<T extends boolean = true> {
  content?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FAQS_select".
 */
export interface FAQSSelect<T extends boolean = true> {
  questions?:
    | T
    | {
        question?: T;
        answer?: T;
        id?: T;
      };
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  _key?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
  sizes?:
    | T
    | {
        square?:
          | T
          | {
              _key?: T;
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
      };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "form_submissions_select".
 */
export interface FormSubmissionsSelect<T extends boolean = true> {
  firstName?: T;
  lastName?: T;
  email?: T;
  phone?: T;
  weddingAttendance?: T;
  ukReceptionAttendance?: T;
  dietryRequirements?: T;
  ownArrangements?: T;
  message?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "site-options".
 */
export interface SiteOption {
  id: number;
  meta_title?: string | null;
  meta_description?: string | null;
  wedding_date?: string | null;
  password?: string | null;
  lockscreen_bg?: (number | null) | Media;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "site-options_select".
 */
export interface SiteOptionsSelect<T extends boolean = true> {
  meta_title?: T;
  meta_description?: T;
  wedding_date?: T;
  password?: T;
  lockscreen_bg?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}