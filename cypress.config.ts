import { defineConfig } from "cypress"
import * as admin from 'firebase-admin'
import { plugin as cypressFirebasePlugin } from 'cypress-firebase'

console.log(admin)
admin.initializeApp({
  projectId: 'testable-firebase-sample-chat-test',
})

export default defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:5002',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
      cypressFirebasePlugin(on, config, admin)

      process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080'
      process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099'
      process.env.FIREBASE_STORAGE_EMULATOR_HOST = '127.0.0.1:9199'

      on('task', {
        async 'create:user'(user: {
          uid: string;
          email: string;
          displayName: string;
          password: string;
          emailVerified: boolean;
        }) {
          await admin.auth().createUser(user);
          return admin.firestore().doc(`/users/${user.uid}`).set({ name: user.displayName, createdAt: new Date() })
        },
      })
    },
  },
})
