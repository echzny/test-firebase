import { Factory } from 'fishery'
import { Timestamp } from 'firebase/firestore'
import { UserSecrets } from '@/shared/types/userSecrets'

export const userSecretFactory = Factory.define<UserSecrets>(
  ({ sequence }) => ({
    id: sequence.toString(),
    createdAt: Timestamp.fromDate(new Date()),
    fcmToken: `token${sequence}`
  })
)
