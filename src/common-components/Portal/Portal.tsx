import { FC } from 'react';
import ReactDOM from 'react-dom';
import { PortalProps } from './Portal.types';

const Portal: FC<PortalProps> = (props) => {
    if (props.to === null) {
        return <>{props.children}</>;
    }

    return ReactDOM.createPortal(props.children, props.to);
};

export default Portal;
