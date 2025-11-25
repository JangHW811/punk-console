import { useMutation } from "@tanstack/react-query";
import { http } from "./common";

interface FileUploadResponse {
  file_id: string;
  filename: string;
  size: number;
}
const useFileUpload = () => {
  return useMutation<FileUploadResponse, Error, File>({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return await http.multipart("/api/files", formData);
    },
  });
};

export default useFileUpload;
