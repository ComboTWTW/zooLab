export const fetchFAQ = async (): Promise<faqT> => {
    const response = await fetch("/api/faq");
    if (!response.ok) {
        throw new Error("Failed to fetch faq");
    }
    return response.json();
};

export type faqT = {
    id: number;
    title: string;
    text: string;
    created_at: string;
}[];
