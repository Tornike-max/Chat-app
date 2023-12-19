import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getData } from "../services/appwrite";
import client, { DATABASE_ID, COLLECTION_ID } from "../appWriteConfig";
import { useEffect } from "react";

export function useGetInfo() {
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ["data"],
    queryFn: getData,
  });

  useEffect(() => {
    let timeout: number | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let subscription: any; // Adjust the type based on your subscription's actual type

    if (data) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handleSubscription = (response: any) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          queryClient.invalidateQueries({ queryKey: ["data"] });
        } else if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          queryClient.invalidateQueries({ queryKey: ["data"] });
        }

        if (timeout) {
          clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
          queryClient.prefetchQuery({
            queryKey: ["data"],
            queryFn: getData,
          });
        }, 1000);
      };

      subscription = client.subscribe(
        [
          `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`,
          "files",
        ],
        handleSubscription
      );

      const unsubscribe =
        subscription?.unsubscribe ||
        subscription?.removeListener ||
        subscription?.cancel;
      if (unsubscribe) {
        return () => {
          unsubscribe();
        };
      }
    }
  }, [data, queryClient]);

  return { data: data?.documents, isPending };
}
