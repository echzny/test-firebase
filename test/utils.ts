import {
  initializeTestEnvironment as _initializeTestEnvironment,
  RulesTestEnvironment
} from '@firebase/rules-unit-testing'
import { readFileSync } from 'fs'
import firebase from 'firebase/compat/app'
import { getConverter, WithId } from '@/lib/firebase'

let testEnv: RulesTestEnvironment

export const initializeTestEnvironment = async (projectId?: string) => {
  process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080'
  testEnv = await _initializeTestEnvironment({
    projectId: projectId ? projectId : 'test-firebase',
    firestore: {
      rules: readFileSync('firestore.rules', 'utf8')
    },
    storage: {
      host: '127.0.0.1',
      port: 9199,
      rules: readFileSync('storage.rules', 'utf8')
    }
  })
}

export const getTestEnv = () => testEnv

export const setCollection = <T extends firebase.firestore.DocumentData>(
  ref: firebase.firestore.CollectionReference,
  instances: WithId<T>[]
) => Promise.all(
  instances.map((_) =>
    ref.doc(_.id).set(getConverter<T>().toFirestore(_))
  )
)
