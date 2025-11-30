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
  selectedFileIdList: string[];
  setSelectedSessionId: (id: string | null) => void;
  setSelectedFileIdList: (idList: string[]) => void;
  addSelectedFileId: (id: string) => void;
  removeSelectedFileId: (id: string) => void;
  clearSelectedFileIdList: () => void;
  sessionInfoList: SessionInfo[];
  addSessionInfo: (sessionInfo?: SessionInfo) => void;
  taskType?: string;
  setTaskType: (taskType: string) => void;
  clearTaskType: () => void;
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
  clearTaskType: () => set({ taskType: undefined }),
  selectedFileIdList: [],
  setSelectedFileIdList: (idList) => set({ selectedFileIdList: idList }),
  addSelectedFileId: (id) =>
    set((state) => ({ selectedFileIdList: [...state.selectedFileIdList, id] })),
  removeSelectedFileId: (id) =>
    set((state) => ({
      selectedFileIdList: state.selectedFileIdList.filter((id) => id !== id),
    })),
  clearSelectedFileIdList: () => set({ selectedFileIdList: [] }),
}));
