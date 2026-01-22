import { useState, useEffect } from 'react';

export function usePageContent(pageName: string) {
    const [content, setContent] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const baseUrl = '/api';
                const url = `${baseUrl}/pages/${pageName}`;
                console.log("Fetching content from:", url);
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    console.log("Fetched content:", data);
                    setContent(data || {});
                } else {
                    console.error("Fetch failed:", response.status);
                }
            } catch (error) {
                console.error(`Error fetching content for ${pageName}:`, error);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, [pageName]);

    const getText = (key: string, fallback: string) => {
        return content[key] || fallback;
    };

    const getImage = (key: string, fallback: string) => {
        return content[key] || fallback;
    };

    return { content, loading, getText, getImage };
}
