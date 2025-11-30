export interface UploadedFile {
  fileId: string;
  name: string;
  size: number;
}

interface UploadedFileItemProps {
  file: UploadedFile;
  selectedFileId: string[];
  handleSelectFile: (fileId: string) => void;
}

const UploadedFileItem = ({
  file,
  selectedFileId,
  handleSelectFile,
}: UploadedFileItemProps) => {
  return (
    <li>
      <button
        type="button"
        onClick={() => handleSelectFile(file.fileId)}
        className={`flex w-full items-center cursor-pointer justify-between rounded-2xl border px-4 py-3 text-left text-sm transition ${
          selectedFileId.includes(file.fileId)
            ? "border-indigo-400 bg-indigo-50 text-indigo-700"
            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
        }`}
      >
        <span className="truncate">{file.name}</span>
        <span className="text-xs">{(file.size / 1024).toFixed(1)} KB</span>
      </button>
    </li>
  );
};

export default UploadedFileItem;
