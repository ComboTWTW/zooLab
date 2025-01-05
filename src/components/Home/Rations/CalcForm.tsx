import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

type PostData = {
    size: "Взрослая собака" | "Щенок";
    weight: string;
    age: string;
    name: string;
    tel_number: string;
    question: string;
};

interface Props {
    setSuccessSend: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalcForm = ({ setSuccessSend }: Props) => {
    const [formData, setFormData] = useState<PostData>({
        size: "Взрослая собака",
        weight: "",
        age: "",
        name: "",
        tel_number: "+7",
        question: "",
    });

    const [errorState, setErrorState] = useState<{
        weight: boolean | null;
        age: boolean | null;
        name: boolean | null;
        tel_number: boolean | null;
    }>({
        weight: null,
        age: null,
        name: null,
        tel_number: null,
    });

    const mutation = useMutation({
        mutationFn: async (formData: PostData) => {
            const response = await fetch("/api/calc_ration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("failed to add post");
            }

            return response.json();
        },
        onSuccess: (data) => {
            setFormData({
                size: "Взрослая собака",
                weight: "",
                age: "",
                name: "",
                tel_number: "",
                question: "",
            });
            setSuccessSend(true);
        },
        onError: (error: any) => {
            alert(error.message);
        },
    });

    useEffect(() => {
        errorState.tel_number &&
            formData.tel_number.length === 15 &&
            setErrorState({ ...errorState, tel_number: false });
    }, [formData.tel_number]);

    useEffect(() => {
        console.log(errorState);
    }, [errorState]);

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
                label={!errorState.weight ? "Вес (кг)" : "Вес (кг)*"}
                variant="filled"
                fullWidth
                value={formData.weight}
                onBlur={() => {
                    if (formData.weight.length === 0) {
                        setErrorState({ ...errorState, weight: true });
                    } else {
                        setErrorState({ ...errorState, weight: false });
                    }
                }}
                sx={{
                    background: "#F4F5F5",
                    border: `${
                        !errorState.weight
                            ? "solid #F4F5F5 1px"
                            : "solid red 1px"
                    } `,
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
                    errorState.weight &&
                        value.length >= 1 &&
                        setErrorState({ ...errorState, weight: false });
                }}
                InputLabelProps={{
                    style: {
                        color: `${!errorState.weight ? "#626262" : "red"}`,
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
                error
                id="standard-basic"
                label={!errorState.age ? "Возраст" : "Возраст*"}
                variant="filled"
                fullWidth
                value={formData.age}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    let value = e.target.value.replace(/\D/g, "");
                    value = value.substring(0, 2);
                    setFormData({ ...formData, age: value });
                    errorState.age &&
                        value.length >= 1 &&
                        setErrorState({ ...errorState, age: false });
                }}
                onBlur={() => {
                    if (formData.age.length === 0) {
                        setErrorState({ ...errorState, age: true });
                    } else {
                        setErrorState({ ...errorState, age: false });
                    }
                }}
                sx={{
                    background: "#F4F5F5",
                    border: `${
                        !errorState.age ? "solid #F4F5F5 1px" : "solid red 1px"
                    } `,
                    borderRadius: "8px",
                    fontFamily: "Montserrat, sans-serif",
                    input: { color: "black" },
                    marginTop: "15px",
                }}
                InputLabelProps={{
                    style: {
                        color: `${!errorState.age ? "#626262" : "red"}`,
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
                label={!errorState.name ? "Имя" : "Имя*"}
                variant="filled"
                fullWidth
                value={formData.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    let value = e.target.value.replace(/\d/g, "");
                    value = value.substring(0, 50);
                    setFormData({ ...formData, name: value });
                    errorState.name &&
                        value.length >= 1 &&
                        setErrorState({ ...errorState, name: false });
                }}
                onBlur={() => {
                    if (formData.name.length === 0) {
                        setErrorState({ ...errorState, name: true });
                    } else {
                        setErrorState({ ...errorState, name: false });
                    }
                }}
                sx={{
                    background: "#F4F5F5",
                    border: `${
                        !errorState.name ? "solid #F4F5F5 1px" : "solid red 1px"
                    } `,
                    borderRadius: "8px",
                    fontFamily: "Montserrat, sans-serif",
                    input: { color: "black" },
                    marginTop: "15px",
                }}
                InputLabelProps={{
                    style: {
                        color: `${!errorState.name ? "#626262" : "red"}`,
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
                label={!errorState.tel_number ? "Телефон" : "Телефон*"}
                variant="filled"
                value={formData.tel_number}
                fullWidth
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(e)
                }
                onBlur={() => {
                    if (formData.tel_number.length < 15) {
                        setErrorState({ ...errorState, tel_number: true });
                    } else {
                        setErrorState({ ...errorState, tel_number: false });
                    }
                }}
                sx={{
                    background: "#F4F5F5",
                    border: `${
                        !errorState.tel_number
                            ? "solid #F4F5F5 1px"
                            : "solid red 1px"
                    } `,
                    borderRadius: "8px",
                    fontFamily: "Montserrat, sans-serif",
                    input: { color: "black" },
                    marginTop: "15px",
                }}
                InputLabelProps={{
                    style: {
                        color: `${!errorState.tel_number ? "#626262" : "red"}`,
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
                disabled={
                    !Object.values(errorState).every((item) => item === false)
                }
                onClick={() => {
                    mutation.mutate(formData);
                    setErrorState({
                        weight: null,
                        age: null,
                        name: null,
                        tel_number: null,
                    });
                }}
                className="montserrat font-semibold z-[2] text-white leading-[140%] mt-[45px] rounded-[8px] bg-mainRed px-11 py-4 md:hover:bg-mainRedHove md:duration-200"
            >
                Рассчитать
            </button>
        </FormControl>
    );
};

export default CalcForm;
