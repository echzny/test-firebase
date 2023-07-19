import { Timestamp } from '../../lib/firebase'
import type { WithId } from './firebase'

export type UserSecretsDocumentData = {
  createdAt: Timestamp
  fcmToken: string
}

export type UserSecrets = WithId<UserSecretsDocumentData>
