import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RoomCard from '../RoomCard';
import Room from '../../types/Room';

const mockRoom: Room = {
    id: 1,
    name: 'Sala Konferencyjna',
    building: 'Budynek A',
    capacity: 20,
    floor: 2,
    whiteboard: true,
    projector: true,
    desks: false
};

describe('RoomCard Component', () => {
    it('renders room details correctly', () => {
        render(<RoomCard {...mockRoom} />);

        expect(screen.getByText('Sala Konferencyjna')).toBeInTheDocument();
        expect(screen.getByText('Budynek A')).toBeInTheDocument();

        expect(screen.getByText('Projector')).toBeInTheDocument();
        expect(screen.getByText('Whiteboard')).toBeInTheDocument();

        expect(screen.queryByText('Desks')).toBeNull();
    });

    it('opens menu and calls onDelete when delete button is clicked', () => {
        const handleDelete = jest.fn();

        render(
            <RoomCard
                {...mockRoom}
                onDelete={handleDelete}
                onEdit={() => {}}
            />
        );

        const buttons = screen.getAllByRole('button');
        const menuButton = buttons[0];

        fireEvent.click(menuButton);

        const deleteOption = screen.getByText(/Delete/i);
        expect(deleteOption).toBeInTheDocument();

        fireEvent.click(deleteOption);

        expect(handleDelete).toHaveBeenCalledTimes(1);
    });
});