import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { useIsFocused as mockUseIsFocused } from '@react-navigation/native';

import { getModemList } from '../../network/service/serviceModem';

import ModemScreen from '../ModemScreen';
import ListDevice from '../../component/ListDevice';

jest.mock('../../network/service/serviceModem', () => ({
    getModemList: jest.fn()
}));

// Mock useIsFocused
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useIsFocused: jest.fn(),
}));

describe('ModemScreen', () => {

    const data = [
        {
            id: 11,
            name: "Mel's Orbit",
            quota: {
                currentUsage: 30000,
                maxUsage: 80000,
                unit: "MB"
            },
            validity: {
                value: 30,
                unit: "Days"
            }
        },
        {
            id: 23,
            name: "Kitchen Modem",
            quota: {
                currentUsage: 55000,
                maxUsage: 60000,
                unit: "MB"
            },
            validity: {
                value: 7,
                unit: "Days"
            }
        },
        {
            id: 27,
            name: "Donski Pro",
            quota: {
                currentUsage: 25000,
                maxUsage: 45000,
                unit: "MB"
            },
            validity: {
                value: 30,
                unit: "Days"
            }
        },
    ]

    beforeEach(() => {
        (mockUseIsFocused as jest.Mock).mockReturnValue(true);
    });

    it('renders correctly', () => {
        const { toJSON } = render(<ModemScreen />);
        expect(toJSON()).toMatchSnapshot();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders ModemScreen correctly', async () => {
        (getModemList as jest.Mock).mockResolvedValueOnce(JSON.stringify({ data: [] }));

        render(<ModemScreen />);

        expect(getModemList).toHaveBeenCalledTimes(1);
        expect(mockUseIsFocused).toHaveBeenCalledTimes(2);
        expect(mockUseIsFocused).toHaveBeenCalledWith();
    });


    it('should render the ListDevice component with the provided data', () => {
        const onChangeSort = jest.fn()
        const reset = jest.fn()

        const { getByTestId } = render(<ListDevice data={data} onChangeSort={onChangeSort} reset={reset} />)

        const listDevice = getByTestId('list-device')

        expect(listDevice).toBeTruthy();
    });


});