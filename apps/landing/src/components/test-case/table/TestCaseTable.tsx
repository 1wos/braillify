import { css } from '@devup-ui/react'

import { Table, Tbody, Td, Th, Thead, Tr } from '@/components/test-case/table'
import { TestStatus } from '@/types'

import { TestCaseDisplayBoundary } from '../TestCaseDisplayBoundary'

export function TestCaseTable({ results }: { results: TestStatus[2] }) {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>번호</Th>
          <Th>예문</Th>
          <Th>정답</Th>
          <Th>결과</Th>
          <Th>성공 여부</Th>
        </Tr>
      </Thead>
      <Tbody>
        {results.map(([text, expected, actual, isSuccess], index) => (
          <TestCaseDisplayBoundary
            key={index}
            display={!isSuccess}
            option="failedOnly"
          >
            <Tr
              key={index}
              className={css({ bg: isSuccess ? 'unset' : '#D8D8D8' })}
            >
              <Td>{index + 1}</Td>
              <Td>{text}</Td>
              <Td>{expected}</Td>
              <Td>{actual}</Td>
              <Td
                className={css({
                  color: isSuccess ? '$success' : '$error',
                  textAlign: 'center',
                })}
              >
                {isSuccess ? '성공' : '실패'}
              </Td>
            </Tr>
          </TestCaseDisplayBoundary>
        ))}
      </Tbody>
    </Table>
  )
}
