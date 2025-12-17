import { useEffect, useState } from "react";
import axios from "axios";

const API_URI = process.env.NEXT_PUBLIC_API_URI;

export function useGetService(endpoint) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!endpoint || !API_URI) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`${API_URI}${endpoint}`);
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);

    return { data, loading, error };
}
