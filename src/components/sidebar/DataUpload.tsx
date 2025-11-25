"use client";
import { UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import useFileUpload from "@/apis/file";
import { useSessionStore } from "@/stores/sessionStore";

interface UploadedFile {
  fileId: string;
  name: string;
  size: number;
}

const DataUpload = () => {
  const { mutateAsync } = useFileUpload();
  const { setFileId } = useSessionStore();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [selectedFileIndex, setSelectedFileIndex] = useState<number | null>(
    null
  );
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = async (incomingFiles: File[]) => {
    if (!incomingFiles.length) return;
    let hasSelection = selectedFileIndex !== null;
    for (const file of incomingFiles) {
      try {
        const result = await mutateAsync(file);
        const uploaded: UploadedFile = {
          fileId: result.file_id,
          name: result.filename || file.name,
          size: result.size || file.size,
        };
        setFiles((prev) => [...prev, uploaded]);
        if (!hasSelection) {
          hasSelection = true;
          setSelectedFileIndex(0);
          setFileId(uploaded.fileId);
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

  const handleSelectFile = (index: number) => {
    const file = files[index];
    if (!file) return;
    setSelectedFileIndex(index);
    setFileId(file.fileId);
  };

  return (
    <section className="p-4">
      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={handleBrowse}
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-indigo-400 hover:text-indigo-500"
        >
          <UploadCloud className="h-4 w-4" />
          파일 선택
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
        {files.length === 0 ? (
          <div
            className={`mt-3 rounded-2xl border-2 border-dashed py-10 text-center text-xs transition ${
              isDragging
                ? "border-indigo-400 bg-indigo-50/70 text-indigo-500"
                : "border-slate-300 text-slate-400"
            }`}
          >
            파일을 클릭하거나 드래그앤드롭으로 업로드하세요.
          </div>
        ) : (
          <ul className="mt-3 space-y-2">
            {files.map((file, index) => (
              <li key={`${file.name}-${index}`}>
                <button
                  type="button"
                  onClick={() => handleSelectFile(index)}
                  className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition ${
                    selectedFileIndex === index
                      ? "border-indigo-400 bg-indigo-50 text-indigo-700"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <span className="truncate">{file.name}</span>
                  <span className="text-xs">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default DataUpload;
