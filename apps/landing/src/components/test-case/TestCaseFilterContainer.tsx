import { VStack } from '@devup-ui/react'

export function TestCaseFilterContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <VStack
      bg="$background"
      gap="12px"
      pos="sticky"
      pt="10px"
      px={['16px', null, null, '60px']}
      top={['60px', null, null, '100px']}
    >
      {children}
    </VStack>
  )
}
