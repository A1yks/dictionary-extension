import { ContentEvents } from 'types/messanging';

export type EventHandlers = {
    [key in ContentEvents]: (data: any) => void;
};
