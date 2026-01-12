import { useState, useEffect } from 'react';

export function usePageContent(pageName: string) {
    const [content, setContent] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/pages/${pageName}`);
                if (response.ok) {
                    const data = await response.json();
                    setContent(data || {});
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
