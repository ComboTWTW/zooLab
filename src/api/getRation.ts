export const fetchRations = async (): Promise<rationsT> => {
    const response = await fetch("http://localhost:3308/api/rations");
    if (!response.ok) {
        throw new Error("Failed to fetch rations");
    }
    return response.json();
};

export type rationsT = {
    id: number;
    image: string;
    title: string;
    composition: string;
    description: string;
    weight: string;
    created_at: string;
}[];
