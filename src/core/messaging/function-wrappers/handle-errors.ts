import { BackgroundMessage } from 'types/messanging';

function HandleErrors<T extends (...args: any[]) => Promise<BackgroundMessage>>(originalFunc: T, unknownErrorMsg = 'Произошла неизвестная ошибка') {
    return async function (...args) {
        try {
            return await originalFunc(...args);
        } catch (err) {
            if (typeof err === 'string') {
                return { error: err };
            }

            if (err instanceof Error) {
                return { error: err.message };
            }

            return { error: unknownErrorMsg };
        }
    } as T;
}

export default HandleErrors;
