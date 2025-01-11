import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

const Auth = () => {
    const [credentials, setCred] = useState<{
        username: string;
        password: string;
    }>({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");

    const mutation = useMutation({
        mutationFn: async (credentials: {
            username: string;
            password: string;
        }) => {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error("failed to add post");
            }

            return response.json();
        },
        onSuccess: (data) => {
            alert("logged in");
            if (data.token) {
                // Save token to localStorage
                localStorage.setItem("authToken", data.token);
            }
        },
        onError: (error: any) => {
            alert(error.message);
        },
    });

    return (
        <div className="w-full overflow-hidden flex justify-center">
            <div className="max-w-[1200px] w-full flex flex-col items-center">
                <div className="flex mt-[150px] flex-col">
                    <h1 className="montserrat text-4xl font-bold">
                        Welcome, please sign-in:
                    </h1>

                    <form action="" className="mt-8 flex flex-col max-w-[70%]">
                        <label
                            htmlFor="username"
                            className="montserrat text-xl font-semibold"
                        >
                            Username
                        </label>

                        <input
                            type="text"
                            id="username"
                            className="px-4 py-2 border-[1px] rounded-[5px] border-solid border-black mt-2 "
                            onChange={(e) =>
                                setCred({
                                    ...credentials,
                                    username: e.target.value,
                                })
                            }
                        />

                        <label
                            htmlFor="password"
                            className="montserrat text-xl font-semibold mt-4"
                        >
                            Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            className="px-4 py-2 border-[1px] rounded-[5px] border-solid border-black mt-2 "
                            onChange={(e) =>
                                setCred({
                                    ...credentials,
                                    password: e.target.value,
                                })
                            }
                        />

                        <button
                            type="button"
                            onClick={(e) => mutation.mutate(credentials)}
                            className="px-4 py-2  border-[1px] rounded-[5px] border-solid border-black mt-6 bg-mainRed text-white montserrat text-xl font-semibold"
                        >
                            Log-in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Auth;
