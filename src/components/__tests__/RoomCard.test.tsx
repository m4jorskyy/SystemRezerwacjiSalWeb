import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RoomCard from '../RoomCard';
import Room from '../../types/Room';

// Przykładowe dane do testu
const mockRoom: Room = {
    id: 1,
    name: 'Sala Konferencyjna',
    building: 'Budynek A',
    capacity: 20,
    floor: 2,
    whiteboard: true,
    projector: true, // Projektor jest
    desks: false     // Biurek brak
};

describe('RoomCard Component', () => {
    it('renders room details correctly', () => {
        render(<RoomCard {...mockRoom} />);

        // Sprawdzamy czy wyświetla się nazwa i budynek
        expect(screen.getByText('Sala Konferencyjna')).toBeInTheDocument();
        expect(screen.getByText('Budynek A')).toBeInTheDocument();

        // Sprawdzamy czy widać etykiety wyposażenia
        expect(screen.getByText('Projector')).toBeInTheDocument();
        expect(screen.getByText('Whiteboard')).toBeInTheDocument();

        // Sprawdzamy czy NIE ma etykiety "Desks" (bo desks: false)
        expect(screen.queryByText('Desks')).toBeNull();
    });

    it('opens menu and calls onDelete when delete button is clicked', () => {
        // Mockujemy funkcję usuwania (szpieg)
        const handleDelete = jest.fn();

        render(
            <RoomCard
                {...mockRoom}
                onDelete={handleDelete}
                onEdit={() => {}} // Musimy podać onEdit, żeby menu się pokazało
            />
        );

        // 1. Menu trzykropka jest na początku ukryte, klikamy w przycisk otwierający
        // Szukamy przycisku - w Twoim kodzie jest to button z ikoną MoreVertical.
        // Najłatwiej znaleźć go po roli "button" lub dodać aria-label w kodzie.
        // Tutaj założymy, że to pierwszy przycisk w kontenerze menu.
        // Dla ułatwienia testów warto dodać aria-label="options menu" w RoomCard.tsx
        // Ale tutaj użyjemy prostego selektora po klasie lub strukturze,
        // lub po prostu założymy, że testujemy "kliknięcie w trzykropek".

        // Alternatywa: pobranie wszystkich przycisków i kliknięcie pierwszego (ikona menu)
        const buttons = screen.getAllByRole('button');
        const menuButton = buttons[0];

        fireEvent.click(menuButton);

        // 2. Po kliknięciu powinno pojawić się menu z opcją "Delete"
        const deleteOption = screen.getByText(/Delete/i);
        expect(deleteOption).toBeInTheDocument();

        // 3. Klikamy "Delete"
        fireEvent.click(deleteOption);

        // 4. Sprawdzamy czy funkcja została wywołana
        expect(handleDelete).toHaveBeenCalledTimes(1);
    });
});