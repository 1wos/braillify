'use client'

import { VStack } from '@devup-ui/react'

import { useTestCase } from './TestCaseProvider'

export function TestCaseRuleContainer({
  exception,
  children,
}: {
  exception: boolean
  children: React.ReactNode
}) {
  const { options } = useTestCase()
  const isList = options.type === 'list'
  return (
    <VStack
      flex="1"
      gap={['20px', null, null, isList ? '30px' : '40px']}
      pb={[isList ? '30px' : '40px', null, null, '40px']}
      pt={exception ? null : [isList ? '30px' : '40px', null, null, '40px']}
      px={['16px', null, null, '60px']}
    >
      {children}
    </VStack>
  )
}
