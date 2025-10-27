'use client'

import { VStack } from '@devup-ui/react'

import { useTestCase } from './TestCaseProvider'

export function TestCaseFilterContainer({
  children,
}: {
  children: React.ReactNode
}) {
  const { options } = useTestCase()
  const isList = options.type === 'list'
  return (
    <VStack
      gap="12px"
      mb={[isList ? '30px' : '40px', null, null, '40px']}
      px={['16px', null, null, '60px']}
    >
      {children}
    </VStack>
  )
}
