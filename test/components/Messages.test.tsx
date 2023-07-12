// vitest-environment node
/* eslint-disable react/react-in-jsx-scope */
import { render, cleanup, screen } from '@testing-library/react'
import { userFactory } from '@/../test/factories/user'
import { messageFactory } from '@/../test/factories/message'
import { vi } from 'vitest'

const useCollectionDataMock = vi.fn()
vi.mock('@/hooks/useCollectionData', () => {
  return {
    useCollectionData: useCollectionDataMock
  }
})

const useUsersMock = vi.fn()
vi.mock('@/contexts/UsersContext', () => {
  return {
    useUsers: useUsersMock
  }
})

const useBlobMock = vi.fn()
vi.mock('@/hooks/useBlob', () => {
  return {
    useBlob: useBlobMock
  }
})

describe('Messages', async () => {
  const { Messages } = await import('@/components/Messages')

  afterEach(() => {
    vi.resetAllMocks()
    cleanup()
  })

  it('ローディング中の場合、ローディング画面が表示される', async () => {
    useCollectionDataMock.mockReturnValue([[], true, undefined, undefined])
    render(<Messages />)
    expect(screen.getByText('loading...')).toBeTruthy()
  })

  it('ローディング完了後、メッセージ一覧が表示される', async () => {
    const message = messageFactory.build({
      id: 'test-message-id',
      content: 'テストメッセージ',
      senderId: 'test-user-uid'
    })
    const message2 = messageFactory.build({
      id: 'test-message2-id',
      content: 'テストメッセージ2',
      senderId: 'test-user-uid'
    })
    useCollectionDataMock.mockReturnValue([[message, message2], false, undefined, undefined])

    useBlobMock.mockReturnValue({ url: 'message-image-url' })

    const user = userFactory.build({
      id: 'test-user-uid',
      name: 'てすたろう'
    })
    useUsersMock.mockReturnValue({
      users: [user],
      usersById: {
        [user.id]: user
      },
      loading: false
    })
    render(<Messages />)
    expect(screen.getByText('テストメッセージ')).toBeTruthy()
    expect(screen.getByText('テストメッセージ2')).toBeTruthy()
  })
})
