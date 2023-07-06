import { afterAll, afterEach, beforeAll, describe } from 'vitest'
import { initializeTestEnvironment, getTestEnv } from '@/../test/utils'
import { messagesTest } from '@/../test/queries/firestore/collections/messages'

describe('firestore.rules', () => {
  beforeAll(async () => {
    await initializeTestEnvironment(
      'testable-firebase-sample-chat-queries-test'
    )
  })

  afterAll(async () => {
    await getTestEnv().cleanup()
  })

  afterEach(async () => {
    await getTestEnv().clearFirestore()
  })

  messagesTest()
})
