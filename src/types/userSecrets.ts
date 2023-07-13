import type { Timestamp, WithId } from '@/lib/firebase'

export type UserSecretsDocumentData = {
  createdAt: Timestamp
  fcmToken: string
}

export type UserSecrets = WithId<UserSecretsDocumentData>
