import { ID, Query, Role, Permission } from "appwrite";
import {
  COLLECTION_ID,
  DATABASE_ID,
  account,
  databases,
} from "../appWriteConfig";

export async function getData() {
  const data = databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
    Query.orderDesc("$createdAt"),
    Query.limit(20),
  ]);

  return data;
}

export async function createMessage({
  dataObj,
}: {
  dataObj: { body: string; username?: string; user_id?: string };
}) {
  const userId = dataObj?.user_id || "";

  if (userId !== undefined) {
    const permissions = [Permission.write(Role.user(userId))];
    const data = databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      dataObj,
      permissions
    );
    return data;
  } else {
    throw new Error("User ID is undefined");
  }
}

export async function deleteMessage(id: string) {
  const data = databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
  return data;
}

export async function logout(sessionId: string) {
  const promise = await account.deleteSession(sessionId);
  return promise;
}
