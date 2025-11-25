import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type SessionInfo, useSessionStore } from "@/stores/sessionStore";

export const useUpsertSessionInfo = () => {
  const queryClient = useQueryClient();
  const { addSessionInfo } = useSessionStore();
  return useMutation({
    mutationFn: (sessionInfo?: SessionInfo) => {
      return Promise.resolve(addSessionInfo(sessionInfo));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useSessionInfoList"] });
    },
  });
};

export const useSessionInfoList = () => {
  const { sessionInfoList } = useSessionStore();
  return useQuery({
    queryKey: ["useSessionInfoList"],
    queryFn: () => {
      return sessionInfoList;
    },
  });
};
