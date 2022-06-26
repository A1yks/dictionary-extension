// Events

export enum BackgroundEvents {
    LOGIN,
    LOGOUT,
    TRANSLATE,
    ADD_WORD,
}

export enum ContentEvents {
    TRANSLATED,
    WORD_ADDED,
}

// Message interfaces

export interface ContentMessage<T = unknown> {
    event: BackgroundEvents;
    data?: T;
}

export type PopupMessage<T = unknown> = ContentMessage<T>;

export type BackgroundMessage<T = unknown> =
    | {
          event: ContentEvents;
          data: T;
          error?: never;
      }
    | {
          sourceEvent?: BackgroundEvents;
          error: string;
          data?: never;
      };
