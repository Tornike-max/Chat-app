import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMessage as deleteMessageApi } from "../services/appwrite";

export function useDeleteMessage() {
  const queryCLient = useQueryClient();
  const { mutate: deleteMessage, isPending: idDeleting } = useMutation({
    mutationFn: (id: string) => deleteMessageApi(id),
    onSuccess: () => {
      queryCLient.invalidateQueries({ queryKey: ["data"] });
    },
    onError: () => {
      throw new Error(`Error deleting message`);
    },
  });
  return { deleteMessage, idDeleting };
}
