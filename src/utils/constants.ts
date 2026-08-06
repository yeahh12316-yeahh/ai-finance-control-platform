export const API_BASE_URL = '/api/v1'

export const TOKEN_KEY = 'ic_platform_token'
export const USER_KEY = 'ic_platform_user'
export const REFRESH_TOKEN_KEY = 'ic_platform_refresh_token'

export const PAGE_SIZE = 20
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

export const UPLOAD_MAX_SIZE = 50 * 1024 * 1024 // 50MB
export const UPLOAD_ACCEPT_TYPES = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip,.rar'

export const DATE_FORMAT = 'YYYY-MM-DD'
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export const TIME_FORMAT = 'HH:mm:ss'

export const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
} as const

export const RESPONSE_CODE = {
  SUCCESS: 0,
  ERROR: 1,
} as const
