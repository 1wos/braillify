'use client'

import { Box } from '@devup-ui/react'

import Tooltip from './Tooltip'

export default function TestCaseCircle({
  children,
  isSuccess,
}: {
  children: React.ReactNode
  isSuccess: boolean
}) {
  return (
    <Box role="group">
      <Box
        aspectRatio="1"
        bg={isSuccess ? '$success' : '$error'}
        borderRadius="100px"
        boxSize="16px"
        cursor="pointer"
      />
      <Tooltip>{children}</Tooltip>
    </Box>
  )
}
