export const fetchRations = async (): Promise<rationsT> => {
    const response = await fetch("/api/rations");
    if (!response.ok) {
        throw new Error("Failed to fetch rations");
    }
    return response.json();
};

export type rationsT = {
    id: number;
    image: string;
    image_big: string;
    title: string;
    composition: string;
    description: string;
    weight: string;
    composition_full: string;
    nutrition_value: string;
    price: number;
    created_at: string;
}[];
