'use client'

import { useMemo } from 'react'

import {
  TestCaseFilter,
  TestCaseOptions,
  useTestCase,
} from './TestCaseProvider'

export type TestFailCount = number

/**
 * 내부에 옵션별 검증 함수가 있습니다.
 * option="failedOnly" 일 때 value는 실패한 케이스 개수
 * option="type" 일 때 현재 선택된 options.type과 value가 일치하는 경우 렌더
 * @param value - 비교할 값
 * @param option - 옵션 키
 * @param children - 자식 요소
 * @returns
 */
export function TestCaseDisplayBoundary<T extends keyof TestCaseOptions>({
  value,
  option,
  children,
}: {
  value: TestCaseFilter | TestFailCount | TestCaseOptions['type']
  option: T
  children: React.ReactNode
}) {
  const { options } = useTestCase()

  const shouldRender = useMemo(() => {
    switch (option) {
      case 'filters':
        return options.filters.includes(value as TestCaseFilter)
      case 'failedOnly':
        return options.failedOnly ? (value as TestFailCount) > 0 : true
      case 'type':
        return options.type === (value as TestCaseOptions['type'])
      default:
        return false
    }
  }, [option, value, options])

  if (!shouldRender) return null
  return children
}
