import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { rationsT } from "../../../api/getRation";

interface Props {
    params: any;
    editedRows: any;
    setEditedRows: (editedRows: any) => void;
    rationsData: rationsT;
    handleImageChange: (file: File) => void;
}

const DragAndDropImage = ({
    params,
    editedRows,
    setEditedRows,
    rationsData,
    handleImageChange,
}: Props) => {
    const [preview, setPreview] = useState<string | null>(params.value);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/jpeg": [],
            "image/jpg": [],
            "image/png": [],
        },
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                const folder = params.formattedValue.split("/")[2];
                const originalImagePath = params.formattedValue;

                setPreview(URL.createObjectURL(file)); // Show the preview of the uploaded image
                handleImageChange(file);
                console.log(params);
                setEditedRows({
                    ...editedRows,
                    [params.colDef.field]: {
                        file: file,
                        folder: folder,
                        originalImagePath: originalImagePath,
                    },
                    newImages: editedRows?.hasOwnProperty("newImages")
                        ? [...editedRows?.newImages, params.colDef.field]
                        : [params.colDef.field],
                });
            }
        },
    });

    return (
        <div
            {...getRootProps()}
            style={{
                border: "2px dashed #ccc",
                borderRadius: "6px",
                backgroundColor: "#f9f9f9",
            }}
            className="p-2 text-center min-h-[120px] flex flex-col justify-center items-center cursor-pointer"
        >
            <input {...getInputProps()} />
            {preview ? (
                <div className="flex flex-col items-center">
                    <img
                        src={preview}
                        alt="Preview"
                        className="max-w-full max-h-[120px] object-contain mb-2"
                    />
                    <p className="montserrat text-xs text-gray-600">
                        Click Here or Drag & Drop Image
                    </p>
                    <p className="montserrat text-[10px] text-gray-600">
                        .png and .jpg only
                    </p>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <p className="montserrat text-sm">
                        Drag & Drop Image or Click Here
                    </p>
                    <p className="montserrat text-xs text-gray-600">
                        .png and .jpg only
                    </p>
                </div>
            )}
        </div>
    );
};

export default DragAndDropImage;
