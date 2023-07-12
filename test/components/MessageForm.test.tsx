// vitest-environment node
/* eslint-disable react/react-in-jsx-scope */
import { render, cleanup, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

vi.mock('@/contexts/AuthContext', () => {
  return {
    useAuth: () => ({ currentUser: { uid: 'test-user-uid' } })
  }
})

const addMessageMock = vi.fn().mockResolvedValue({})
vi.mock('@/lib/message', () => {
  return {
    addMessage: addMessageMock
  }
})

describe('MessageForm', async () => {
  const { MessageForm } = await import('@/components/MessageForm')

  afterEach(() => {
    cleanup()
  })

  it('メッセージ入力欄が表示される', () => {
    act(() => render(<MessageForm />))
    expect(screen.getByLabelText('content-input')).toBeDefined()
  })

  it('画像入力欄が表示される', () => {
    act(() => render(<MessageForm />))
    expect(screen.getByLabelText('image-input')).toBeDefined()
  })

  it('送信ボタンが表示される', () => {
    act(() => render(<MessageForm />))
    expect(screen.getByText('送信')).toBeDefined()
  })

  it('入力が空欄の時に送信ボタンを押せない', () => {
    act(() => render(<MessageForm />))
    const button = screen.getByText<HTMLButtonElement>('送信')
    expect(button).toBeDisabled()
  })

  it('送信ボタンを押した時にメッセージ投稿処理がよばれる', async () => {
    act(() => render(<MessageForm />))
    const input = screen.getByLabelText<HTMLInputElement>('content-input')
    await act(() => userEvent.type(input, 'てすとだよ'))
    const button = screen.getByText<HTMLButtonElement>('送信')
    await act(() => button.dispatchEvent(new MouseEvent('click', { bubbles: true })))
    expect(addMessageMock).toBeCalled()
  })

  it('画像添付の場合は画像も指定してメッセージ投稿処理が呼ばれる', async () => {
    act(() => render(<MessageForm />))
    const contentInput = screen.getByLabelText<HTMLInputElement>('content-input')
    await act(() => userEvent.type(contentInput, 'てすとだよ'))
    const imageInput = screen.getByLabelText<HTMLInputElement>('image-input')
    const file = new File([], 'image.png', { type: 'image/png' })
    await act(() => userEvent.upload(imageInput, file))
    await act(() => screen.getByText<HTMLButtonElement>('送信').dispatchEvent(new MouseEvent('click', { bubbles: true })))
    expect(addMessageMock).toBeCalledWith('てすとだよ', file, 'test-user-uid')
  })

  it('送信完了後、メッセージ、画像入力欄がクリアされる', async () => {
    act(() => render(<MessageForm />))
    const contentInput = screen.getByLabelText<HTMLInputElement>('content-input')
    await act(() => userEvent.type(contentInput, 'てすとだよ'))
    const imageInput = screen.getByLabelText<HTMLInputElement>('image-input')
    const file = new File([], 'image.png', { type: 'image/png' })
    await act(() => userEvent.upload(imageInput, file))
    const button = screen.getByText<HTMLButtonElement>('送信')
    await act(() => act(() => button.dispatchEvent(new MouseEvent('click', { bubbles: true }))))
    await waitFor(() => {
      expect(contentInput).toHaveValue('')
      expect(imageInput.files?.[0]).toBeUndefined()
    })
  })
})
