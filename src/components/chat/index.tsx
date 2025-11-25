"use client";

import type { LucideIcon } from "lucide-react";
import { NotebookPen, ShieldCheck, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSessionStore } from "@/stores/sessionStore";
import { Button } from "../ui/button";

const Chat = () => {
  const { fileId, selectedSessionId, taskType } = useSessionStore();
  const isReady = selectedSessionId && fileId && taskType;
  const containerClassName = cn(
    "flex-1 mx-auto min-h-[calc(100vh-4rem)] max-w-120 max-h-[100vh] overflow-hidden bg-linear-to-br from-slate-50 via-white to-slate-100 transition-all duration-300"
  );
  return (
    <section className={containerClassName}>
      <div className="flex h-full flex-col items-center justify-between px-4 py-12 gap-8">
        <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white/80 p-8 text-center shadow-xl backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
            Welcome
          </p>
          <p className="mt-3 text-sm text-slate-500">
            세션을 만든후 분석을 위한 파일을 업로드 하고 Analysis를 선택 후
            대화를 시작하세요.
          </p>

          <div className="mt-8 grid gap-3 text-left text-sm text-slate-500">
            <MiniPoint
              icon={ShieldCheck}
              label="데이터는 안전하게 암호화 저장됩니다."
            />
            <MiniPoint
              icon={NotebookPen}
              label="대화를 시작하면 리포트 초안이 자동 생성됩니다."
            />
            <MiniPoint
              icon={UploadCloud}
              label="최대 50MB까지 CSV, XLSX 업로드 지원."
            />
          </div>
        </div>

        <div className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white/90 shadow-lg backdrop-blur px-6 py-5">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
            <span>Chat Input</span>
            <span>Ready</span>
          </div>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3">
            <textarea
              rows={3}
              placeholder="예: 최신 트렌드 분석할때 소비자 니즈를 파악해줘"
              className="w-full resize-none border-none bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span>Shift + Enter = 줄바꿈</span>
            <Button
              type="button"
              className="rounded-full px-4 py-1.5 text-xs font-semibold text-white"
            >
              메시지 보내기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const MiniPoint = ({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) => (
  <div className="flex items-center gap-3 rounded-2xl border border-slate-100/80 bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-sm">
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-500">
      <Icon className="h-4 w-4" />
    </span>
    {label}
  </div>
);

export default Chat;
