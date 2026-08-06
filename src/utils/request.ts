import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from 'axios'
import { message } from 'antd'
import { API_BASE_URL, TOKEN_KEY, RESPONSE_CODE, HTTP_STATUS } from './constants'
import type { ApiResponse } from '@/types/api'

const request: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor: attach authorization token
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor: unified error handling
request.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { data, status } = response

    // Handle HTTP-level success
    if (status === HTTP_STATUS.SUCCESS || status === HTTP_STATUS.CREATED) {
      const { code, message: msg } = data
      if (code !== undefined && code !== RESPONSE_CODE.SUCCESS) {
        message.error(msg || 'Request failed')
        return Promise.reject(new Error(msg || 'Request failed'))
      }
    }
    return response
  },
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }

    const { response } = error

    if (response) {
      const { status } = response

      switch (status) {
        case HTTP_STATUS.UNAUTHORIZED:
          localStorage.removeItem(TOKEN_KEY)
          window.location.href = '/login'
          message.error('Login expired, please login again')
          break
        case HTTP_STATUS.FORBIDDEN:
          message.error('No permission to access this resource')
          break
        case HTTP_STATUS.NOT_FOUND:
          message.error('Requested resource not found')
          break
        case HTTP_STATUS.SERVER_ERROR:
          message.error('Server error, please try again later')
          break
        default:
          message.error(response.data?.message || 'Request failed')
      }
    } else {
      message.error('Network error, please check your connection')
    }

    return Promise.reject(error)
  },
)

export function get<T = unknown>(
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  return request.get(url, { params, ...config }).then((res) => res.data)
}

export function post<T = unknown>(
  url: string,
  data?: Record<string, unknown>,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  return request.post(url, data, config).then((res) => res.data)
}

export function put<T = unknown>(
  url: string,
  data?: Record<string, unknown>,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  return request.put(url, data, config).then((res) => res.data)
}

export function del<T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  return request.delete(url, config).then((res) => res.data)
}

export function upload<T = unknown>(
  url: string,
  formData: FormData,
  onProgress?: (percent: number) => void,
): Promise<ApiResponse<T>> {
  return request
    .post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        if (onProgress && event.total) {
          const percent = Math.round((event.loaded * 100) / event.total)
          onProgress(percent)
        }
      },
    })
    .then((res) => res.data)
}

export default request
