import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

type PostData = {
    size: "Взрослая собака" | "Щенок";
    weight: string;
    age: string;
    name: string;
    tel_number: string;
    question: string;
};

const CalcForm = () => {
    const [formData, setFormData] = useState<PostData>({
        size: "Взрослая собака",
        weight: "",
        age: "",
        name: "",
        tel_number: "+7",
        question: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        value = value.replace(/^7/, "");
        value = value.substring(0, 10);

        // format *** *** ****
        const formattedValue = value.replace(
            /(\d{0,3})(\d{0,3})(\d{0,4})/,
            (match, p1, p2, p3) => {
                if (p3) return `+7 ${p1} ${p2} ${p3}`;
                if (p2) return `+7 ${p1} ${p2}`;
                if (p1) return `+7 ${p1}`;
                return "+7";
            }
        );

        setFormData({ ...formData, tel_number: formattedValue });
    };
    return (
        <FormControl component="form">
            {/* RadioButtons */}
            <RadioGroup>
                <FormControlLabel
                    value="Взрослая собака"
                    defaultChecked={true}
                    checked={formData.size === "Взрослая собака"}
                    control={
                        <Radio
                            sx={{
                                color: "#434242",
                                "&.Mui-checked": {
                                    color: "#961914",
                                },
                            }}
                        />
                    }
                    label="Взрослая собака"
                    color="#961914"
                    onChange={() => {
                        setFormData({ ...formData, size: "Взрослая собака" });
                    }}
                />
                <FormControlLabel
                    onChange={() => {
                        setFormData({ ...formData, size: "Щенок" });
                    }}
                    value="Щенок"
                    control={
                        <Radio
                            sx={{
                                color: "#434242",
                                "&.Mui-checked": {
                                    color: "#961914",
                                },
                            }}
                        />
                    }
                    label="Щенок"
                    color="#961914"
                />
            </RadioGroup>
            {/* Weight */}
            <TextField
                id="standard-basic"
                label="Вес (кг)"
                variant="filled"
                fullWidth
                value={formData.weight}
                sx={{
                    background: "#F4F5F5",
                    border: "solid #F4F5F5 1px",
                    borderRadius: "8px",
                    fontFamily: "Montserrat, sans-serif",
                    input: { color: "black" },
                    marginTop: "25px",
                    textWrap: "wrap",
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    let value = e.target.value.replace(/\D/g, "");
                    value = value.substring(0, 2);
                    setFormData({ ...formData, weight: value });
                }}
                InputLabelProps={{
                    style: {
                        color: "#626262",
                        borderRadius: "8px",
                        textWrap: "wrap",
                    },
                }}
                InputProps={{
                    disableUnderline: true,
                    style: {
                        color: "black",
                        background: "#F4F5F5",
                        borderRadius: "8px",
                        textWrap: "wrap",
                    },
                    inputMode: "numeric",
                }}
            />
            {/* Age */}
            <TextField
                id="standard-basic"
                label="Возраст"
                variant="filled"
                fullWidth
                value={formData.age}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    let value = e.target.value.replace(/\D/g, "");
                    value = value.substring(0, 2);
                    setFormData({ ...formData, age: value });
                }}
                sx={{
                    background: "#F4F5F5",
                    border: "solid #F4F5F5 1px",
                    borderRadius: "8px",
                    fontFamily: "Montserrat, sans-serif",
                    input: { color: "black" },
                    marginTop: "15px",
                }}
                InputLabelProps={{
                    style: {
                        color: "#626262",
                        borderRadius: "8px",
                    },
                }}
                InputProps={{
                    disableUnderline: true,
                    style: {
                        color: "black",
                        background: "#F4F5F5",
                        borderRadius: "8px",
                    },
                }}
                type="tel"
            />
            {/* Name */}
            <TextField
                id="standard-basic"
                label="Имя"
                variant="filled"
                fullWidth
                value={formData.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    let value = e.target.value.replace(/\d/g, "");
                    value = value.substring(0, 50);
                    setFormData({ ...formData, name: value });
                }}
                sx={{
                    background: "#F4F5F5",
                    border: "solid #F4F5F5 1px",
                    borderRadius: "8px",
                    fontFamily: "Montserrat, sans-serif",
                    input: { color: "black" },
                    marginTop: "15px",
                }}
                InputLabelProps={{
                    style: {
                        color: "#626262",
                        borderRadius: "8px",
                    },
                }}
                InputProps={{
                    disableUnderline: true,
                    style: {
                        color: "black",
                        background: "#F4F5F5",
                        borderRadius: "8px",
                    },
                }}
                type="text"
            />
            {/* Tel number */}
            <TextField
                id="standard-basic"
                label="Телефон"
                variant="filled"
                value={formData.tel_number}
                fullWidth
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(e)
                }
                sx={{
                    background: "#F4F5F5",
                    border: "solid #F4F5F5 1px",
                    borderRadius: "8px",
                    fontFamily: "Montserrat, sans-serif",
                    input: { color: "black" },
                    marginTop: "15px",
                }}
                InputLabelProps={{
                    style: {
                        color: "#626262",
                        borderRadius: "8px",
                    },
                }}
                InputProps={{
                    disableUnderline: true,
                    style: {
                        color: "black",
                        background: "#F4F5F5",
                        borderRadius: "8px",
                    },
                    inputMode: "tel",
                }}
                type="tel"
            />
            {/* Question */}
            <TextField
                id="standard-basic"
                hiddenLabel={true}
                placeholder="Если у вашего хвостика есть особенности здоровья – напишите об этом..."
                variant="filled"
                fullWidth
                value={formData.question}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    let value = e.target.value;
                    value = value.substring(0, 500);
                    setFormData({ ...formData, question: value });
                }}
                sx={{
                    background: "#F4F5F5",
                    border: "solid #F4F5F5 1px",
                    borderRadius: "8px",
                    fontFamily: "Montserrat, sans-serif",
                    marginTop: "15px",
                    textWrap: "wrap",
                    minHeight: 100,
                }}
                InputProps={{
                    disableUnderline: true,
                    style: {
                        color: "black",
                        background: "#F4F5F5",
                        borderRadius: "8px",
                        textWrap: "wrap",
                    },
                }}
                type="text"
                multiline
            />

            <button
                type="button"
                className="montserrat font-semibold z-[2] text-white leading-[140%] mt-[45px] rounded-[8px] bg-mainRed px-11 py-4 md:hover:bg-mainRedHove md:duration-200"
            >
                Рассчитать
            </button>
        </FormControl>
    );
};

export default CalcForm;
