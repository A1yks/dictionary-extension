import { ReactNode } from 'react';

export type PortalProps = {
    to: HTMLElement | null;
    children: ReactNode;
};
