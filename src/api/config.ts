import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import fetchAdapter from '@vespaiach/axios-fetch-adapter';
import { ServerError, ServerResponse } from './types';

const instance = axios.create({
    baseURL: 'http://localhost:3001/api',
    withCredentials: true,
    adapter: fetchAdapter,
});

instance.interceptors.response.use(
    (response: AxiosResponse<ServerResponse>) => response.data.data,
    (error: AxiosError<ServerError>) => {
        if (error.response?.data) {
            return Promise.reject(error.response.data.error);
        }

        return Promise.reject(error.message);
    }
);

function API<T>(url: string, cfg?: Omit<AxiosRequestConfig, 'url'>) {
    const config: AxiosRequestConfig = cfg || {};

    config.url = url;

    return instance.request<any, T>(config);
}

export default API;
