import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { dev } from '$app/environment';

export interface APIErrorResponse {
	/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
	error: any;
}

const api: AxiosInstance = axios.create({
	baseURL: dev ? 'http://localhost:4000/v1' : 'http://api.com',
	headers: {
		'Content-Type': 'application/json'
	}
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const token = sessionStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		if (error.response) {
			error.response.data = error.response.data as APIErrorResponse;
		}
		return Promise.reject(error);
	}
);

export default api;
