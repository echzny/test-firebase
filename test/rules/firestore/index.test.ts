// vitest-environment node
import { initializeTestEnvironment, getTestEnv } from "../../utils"
import { usersTest } from '@/../test/rules/firestore/collections/user'
import { messageTest } from '@/../test/rules/firestore/collections/message'
import { userSecretsTest } from "@/../test/rules/firestore/collections/useSecrets"

describe('firestore.rules', () => {
  beforeAll(async () => {
    await initializeTestEnvironment('testable-firebase-sample-chat-firestore-rules-test')
  })

  afterAll(async () => {
    await getTestEnv().cleanup()
  })

  afterEach(async () => {
    await getTestEnv().clearFirestore()
  })

  usersTest()
  messageTest()
  userSecretsTest()
})
