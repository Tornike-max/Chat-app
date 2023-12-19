import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMessage } from "../services/appwrite";

export function useCreateMessage() {
  const queryClient = useQueryClient();
  const { mutate: create, isPending: isCreating } = useMutation({
    mutationFn: ({
      dataObj,
    }: {
      dataObj: { body: string; username?: string; user_id?: string };
    }) => createMessage({ dataObj }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
    onError: () => {
      alert("Error");
    },
  });

  return { create, isCreating };
}
