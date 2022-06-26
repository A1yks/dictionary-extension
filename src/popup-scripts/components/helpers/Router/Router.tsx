import NavbarLayout from '@popup/components/layouts/NavbarLayout';
import Dictionaries from '@popup/components/pages/Dictionaries';
import Settings from '@popup/components/pages/Settings';
import Words from '@popup/components/pages/Words';
import { FC } from 'react';
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom';
import Auth from '../../pages/Auth';
import PrivateRoute from './PrivateRoute';

const Router: FC = () => {
    return (
        <MemoryRouter>
            <Routes>
                <Route path="/login" element={<Auth variant="login" />} />
                <Route path="/register" element={<Auth variant="register" />} />
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <NavbarLayout>
                                <Outlet />
                            </NavbarLayout>
                        </PrivateRoute>
                    }
                >
                    <Route index element={<Dictionaries />} />
                    <Route path="/language/:langId" element={<Words />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>
            </Routes>
        </MemoryRouter>
    );
};

export default Router;
