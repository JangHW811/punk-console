"use client";
import useFileUpload from "@/apis/file";
import { useSessionStore } from "@/stores/sessionStore";
import { Loader2, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import { useAlertActions } from "../common/providers/AlertProvider";
import UploadedFileItem, { UploadedFile } from "./UploadedFileItem";

const DataUpload = () => {
  const { mutateAsync, isPending: isUploading } = useFileUpload();
  const {} = useAlertActions();
  const { addSelectedFileId, removeSelectedFileId, selectedFileIdList } =
    useSessionStore();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = async (incomingFiles: File[]) => {
    if (!incomingFiles.length) return;
    let hasSelection = selectedFileIdList.length > 0;
    for (const file of incomingFiles) {
      const result = await mutateAsync(file);
      try {
        const uploaded: UploadedFile = {
          fileId: result.file_id,
          name: result.filename || file.name,
          size: result.size || file.size,
        };
        setFiles((prev) => [...prev, uploaded]);
        if (!hasSelection) {
          hasSelection = true;
          addSelectedFileId(result.file_id);
        }
      } catch (error) {
        console.error("파일 업로드 실패", error);
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList?.length) return;
    await handleFiles(Array.from(fileList));
    e.target.value = "";
  };

  const handleBrowse = () => {
    inputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) {
      return;
    }
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (!e.dataTransfer.files?.length) return;
    await handleFiles(Array.from(e.dataTransfer.files));
  };

  const handleSelectFile = (fileId: string) => {
    const idExistFile = files.find((file) => file.fileId === fileId);
    if (!idExistFile) return;
    if (selectedFileIdList.includes(fileId)) {
      if (selectedFileIdList.length === 1) {
        return;
      }
      removeSelectedFileId(fileId);
    } else {
      addSelectedFileId(fileId);
    }
  };

  return (
    <section className="p-4 min-h-[250px]">
      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={handleBrowse}
          disabled={isUploading}
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-indigo-400 hover:text-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              업로드 중...
            </>
          ) : (
            <>
              <UploadCloud className="h-4 w-4" />
              파일 선택
            </>
          )}
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
        <p className="text-xs text-slate-400">
          {files.length > 0
            ? `${files.length}개 파일 준비됨`
            : "파일을 선택해 데이터를 업로드하세요"}
        </p>
      </div>

      <div
        className="mt-6 w-full"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="region"
        aria-label="파일 업로드 드롭 영역"
      >
        <p className="text-left text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Uploaded Files
        </p>
        <ul className="mt-3 space-y-2">
          {files.map((file, index) => (
            <UploadedFileItem
              key={`${file.name}-${index}`}
              file={file}
              selectedFileId={selectedFileIdList}
              handleSelectFile={handleSelectFile}
            />
          ))}
        </ul>
        <div
          className={`mt-3 rounded-2xl border-2 border-dashed py-10 text-center text-xs transition ${
            isUploading
              ? "border-indigo-400 bg-indigo-50/70 text-indigo-500"
              : isDragging
              ? "border-indigo-400 bg-indigo-50/70 text-indigo-500"
              : "border-slate-300 text-slate-400"
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-indigo-500" />
              <span className="text-indigo-500">파일 업로드 중...</span>
            </div>
          ) : (
            "파일을 클릭하거나 드래그앤드롭으로 업로드하세요."
          )}
        </div>
      </div>
    </section>
  );
};

export default DataUpload;
