'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLoader } from '../lib/LoaderContext';

export default function PageLoader({ children }) {
    const pathname = usePathname();
    const { setLoading } = useLoader();

    useEffect(() => {
        // || pathname === '/blog'
        if (pathname === '/') {
            setLoading(true);
        }
        const timeout = setTimeout(() => setLoading(false), 500); // 500ms for smooth UX
        return () => clearTimeout(timeout);
    }, [pathname, setLoading]);

    return <>{children}</>;
}
