import { Fragment, useState } from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { rationsT } from "../../../../api/getRation";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useMutation } from "@tanstack/react-query";
import { error } from "console";

type PostData = {
    ration_id: number;
    name: string;
    phone_number: string;
    address: string;
    ration_size: string;
    quantity: number;
    price: number;
};

interface Props {
    rationsData: rationsT[number];
    setSelectFpcus: (selectFpcus: boolean) => void;
}
const OrderForm = ({ rationsData, setSelectFpcus }: Props) => {
    /* Array with weight data */
    const sortedWeight: string[] = rationsData.weight
        .split(" / ")
        .map((item) => item.trim());
    /* Post Data State */
    const [formData, setFormData] = useState<PostData>({
        ration_id: rationsData.id,
        name: "",
        phone_number: "",
        address: "",
        ration_size: sortedWeight[0],
        quantity: 1,
        price: rationsData.price,
    });
    /* Preventing leaving inputs empty */
    const [errorState, setErrorState] = useState<{
        name: boolean | null;
        phone_number: boolean | null;
        address: boolean | null;
        consent: boolean | null;
    }>({
        name: null,
        phone_number: null,
        address: null,
        consent: null,
    });
    /* Phone Input Handeling */
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

        setFormData({ ...formData, phone_number: formattedValue });
    };
    /* React-query Post */
    const mutation = useMutation({
        mutationFn: async (formData: PostData) => {
            const response = await fetch("/api/orders", {
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
                name: "",
                phone_number: "",
                address: "",
                ration_id: rationsData.id,
                ration_size: sortedWeight[0],
                quantity: 1,
                price: rationsData.price,
            });
        },
        onError: (error: any) => {
            alert(error.message);
        },
    });

    return (
        <Fragment>
            <FormControl component="form" className="w-full max-w-[290px]">
                {/* Name */}
                <TextField
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
                            !errorState.name
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
                {/* Tel Number */}
                <TextField
                    id="standard-basic"
                    label={!errorState.phone_number ? "Телефон" : "Телефон*"}
                    variant="filled"
                    value={formData.phone_number}
                    fullWidth
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleInputChange(e);
                        if (errorState.phone_number) {
                            if (formData.phone_number.length < 14) {
                                setErrorState({
                                    ...errorState,
                                    phone_number: true,
                                });
                            } else {
                                setErrorState({
                                    ...errorState,
                                    phone_number: false,
                                });
                            }
                        }
                    }}
                    onBlur={() => {
                        if (formData.phone_number.length < 15) {
                            setErrorState({
                                ...errorState,
                                phone_number: true,
                            });
                        } else {
                            setErrorState({
                                ...errorState,
                                phone_number: false,
                            });
                        }
                    }}
                    sx={{
                        background: "#F4F5F5",
                        border: `${
                            !errorState.phone_number
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
                            color: `${
                                !errorState.phone_number ? "#626262" : "red"
                            }`,
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
                {/* address */}
                <TextField
                    label={!errorState.address ? "Адрес" : "Адрес*"}
                    variant="filled"
                    fullWidth
                    value={formData.address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        let value = e.target.value;
                        value = value.substring(0, 100);
                        setFormData({ ...formData, address: value });
                        errorState.address &&
                            value.length >= 1 &&
                            setErrorState({ ...errorState, address: false });
                    }}
                    onBlur={() => {
                        if (formData.address.length === 0) {
                            setErrorState({ ...errorState, address: true });
                        } else {
                            setErrorState({ ...errorState, address: false });
                        }
                    }}
                    sx={{
                        background: "#F4F5F5",
                        border: `${
                            !errorState.address
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
                            color: `${!errorState.address ? "#626262" : "red"}`,
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
                {/* Dropdown Selecy ration_size */}
                <Select
                    value={formData.ration_size}
                    sx={{
                        background: "#F4F5F5",
                        border: "none",
                        ":hover": {
                            border: "none",
                        },
                        borderRadius: "8px",
                        fontFamily: "Montserrat, sans-serif",
                        input: { color: "black" },
                        marginTop: "15px",
                        zIndex: 90,
                        boxShadow: "none",
                        ".MuiOutlinedInput-notchedOutline": { border: 0 },
                    }}
                    onFocus={() => {
                        setSelectFpcus(true);
                    }}
                    onBlur={() => {
                        setSelectFpcus(false);
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        let value = e.target.value;

                        setFormData({ ...formData, ration_size: value });
                    }}
                    InputLabelProps={{
                        style: {
                            ":hover": {
                                border: "none",
                            },
                        },
                    }}
                    InputProps={{
                        style: {
                            ":hover": {
                                border: "none",
                            },
                        },
                    }}
                >
                    {sortedWeight.map((weight) => {
                        return (
                            <MenuItem
                                sx={{
                                    zIndex: 90,
                                }}
                                value={weight}
                            >
                                {weight}
                            </MenuItem>
                        );
                    })}
                </Select>
                {/* Quantity chose */}
                <div className="flex  mt-5 w-full justify-between items-center ">
                    <p className="montserrat leading-[140%]">Количество:</p>
                    <div className="bg-[#F4F5F5] rounded-[8px] montserrat text-lg flex items-center ">
                        <button
                            onClick={() => {
                                let quantity = formData.quantity - 1;
                                formData.quantity !== 1 &&
                                    setFormData({
                                        ...formData,
                                        quantity: formData.quantity - 1,
                                        price: quantity * rationsData.price,
                                    });
                            }}
                            type="button"
                            className="text-[#c4c4c4] min-h-full min-w-[10px]  px-4 py-3 text-2xl"
                        >
                            -
                        </button>
                        <span className="px-10 w-[30px]">
                            {formData.quantity}
                        </span>
                        <button
                            onClick={() => {
                                let quantity = formData.quantity + 1;
                                setFormData({
                                    ...formData,
                                    quantity: formData.quantity + 1,
                                    price: quantity * rationsData.price,
                                });
                            }}
                            type="button"
                            className="text-[#c4c4c4] px-4 py-3 text-2xl"
                        >
                            +
                        </button>
                    </div>
                </div>
                {/* Consent */}
                <div className="flex items-center gap-2 mt-5">
                    <Checkbox
                        id="check"
                        style={{
                            padding: 0,
                        }}
                        sx={{
                            color: "#961914",
                            "&.Mui-checked": {
                                color: "#961914",
                            },
                        }}
                        onChange={(e) => {
                            setErrorState({
                                ...errorState,
                                consent: !e.target.checked,
                            });
                        }}
                    />

                    <label
                        htmlFor="check"
                        className="montserrat   text-[12px] text-addGray"
                    >
                        Даю согласие на обработку персональных данных
                    </label>
                </div>
                {/* Price and placed order button */}
                <div className="mt-5 flex justify-between items-center w-full max-w-[352px] ">
                    <p className="roboto text-[20px] font-semibold tracking-[2%] leading-[140%] text-nowrap">
                        {formData.price * formData.quantity} ₽
                    </p>

                    <button
                        onClick={() => {
                            console.log(formData);
                            mutation.mutate(formData);
                            setErrorState({
                                name: null,
                                phone_number: null,
                                address: null,
                                consent: null,
                            });
                        }}
                        disabled={
                            !Object.values(errorState).every(
                                (item) => item === false
                            )
                        }
                        type="button"
                        className={`text-nowrap rounded-[8px] px-9  py-3 border-solid border-mainRed border-[1px] montserrat font-semibold text-mainRed leading-[140%]   md:hover:bg-pinkHover md:hover:border-pinkHover md:duration-200 ${
                            !Object.values(errorState).every(
                                (item) => item === false
                            ) && "opacity-65"
                        } `}
                    >
                        Оформить заказ
                    </button>
                </div>
            </FormControl>
        </Fragment>
    );
};

export default OrderForm;
