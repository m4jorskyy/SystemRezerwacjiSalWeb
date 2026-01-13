import { renderHook, act } from '@testing-library/react';
import useDebounce from '../useDebounce';

// Mówimy Jestowi, żeby przejął kontrolę nad czasem (timerami)
jest.useFakeTimers();

describe('useDebounce Hook', () => {
    it('should return initial value immediately', () => {
        // 1. Renderujemy hook z wartością "test" i opóźnieniem 500ms
        const { result } = renderHook(() => useDebounce('test', 500));

        // 2. Sprawdzamy czy od razu mamy dostępną wartość
        expect(result.current).toBe('test');
    });

    it('should update value after delay', () => {
        // 1. Renderujemy hook
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: 'initial', delay: 500 } }
        );

        // 2. Zmieniamy wartość wejściową na "updated" (symulacja pisania w inpucie)
        rerender({ value: 'updated', delay: 500 });

        // 3. Sprawdzamy - wartość hooka NIE powinna się jeszcze zmienić (bo minęło 0ms)
        expect(result.current).toBe('initial');

        // 4. Przesuwamy czas o 500ms do przodu
        act(() => {
            jest.advanceTimersByTime(500);
        });

        // 5. Teraz wartość powinna być zaktualizowana
        expect(result.current).toBe('updated');
    });
});