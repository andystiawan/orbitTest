import { fireEvent, render, screen } from '@testing-library/react-native';

import { SortDevice, SortModem } from '../Sort';

describe('Sort Modem', () => {
    it('call function sort modem', () => {
        const props = {
            data: [{ name: '', label: 'Default' }],
            open: true,
            onClose: jest.fn(),
            onChangeSort: jest.fn(),
            selected: 'Default',
        };

        render(<SortModem {...props} />);
        fireEvent.press(screen.getByTestId('select-sort'));
        fireEvent.press(screen.getByTestId('close-sort'));
        fireEvent.press(screen.getByTestId('close-modal'));

        // Assert that the mock function has been called
        expect(props.onClose).toHaveBeenCalled();
        // Assert that the mock function has been called
        expect(props.onChangeSort).toHaveBeenCalled();
    })
});

describe('Sort Device', () => {
    it('call function sort device', () => {
        const props = {
            data: [{ name: '', label: 'Default' }],
            open: true,
            onClose: jest.fn(),
            onChangeSort: jest.fn(),
            sortSelect: 'Default',
        };

        render(<SortDevice {...props} />);
        fireEvent.press(screen.getByTestId('select-sort'));
        fireEvent.press(screen.getByTestId('close-sort'));


        // Assert that the mock function has been called
        expect(props.onClose).toHaveBeenCalled();
        // Assert that the mock function has been called
        expect(props.onChangeSort).toHaveBeenCalled();
    });
});