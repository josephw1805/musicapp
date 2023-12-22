import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

function Uploader() {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxSize: 10485760, // 10MB size
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
    },
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles[0]);
    },
  });

  return (
    <div className="w-full text-center">
      <div
        {...getRootProps()}
        className="px-6 py-8 border-2 border-border border-dashed bg-main rounded-md cursor-pointer"
      >
        <input {...getInputProps()} />
        <span className="mx-auto flex-colo text-subMain text-3xl">
          <FiUploadCloud />
        </span>
        <p className="text-sm mt-2">Drag your image here</p>
        <em className="text-xs text-border">
          (only .jpg and .png files will be accepted)
        </em>
      </div>
    </div>
  );
}

export default Uploader;
