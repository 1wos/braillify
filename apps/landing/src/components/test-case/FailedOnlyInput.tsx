'use client'

import { Input } from '@devup-ui/react'
import { ComponentProps } from 'react'

import { useTestCase } from './TestCaseProvider'

export function FailedOnlyInput(
  props: Omit<
    ComponentProps<typeof Input<'input'>>,
    'checked' | 'onChange' | 'defaultChecked'
  >,
) {
  const { filters, onChangeFilters } = useTestCase()
  return (
    <Input
      checked={filters.failedOnly}
      onChange={(e) => onChangeFilters({ failedOnly: e.target.checked })}
      {...props}
    />
  )
}
