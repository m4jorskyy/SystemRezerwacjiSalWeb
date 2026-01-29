import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmationCard from '../ConfirmationCard';

describe('ConfirmationCard Component', () => {
    const mockYesAction = jest.fn();
    const mockNoAction = jest.fn();
    const testMessage = "Czy na pewno usunąć salę?";

    it('renders static title and provided message', () => {
        render(
            <ConfirmationCard
                message={testMessage}
                yesAction={mockYesAction}
                noAction={mockNoAction}
            />
        );

        expect(screen.getByText("Confirm Action")).toBeInTheDocument();
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

        const cancelButton = screen.getByRole('button', { name: /Cancel/i });
        fireEvent.click(cancelButton);

        expect(mockNoAction).toHaveBeenCalledTimes(1);
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

        const confirmButton = screen.getByRole('button', { name: /Yes, delete/i });
        fireEvent.click(confirmButton);

        expect(mockYesAction).toHaveBeenCalledTimes(1);
        expect(mockNoAction).not.toHaveBeenCalled();
    });
});