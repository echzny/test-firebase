// vitest-environment node
/* eslint-disable react/react-in-jsx-scope */
import { render, cleanup, screen } from '@testing-library/react'
import { vi } from 'vitest'

// Messagesコンポーネントの実行に必須なのでモックで代用する
const useCollectionDataMock = vi.fn()
vi.mock('@/hooks/useCollectionData', () => {
  return {
    useCollectionData: useCollectionDataMock
  }
})

describe('App', async () => {
  const { App } = await import('@/components/App')
  afterEach(() => cleanup())

  it('タイトル文字列が表示される', () => {
    useCollectionDataMock.mockReturnValue([[], true, undefined, undefined])
    render(<App />)
    expect(screen.getByText('Sample Chat App')).toBeTruthy()
  })
})
