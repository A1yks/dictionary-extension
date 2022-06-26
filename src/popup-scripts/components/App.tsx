import { useAuthStore, useUserStore } from '@popup/context/StoreContext';
import PageLoader from 'common-components/PageLoader';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import Router from './helpers/Router';

const App: FC = () => {
    const { isLoggedIn } = useAuthStore();
    const { getCurrentUser, loading: gettingUser, error } = useUserStore();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getCurrentUser();
    }, [getCurrentUser]);

    useEffect(() => {
        if (isLoggedIn || (error !== '' && !gettingUser)) {
            setLoading(false);
        }
    }, [gettingUser, isLoggedIn, error]);

    if (loading)
        return (
            <div className="app">
                <PageLoader />
            </div>
        );

    return (
        <div className="app">
            <Router />
        </div>
    );
};

export default observer(App);
