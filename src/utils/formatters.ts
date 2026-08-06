import dayjs from 'dayjs'
import type { RiskLevel } from './enums'
import { RISK_LEVEL, RECTIFICATION_STATUS, DOCUMENT_STATUS, DEFECT_SEVERITY, EVALUATION_CONCLUSION } from './enums'

/**
 * Format a date with an optional format string.
 * Defaults to 'YYYY-MM-DD HH:mm:ss'.
 */
export function formatDate(
  date?: string | number | Date | dayjs.Dayjs,
  format: string = 'YYYY-MM-DD HH:mm:ss',
): string {
  if (!date) return '-'
  return dayjs(date).format(format)
}

/**
 * Format risk level to display label and optional color tag.
 */
export function formatRiskLevel(level: RiskLevel): string {
  return RISK_LEVEL[level]?.label ?? level
}

/**
 * Format a general status value using the provided status map.
 */
export function formatStatus<
  T extends string,
  M extends Record<T, { label: string; color: string }>,
>(status: T, statusMap: M): string {
  return statusMap[status]?.label ?? status
}

/**
 * Format file size in bytes to human-readable string.
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const k = 1024
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(2))
  return `${size} ${units[i]}`
}

/**
 * Format a decimal value as a percentage string.
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${(value * 100).toFixed(decimals)}%`
}

// Convenience wrappers for built-in enums
export const formatRectificationStatus = (status: keyof typeof RECTIFICATION_STATUS) =>
  formatStatus(status, RECTIFICATION_STATUS)

export const formatDocumentStatus = (status: keyof typeof DOCUMENT_STATUS) =>
  formatStatus(status, DOCUMENT_STATUS)

export const formatDefectSeverity = (severity: keyof typeof DEFECT_SEVERITY) =>
  formatStatus(severity, DEFECT_SEVERITY)

export const formatEvaluationConclusion = (conclusion: keyof typeof EVALUATION_CONCLUSION) =>
  formatStatus(conclusion, EVALUATION_CONCLUSION)
