import {
  LucideIcon,
  NotebookPen,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";
const ChatGuide = () => {
  return (
    <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white/80 p-8 text-center shadow-xl backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
        Welcome
      </p>
      <p className="mt-3 text-sm text-slate-500">
        세션을 만든후 분석을 위한 파일을 업로드 하고 Analysis를 선택 후 대화를
        시작하세요.
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
export default ChatGuide;
