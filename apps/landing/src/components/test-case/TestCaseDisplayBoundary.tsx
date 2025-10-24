'use client'

import { TestCaseOptions, useTestCase } from './TestCaseProvider'

/**
 * `TestCaseContext` 값을 참조하여 렌더링 여부를 결정합니다.
 * `filter`가 `undefined`이면 `display` 값에 따라 렌더링 여부를 결정합니다.
 * `filters[filter]`가 `false`면 무조건 렌더링 합니다.
 * `filters[filter]`가 `true`면 `display` 값에 따라 렌더링 여부를 결정합니다.
 * @param display - 표시 여부
 * @param filter - 필터 키
 * @param children - 자식 요소
 * @returns 렌더링 여부를 결정한 자식 요소
 */
export function TestCaseDisplayBoundary({
  display,
  filter,
  children,
}: {
  display: boolean
  filter?: keyof TestCaseOptions
  children: React.ReactNode
}) {
  const { filters } = useTestCase()
  if ((filter ? filters[filter] : true) && !display) return null
  return children
}
