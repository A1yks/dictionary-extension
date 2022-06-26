import Navbar from '@popup/components/helpers/Navbar';
import { FC, PropsWithChildren } from 'react';

const NavbarLayout: FC<PropsWithChildren> = (props) => {
    return (
        <>
            <Navbar />
            {props.children}
        </>
    );
};

export default NavbarLayout;
