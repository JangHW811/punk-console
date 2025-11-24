"use client";

import { useCallback } from "react";
import {
  type AlertConfig,
  type ConfirmConfig,
  useAlertActions,
  useAlertStore,
} from "@/stores/alertStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "../../ui/alert-dialog";

const AlertRoot = () => {
  const config = useAlertStore((state) => state.config);
  const isOpen = useAlertStore((state) => state.isOpen);
  const hide = useAlertStore((state) => state.hide);
  const clear = useAlertStore((state) => state.clear);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      hide();
    }
  };

  const handleExitAnimation = useCallback(
    (
      event:
        | React.AnimationEvent<HTMLDivElement>
        | React.TransitionEvent<HTMLDivElement>
    ) => {
      if (event.currentTarget.getAttribute("data-state") === "closed") {
        clear();
      }
    },
    [clear]
  );

  if (!config) {
    return null;
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent
        onAnimationEnd={handleExitAnimation}
        onTransitionEnd={handleExitAnimation}
      >
        <AlertDialogTitle>{config.title}</AlertDialogTitle>
        <AlertDialogDescription>{config.description}</AlertDialogDescription>
        <AlertDialogFooter>
          {config.type === "confirm" ? (
            <AlertDialogCancel onClick={config.onCancel}>
              {config.cancelButtonText}
            </AlertDialogCancel>
          ) : null}
          <AlertDialogAction onClick={config.onConfirm}>
            {config.confirmButtonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const useAlert = () => {
  const actions = useAlertActions();

  return {
    alert: (config: AlertConfig) => actions.alert(config),
    confirm: (config: ConfirmConfig) => actions.confirm(config),
    hideAlert: () => actions.hideAlert(),
  };
};

export { AlertRoot, useAlert };
