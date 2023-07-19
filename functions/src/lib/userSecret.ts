import { db, FieldPath, CollectionReference, Query } from './firebase'
import { UserSecretsDocumentData } from '../shared/types/userSecrets'

export const userSecretsRef = db.collection('userSecrets') as CollectionReference<UserSecretsDocumentData>
