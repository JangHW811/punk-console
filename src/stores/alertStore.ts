import { create } from "zustand";

interface AlertBaseConfig {
  title: string;
  description: string;
  onConfirm: () => void;
  confirmButtonText?: string;
}

interface ConfirmExtraConfig {
  onCancel?: () => void;
  cancelButtonText?: string;
}

export type AlertConfig = AlertBaseConfig;
export type ConfirmConfig = AlertBaseConfig & ConfirmExtraConfig;

type AlertStateConfig =
  | (AlertBaseConfig & { type: "alert" })
  | (AlertBaseConfig & ConfirmExtraConfig & { type: "confirm" });

interface AlertStoreState {
  config: AlertStateConfig | null;
  isOpen: boolean;
  showAlert: (config: AlertConfig) => void;
  showConfirm: (config: ConfirmConfig) => void;
  hide: () => void;
  clear: () => void;
}

export const useAlertStore = create<AlertStoreState>((set) => ({
  config: null,
  isOpen: false,
  showAlert: (config) =>
    set({
      config: {
        ...config,
        confirmButtonText: config.confirmButtonText ?? "확인",
        type: "alert",
      },
      isOpen: true,
    }),
  showConfirm: (config) =>
    set({
      config: {
        ...config,
        confirmButtonText: config.confirmButtonText ?? "확인",
        cancelButtonText: config.cancelButtonText ?? "취소",
        type: "confirm",
        onCancel: config.onCancel,
      },
      isOpen: true,
    }),
  hide: () => set({ isOpen: false }),
  clear: () => set({ config: null }),
}));

export const useAlertActions = () => {
  const alert = useAlertStore((state) => state.showAlert);
  const confirm = useAlertStore((state) => state.showConfirm);
  const hideAlert = useAlertStore((state) => state.hide);

  return { alert, confirm, hideAlert };
};
