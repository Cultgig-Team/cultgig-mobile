import "react-native-url-polyfill/auto";
import {
  Client,
  Databases,
  Storage,
  Account,
  ID,
  Query,
} from "react-native-appwrite";

const client = new Client();

client
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);

export const APPWRITE_CONFIG = {
  DATABASE_ID: process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
  CONVERSATIONS_COLLECTION_ID: "conversations",
  MESSAGES_COLLECTION_ID: "messages",
  BLOCKS_COLLECTION_ID: "blocks",
  REPORTS_COLLECTION_ID: "reports",
  USERS_COLLECTION_ID: "user",
  STORAGE_BUCKET_ID: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID,
};

export { client, ID, Query };
