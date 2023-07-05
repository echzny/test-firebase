import { render, cleanup, screen } from '@testing-library/react'
import { App } from '@/components/App'

describe('App', () => {
  afterEach(() => cleanup())

  it('タイトル文字列が表示される', async () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    render(<App />)
    expect(screen.getByText('Sample Chat App')).toBeTruthy()
  })
})
