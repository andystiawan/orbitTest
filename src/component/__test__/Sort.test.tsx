import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { SortDevice, SortModem } from '../Sort';


const onCloseMock = jest.fn();
const onChangeSortMock = jest.fn();


describe('Sort Modem', () => {
    it('call function sort modem', () => {
        const props = {
            data: [{ value: '', label: 'Default' }],
            open: true,
            onClose: onCloseMock,
            onChangeSort: onChangeSortMock,
            selected: 'Default',
        };

        const { getByTestId } = render(<SortModem {...props} />);
        const selectSortModem = getByTestId('select-sort-modem')

        act(() => {
            fireEvent(selectSortModem, 'onPress', props.selected)
        })

        // Assert that the mock function has been called
        expect(onChangeSortMock).toHaveBeenCalled()
    })
});

describe('Sort Device', () => {
    it('call function sort device', () => {
        const props = {
            data: [{ value: '', label: 'Default' }],
            open: true,
            onClose: onCloseMock,
            onChangeSort: onChangeSortMock,
            sortSelect: 'Default',
        };

        const { getByTestId } = render(<SortDevice {...props} />);
        const selectSortModem = getByTestId('select-sort-device')

        act(() => {
            fireEvent(selectSortModem, 'onPress', props.sortSelect)
        })

        // Assert that the mock function has been called
        expect(onChangeSortMock).toHaveBeenCalled()
    });
});