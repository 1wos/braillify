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

/**
 * Create a filter map based on rule_map.json keys.
 * Automatically includes newly added rules.
 * @param ruleMapKeys - Array of rule keys from rule_map.json
 * @returns Filter map grouped by categories
 */
export function createFilterMap(
  ruleMapKeys: string[],
): Record<TestCaseFilter, string[]> {
  // Default all rules to korean category
  // Can be extended with category field in rule_map.json for classification
  return {
    korean: ruleMapKeys,
    math: [],
    science: [],
    music: [],
    western: [],
    'foreign-language': [],
    ipa: [],
    corpus: [],
  }
}

// Default FILTER_MAP for backward compatibility (legacy migration support)
export const FILTER_MAP: Record<TestCaseFilter, string[]> = {
  korean: [],
  math: [],
  science: [],
  music: [],
  western: [],
  'foreign-language': [],
  ipa: [],
  corpus: [],
}
