import { useState } from "react";

export const NumericEditCell = ({ params }: { params: any }) => {
    const [tempValue, setTempValue] = useState(params.value);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;

        // Update tempValue only if the input is a valid number
        if (/^\d*$/.test(value)) {
            setTempValue(value);
        }
    };

    const handleBlur = () => {
        if (tempValue.trim() === "") {
            params.api.setEditCellValue({
                id: params.id,
                field: params.field,
                value: params.value, // Revert to previous value
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

export const renderEditCell = (params: any) => {
    return <NumericEditCell params={params} />;
};
