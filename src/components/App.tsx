/* eslint-disable react/react-in-jsx-scope */
import { ErrorBoundary } from "react-error-boundary"
import { MessageForm } from './MessageForm'
import { Messages } from './Messages'

export const App = () => {
  // レンダリング時にMessagesがエラーになるので、ErrorBoundaryでエラーハンドリングする
  return (
    <div>
      <div>Sample Chat App</div>
      <div>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Messages />
        </ErrorBoundary>
        <MessageForm />
      </div>
    </div>
  )
}
