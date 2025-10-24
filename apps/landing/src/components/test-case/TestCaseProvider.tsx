'use client'

import { createContext, useContext, useState } from 'react'

import { TestStatusMap } from '@/types'

export type TestCaseOptions = {
  failedOnly: boolean
}

const TestCaseContext = createContext<{
  testStatusMap: TestStatusMap
  filters: TestCaseOptions
  onChangeFilters: (filters: TestCaseOptions) => void
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
  const [filters, setFilters] = useState<TestCaseOptions>({
    failedOnly: false,
  })
  const handleChangeFilters = (filters: TestCaseOptions) => {
    setFilters((prev) => ({ ...prev, ...filters }))
  }

  return (
    <TestCaseContext.Provider
      value={{ testStatusMap, filters, onChangeFilters: handleChangeFilters }}
    >
      {children}
    </TestCaseContext.Provider>
  )
}
