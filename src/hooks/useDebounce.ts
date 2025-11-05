import {useEffect, useState} from "react";

export default function useDebounce<T>(value: T, delay: number) {
    const [delayedValue, setDelayedValue] = useState<T>(value)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDelayedValue(value)
        }, delay)

        return () => clearTimeout(timeout)
    }, [delay, value]);

    return delayedValue
}