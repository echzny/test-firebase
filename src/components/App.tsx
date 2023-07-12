/* eslint-disable react/react-in-jsx-scope */
import { MessageForm } from './MessageForm'
import { Messages } from './Messages'

export const App = () => {
  // レンダリング時にMessagesがエラーになるので、ErrorBoundaryでエラーハンドリングする
  return (
    <div>
      <div>Sample Chat App</div>
      <div>
        <Messages />
        <MessageForm />
      </div>
    </div>
  )
}
