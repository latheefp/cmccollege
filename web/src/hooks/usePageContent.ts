import { useState, useEffect } from 'react';

export function usePageContent(pageName: string) {
    const [content, setContent] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const baseUrl = '/api';
                const url = `${baseUrl}/pages/${pageName}`;
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    setContent(data.success ? data.data : {});
                } else if (response.status === 404) {
                    console.warn(`Page content for "${pageName}" not found. Using defaults.`);
                    setContent({});
                } else {
                    console.error("Fetch failed:", response.status);
                    setContent({});
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
