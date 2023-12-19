import { Client, Databases, Account } from "appwrite";

const client = new Client();

export const DATABASE_ID = "657f63f59579fe81b337";
export const COLLECTION_ID = "657f649460efb333ca38";
export const PROJECT_ID = "657f623402efec067b03";

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("657f623402efec067b03");

export const databases = new Databases(client);
export const account = new Account(client);

export default client;
