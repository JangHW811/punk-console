"use client";

import { useAlertActions, useAlertStore } from "@/stores/alertStore";
import { useCallback, useRef } from "react";
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
  const actionButtonRef = useRef<HTMLButtonElement>(null);

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

  const handleOpenAutoFocus = useCallback((event: Event) => {
    event.preventDefault();
    // 기본 포커스 동작을 막고 action 버튼에 포커스
    setTimeout(() => {
      actionButtonRef.current?.focus();
    }, 0);
  }, []);

  if (!config) {
    return null;
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent
        onAnimationEnd={handleExitAnimation}
        onTransitionEnd={handleExitAnimation}
        onOpenAutoFocus={handleOpenAutoFocus}
      >
        <AlertDialogTitle>{config.title}</AlertDialogTitle>
        <AlertDialogDescription>{config.description}</AlertDialogDescription>
        <AlertDialogFooter>
          {config.type === "confirm" ? (
            <AlertDialogCancel onClick={config.onCancel}>
              {config.cancelButtonText}
            </AlertDialogCancel>
          ) : null}
          <AlertDialogAction ref={actionButtonRef} onClick={config.onConfirm}>
            {config.confirmButtonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { AlertRoot, useAlertActions };
