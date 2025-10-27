import { TestCaseFilter } from '@/components/test-case/TestCaseProvider'

export const TEST_CASE_FILTERS: { label: string; value: TestCaseFilter }[] = [
  { label: '한글', value: 'korean' },
  { label: '수학', value: 'math' },
  {
    label: '과학',
    value: 'science',
  },
  {
    label: '음악',
    value: 'music',
  },
  {
    label: '서양',
    value: 'western',
  },
  {
    label: '외국어',
    value: 'foreign-language',
  },
  {
    label: '국제음성기호',
    value: 'ipa',
  },
  {
    label: '말뭉치',
    value: 'corpus',
  },
]
