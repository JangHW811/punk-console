import { Upload } from "lucide-react";
import useFileUpload from "@/apis/file";
import { useSessionStore } from "@/stores/sessionStore";

const DataUpload = () => {
  const { mutateAsync } = useFileUpload();
  const { setFileId } = useSessionStore();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("file", file);
    if (!file) return;
    const result = await mutateAsync(file);
    console.log("result", result);
    setFileId(result.file_id);
  };
  return (
    <div
      className={"border-t border-gray-200 transition-height duration-300 p-4"}
    >
      <label className="cursor-pointer w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
        <input type="file" onChange={handleFileChange} className="hidden" />
        <Upload className="w-4 h-4" />
        데이터 업로드
      </label>
    </div>
  );
};

export default DataUpload;
