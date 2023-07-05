/* eslint-disable react/react-in-jsx-scope */
import { renderHook } from '@testing-library/react-hooks'
import { useUsers, UsersProvider } from '@/contexts/UsersContext'
import { ReactNode } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

describe('useUsers', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <UsersProvider>{children}</UsersProvider>
  )

  vi.mock('@/hooks/useCollectionData', () => {
    return {
      useCollectionData: () => [
        [{ id: 'test-user-uid', name: 'てすたろう' }],
        false
      ]
    }
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('usersとusersById.loadingを返す', async () => {
    const { result } = renderHook(() => useUsers(), { wrapper })
    expect(result.current).toEqual({
      users: [{ id: 'test-user-uid', name: 'てすたろう' }],
      usersById: {
        'test-user-uid': {
          id: 'test-user-uid',
          name: 'てすたろう'
        }
      },
      loading: false
    })
  })
})
