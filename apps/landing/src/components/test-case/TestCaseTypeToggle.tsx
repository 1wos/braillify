'use client'

import { Toggle } from '@devup-ui/components'
import { ComponentProps, useState } from 'react'

export function TestCaseTypeToggle(props: ComponentProps<typeof Toggle>) {
  const [type, setType] = useState<'list' | 'table'>('list')
  return (
    <Toggle
      onChange={(value) => setType(value ? 'table' : 'list')}
      value={type === 'table'}
      {...props}
    />
  )
}
