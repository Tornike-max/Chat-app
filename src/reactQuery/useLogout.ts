import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../services/appwrite";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isPending: isLogout } = useMutation({
    mutationFn: (sessionId: string) => logoutApi(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/login");
    },
    onError: () => {
      console.error("Error while authenticating");
    },
  });

  return { logout, isLogout };
}
