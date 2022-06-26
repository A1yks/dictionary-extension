import sendMessage from '@popup/messaging/send-message';
import UserAPI from 'api/UserAPI';
import { makeAutoObservable } from 'mobx';
import { User } from 'types/common';
import { BackgroundEvents } from 'types/messanging';
import Request from 'utils/decorators/Request';
import RootStore from './RootStore';
import { IRequest } from 'types/stores';

class UserStore implements IRequest {
    user: User | null = null;
    loading = false;
    error = '';

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    @Request
    async getCurrentUser() {
        const user = await UserAPI.getUser();

        sendMessage({ event: BackgroundEvents.LOGIN, data: user });
        this.setUser(user);
    }

    setUser(user: User | null) {
        this.user = user;

        if (user !== null) {
            this.rootStore.languagesStore.setLanguages(user.languages);
        }
    }

    setLoading(loading: boolean) {
        this.loading = loading;
    }

    setError(error: string) {
        this.error = error;
    }
}

export default UserStore;
