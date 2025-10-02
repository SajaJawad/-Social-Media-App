import { Client, Account, Databases, Storage, Avatars } from 'appwrite'




export const appwriteConfig = {
    url: import.meta.env.VITE_APPWRITE_URL,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
    postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
    savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID
};

if (!appwriteConfig.url) {
    throw new Error("VITE_APPWRITE_URL is not defined. Please check your .env.local file and restart the dev server.");
}
if (!appwriteConfig.projectId) {
    throw new Error("VITE_APPWRITE_PROJECT_ID is not defined. Please check your .env.local file and restart the dev server.");
}


export const client = new Client()
client.setEndpoint(appwriteConfig.url)
client.setProject(appwriteConfig.projectId)




export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
