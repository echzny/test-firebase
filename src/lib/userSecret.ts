import { getFirestore, collection, doc, getDoc, setDoc } from "firebase/firestore"
import { getConverter, serverTimestamp } from "@/lib/firebase"
import type { UserSecretsDocumentData } from "@/shared/types/userSecrets"

export const userSecretsRef = () => collection(getFirestore(), 'userSecrets')
.withConverter(getConverter<UserSecretsDocumentData>())

export const setUserSecret = async (uid: string, { fcmToken }: { fcmToken: string }) => {
    const userSecret = { fcmToken, createdAt: serverTimestamp() }
    await setDoc(doc(userSecretsRef(), uid), userSecret, { merge: true })
}
