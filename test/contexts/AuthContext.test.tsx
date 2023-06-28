/* eslint-disable react/react-in-jsx-scope */
import { render, cleanup, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { User } from 'firebase/auth'
import { renderHook, act as actHook, cleanup as cleanupHook } from '@testing-library/react-hooks'

const useAuthStateMock = vi.fn()
vi.mock('@/hooks/useAuthState', () => {
  return {
    useAuthState: useAuthStateMock
  }
})

describe('AuthProvider', async () => {
  const { useAuth, AuthProvider } = await import('@/contexts/AuthContext')
  const AuthedScreen = () => {
    const { currentUser } = useAuth()
    return (
      <div>`${currentUser?.displayName}でログインできました</div>
    )
  }
  const TestComponent = () => (
    <AuthProvider>
      <AuthedScreen />
    </AuthProvider>
  )

  afterEach(() => {
    vi.resetAllMocks()
    cleanup()
  })

  it('コンテキストデータが取得できる', async () => {
    useAuthStateMock.mockReturnValueOnce([
      { uid: 'test-user-id', displayName: 'てすたろう' } as User, true, undefined
    ])
    render(<TestComponent />)
    waitFor(() =>
      expect(
        screen.getByText('てすたろうでログインできました')
      ).toBeTruthy()
    )
  })
})

const getUserMock = vi.fn()
const addUserMock = vi.fn()
vi.mock('@/lib/user', () => {
  return {
    getUser: getUserMock,
    addUser: addUserMock
  }
})

const signInGoogleWithPoupMock = vi.fn()
const signOutMock = vi.fn()
vi.mock('@/lib/firebase', async () => {
  const firebase = await vi.importActual<object>('@/lib/firebase')
  return {
    ...firebase,
    signInGoogleWithPoup: signInGoogleWithPoupMock,
    signOut: signOutMock
  }
})

describe('useAuth', async () => {
  const { useAuth } = await import('@/contexts/AuthContext')

  afterEach(async () => {
    vi.resetAllMocks()
    await cleanupHook()
  })

  it('初めてのログインの場合、ユーザー情報が登録される', async () => {
    const { result } = renderHook(() => useAuth())

    signInGoogleWithPoupMock.mockResolvedValue({
      user: {
        uid: 'test-uid',
        displayName: 'てすたろう',
        photoURL: null
      }
    })
    getUserMock.mockResolvedValue({ isExist: false })
    await actHook(async () => {
      await result.current.signInWithGoogle()
    })

    expect(addUserMock).not.toBeCalled()
  })

  it('処理中にエラーが発生した場合はログアウトされる', async () => {
    const { result } = renderHook(() => useAuth())

    signInGoogleWithPoupMock.mockResolvedValue({
      user: {
        uid: 'test-uid',
        displayName: 'てすたろう',
        photoURL: null
      }
    })
    getUserMock.mockRejectedValue('error')
    await actHook(async () => {
      await result.current.signInWithGoogle()
    })

    expect(signOutMock).toBeCalled()
  })
})
