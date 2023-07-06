import { initializeTestEnvironment, getTestEnv } from "../utils"
import { afterAll, afterEach, beforeAll, describe } from 'vitest'
import { usersTest } from '@/../test/rules/firestore/collections/user'
import { messageTest } from '@/../test/rules/firestore/collections/message'

process.env.FIRESTORE_EMULATOR_HOST = 'localhost:4000'

describe('firestore.rules', () => {
  beforeAll(async () => {
    await initializeTestEnvironment()
  })

  afterAll(async () => {
    await getTestEnv().cleanup()
  })

  afterEach(async () => {
    await getTestEnv().clearFirestore()
  })

  usersTest()
  messageTest()
})
