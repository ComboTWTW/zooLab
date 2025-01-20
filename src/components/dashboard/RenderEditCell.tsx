import { useEffect, useState } from "react";
import { rationsT } from "../../api/getRation";
interface Props {
    params: any;
    typeOfField: "text" | "number";
    editedRows: any;
    setEditedRows: (editedRows: any) => void;
    rationsData: rationsT;
}

export const RenderEditCell = ({
    params,
    typeOfField,
    editedRows,
    setEditedRows,
    rationsData,
}: Props) => {
    const [tempValue, setTempValue] = useState(params.value);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;

        // Update tempValue only if the input is a valid number
        if (typeOfField === "number") {
            if (/^\d*$/.test(value)) {
                setTempValue(value);

                setEditedRows({
                    ...editedRows,
                    [params.colDef.field]: value,
                });
            }
        } else {
            setTempValue(value);

            setEditedRows({
                ...editedRows,
                [params.colDef.field]: value,
            });
        }
    };

    const handleBlur = () => {
        if (tempValue.trim() === "") {
            params.api.setEditCellValue({
                id: params.id,
                field: params.field,
                value: params.value, // Revert to previous value
            });

            setEditedRows({
                ...rationsData,
                [params.colDef.field]: params.value,
            });
        } else {
            params.api.setEditCellValue({
                id: params.id,
                field: params.field,
                value: tempValue, // Save new value
            });
        }
    };

    return (
        <textarea
            value={tempValue}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full max-h-full resize-none px-2"
        />
    );
};
