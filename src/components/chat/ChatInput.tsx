import { useState } from "react";
import { Button } from "../ui/button";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const handleSendMessage = () => {
    console.log("message", message);
  };

  return (
    <div className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white/90 shadow-lg backdrop-blur px-6 py-5">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
        <span>Chat Input</span>
        <span>Ready</span>
      </div>
      <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3">
        <textarea
          rows={3}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="예: 최신 트렌드 분석할때 소비자 니즈를 파악해줘"
          className="w-full resize-none border-none bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSendMessage();
            }
          }}
        />
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span>Shift + Enter = 줄바꿈</span>
        <Button
          onClick={handleSendMessage}
          type="button"
          className="rounded-full px-4 py-1.5 text-xs font-semibold text-white"
        >
          메시지 보내기
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
