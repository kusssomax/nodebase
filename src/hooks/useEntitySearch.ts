import { useState, useEffect } from "react";
import { PAGINATION } from "@/config/contants";

interface EntitySearchProps <T extends {search: string, page: number}>{

    params: T;
    setParams: (params: T) => void;
    deboundeMs?: number;
}

export function useEntitySearch<T extends {search: string, page: number}>({params, setParams, deboundeMs = 300}: EntitySearchProps<T>) {

    const [localSearch, setLocalSearch] = useState(params.search);

    useEffect(() => {

        if (localSearch === "" && params.search !== "") {
            setParams({...params, search: "", page: PAGINATION.DEFAULT_PAGE});
            return;
        };

        const timer = setTimeout(() => {
            if (localSearch !== params.search) {
                setParams({...params, search: localSearch, page: PAGINATION.DEFAULT_PAGE});
            }
        }, deboundeMs);

        return () => clearTimeout(timer);
    }, [localSearch, params.search, deboundeMs, setParams]);

    useEffect(() => {
        setLocalSearch(params.search);
    }, [params.search]);

    return {
        searchValue: localSearch,
        onSearchChange: setLocalSearch,
    };
}