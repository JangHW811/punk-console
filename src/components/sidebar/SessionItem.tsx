"use client";

import {
  MessageSquare,
  MoreVertical,
  Pencil,
  Settings,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type SessionInfo, useSessionStore } from "@/stores/sessionStore";

const SessionItem = ({ session }: { session: SessionInfo }) => {
  const { id, projectSummary, analyticTarget, createdAt } = session;
  const { selectedSessionId, setSelectedSessionId } = useSessionStore();
  const isSelected = selectedSessionId === id;
  return (
    <div
      key={id}
      role="button"
      tabIndex={0}
      onClick={() => setSelectedSessionId(id || null)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setSelectedSessionId(id || null);
        }
      }}
      className={`w-full flex items-start gap-3 px-3 py-3 rounded-lg transition-colors group cursor-pointer ${
        isSelected
          ? "bg-slate-600 hover:bg-slate-500"
          : "bg-slate-800 hover:bg-gray-700"
      }`}
    >
      <div className="flex-1 min-w-0 text-left">
        <div className="text-sm font-semibold text-gray-200 truncate flex items-center">
          <div className="mt-0.5 shrink-0 mr-2">
            <MessageSquare className="w-5 h-5 text-gray-300" />
          </div>
          {projectSummary || analyticTarget || "새 분석"}
          <span className="ml-1 text-xs font-normal text-gray-400">
            (오프라인)
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-200">
          <span>0개 메시지</span>
          <span className="w-1 h-1 rounded-full bg-gray-400"></span>
          <span>{createdAt?.format("YYYY-MM-DD HH:mm")}</span>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="group-hover:opacity-100 transition-opacity shrink-0 p-1 hover:bg-gray-600 rounded"
          >
            <MoreVertical className="w-4 h-4 text-gray-200" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              // TODO: 이름 변경 기능
            }}
            className="cursor-pointer"
          >
            <Pencil className="mr-2 h-4 w-4" />
            이름 변경
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              // TODO: 프로젝트 설정 기능
            }}
            className="cursor-pointer"
          >
            <Settings className="mr-2 h-4 w-4" />
            프로젝트 설정
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              // TODO: 삭제 기능
            }}
            className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SessionItem;
