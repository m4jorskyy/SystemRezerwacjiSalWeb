import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmationCard from '../ConfirmationCard';

describe('ConfirmationCard Component', () => {
    // 1. GIVEN - Przygotowujemy atrapy funkcji (mocki)
    const mockYesAction = jest.fn();
    const mockNoAction = jest.fn();
    const testMessage = "Czy na pewno usunąć salę?";

    it('renders static title and provided message', () => {
        // 2. WHEN - Renderujemy komponent
        render(
            <ConfirmationCard
                message={testMessage}
                yesAction={mockYesAction}
                noAction={mockNoAction}
            />
        );

        // 3. THEN - Sprawdzamy czy widać teksty
        // Tytuł jest zahardkodowany w komponencie
        expect(screen.getByText("Confirm Action")).toBeInTheDocument();
        // Wiadomość przychodzi z propsa
        expect(screen.getByText(testMessage)).toBeInTheDocument();
    });

    it('calls noAction when "Cancel" button is clicked', () => {
        render(
            <ConfirmationCard
                message={testMessage}
                yesAction={mockYesAction}
                noAction={mockNoAction}
            />
        );

        // Szukamy przycisku po tekście "Cancel"
        const cancelButton = screen.getByRole('button', { name: /Cancel/i });
        fireEvent.click(cancelButton);

        // Sprawdzamy czy funkcja noAction została wywołana
        expect(mockNoAction).toHaveBeenCalledTimes(1);
        // Upewniamy się, że yesAction NIE zostało wywołane
        expect(mockYesAction).not.toHaveBeenCalled();
    });

    it('calls yesAction when "Yes, delete" button is clicked', () => {
        render(
            <ConfirmationCard
                message={testMessage}
                yesAction={mockYesAction}
                noAction={mockNoAction}
            />
        );

        // Szukamy przycisku po tekście "Yes, delete"
        const confirmButton = screen.getByRole('button', { name: /Yes, delete/i });
        fireEvent.click(confirmButton);

        // Sprawdzamy czy funkcja yesAction została wywołana
        expect(mockYesAction).toHaveBeenCalledTimes(1);
        expect(mockNoAction).not.toHaveBeenCalled();
    });
});