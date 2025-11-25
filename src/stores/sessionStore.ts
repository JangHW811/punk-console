import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { create } from "zustand";

export interface SessionInfo {
  id?: string;
  projectSummary?: string;
  analyticTarget?: string;
  createdAt?: Dayjs;
}
interface SessionStoreState {
  selectedSessionId: string | null;
  setSelectedSessionId: (id: string | null) => void;
  sessionInfoList: SessionInfo[];
  addSessionInfo: (sessionInfo?: SessionInfo) => void;
  taskType?: string;
  fileId?: string;
  setTaskType: (taskType: string) => void;
  setFileId: (fileId: string) => void;
  clearTaskType: () => void;
  clearFileId: () => void;
}

export const useSessionStore = create<SessionStoreState>((set) => ({
  selectedSessionId: null,
  setSelectedSessionId: (id) => set({ selectedSessionId: id }),
  sessionInfoList: [],
  addSessionInfo: (sessionInfo) =>
    set((state) => {
      const randomId = Math.random().toString(36).substring(2, 15);
      console.log("randomId", randomId);
      const createdAt = dayjs();
      return {
        sessionInfoList: [
          ...state.sessionInfoList,
          { id: randomId, createdAt, ...sessionInfo },
        ],
      };
    }),
  setTaskType: (taskType) => set({ taskType }),
  setFileId: (fileId) => set({ fileId }),
  clearTaskType: () => set({ taskType: undefined }),
  clearFileId: () => set({ fileId: undefined }),
}));
