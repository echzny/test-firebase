/* eslint-disable react/react-in-jsx-scope */
import { MessageForm } from './MessageForm'
import { Messages } from './Messages'

export const App = () => {
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
