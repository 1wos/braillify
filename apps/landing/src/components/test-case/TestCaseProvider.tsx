'use client'

import { createContext, useContext, useState } from 'react'

import { TestStatusMap } from '@/types'

export type TestCaseOptions = {
  failedOnly: boolean
  type: 'list' | 'table'
}

const TestCaseContext = createContext<{
  testStatusMap: TestStatusMap
  options: TestCaseOptions
  onChangeOptions: (options: TestCaseOptions) => void
} | null>(null)

export function useTestCase() {
  const context = useContext(TestCaseContext)
  if (!context) {
    throw new Error('useTestCase must be used within a TestCaseProvider')
  }
  return context
}

export function TestCaseProvider({
  testStatusMap,
  children,
}: {
  testStatusMap: TestStatusMap
  children: React.ReactNode
}) {
  const [options, setOptions] = useState<TestCaseOptions>({
    failedOnly: false,
    type: 'list',
  })
  const handleChangeOptions = (options: TestCaseOptions) => {
    setOptions((prev) => ({ ...prev, ...options }))
  }

  return (
    <TestCaseContext.Provider
      value={{ testStatusMap, options, onChangeOptions: handleChangeOptions }}
    >
      {children}
    </TestCaseContext.Provider>
  )
}
