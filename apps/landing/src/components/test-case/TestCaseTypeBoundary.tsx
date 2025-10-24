'use client'

import { TestCaseDisplayBoundary } from './TestCaseDisplayBoundary'
import { useTestCase } from './TestCaseProvider'

export function TestCaseTypeBoundary({
  type,
  children,
}: {
  type: 'list' | 'table'
  children?: React.ReactNode
}) {
  const { options } = useTestCase()
  return (
    <TestCaseDisplayBoundary display={options.type === type}>
      {children}
    </TestCaseDisplayBoundary>
  )
}
