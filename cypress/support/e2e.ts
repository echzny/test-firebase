import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/firestore'
import { attachCustomCommands } from 'cypress-firebase'

const fbConfig = {
  apiKey: 'dummy-api-key',
  authDomain: '',
  projectId: 'testable-firebase-sample-chat-test',
  storageBucket: '',
  messagingSenderId: '',
  apiId: ''
}

firebase.initializeApp(fbConfig)

firebase.auth().useEmulator('http://127.0.0.1:9099')
attachCustomCommands({ Cypress, cy, firebase })
