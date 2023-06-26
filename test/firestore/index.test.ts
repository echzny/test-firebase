import { initializeTestEnvironment, getTestEnv } from "../rules/firestore/utils"
import { afterAll, afterEach, beforeAll, describe } from 'vitest'
import { usersTest } from '../rules/firestore/collections/user'

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
})
