import { useEffect, useState } from "react";
import axios from "axios";

export const API_URI = process.env.NEXT_PUBLIC_API_URI;

// `initialData` is content a server component already fetched: it is rendered immediately
// (so it is in the initial HTML) and the browser does not fetch it again.
export function useGetService(endpoint, initialData) {
    const [data, setData] = useState(initialData ?? null);
    const [loading, setLoading] = useState(!initialData);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!endpoint || !API_URI || initialData) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`${API_URI}${endpoint.replace('/api', '')}`);
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint, initialData]);

    return { data, loading, error };
}
