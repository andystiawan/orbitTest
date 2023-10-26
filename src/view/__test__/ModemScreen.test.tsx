import React from 'react';
import { render } from '@testing-library/react-native';
import { useIsFocused as mockUseIsFocused } from '@react-navigation/native';

import { getModemList } from '../../network/service/serviceModem';

import ModemScreen from '../ModemScreen';

jest.mock('../../network/service/serviceModem', () => ({
    getModemList: jest.fn()
}));

// Mock useIsFocused
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useIsFocused: jest.fn(),
}));

describe('ModemScreen', () => {
    beforeEach(() => {
        (mockUseIsFocused as jest.Mock).mockReturnValue(true);
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


});
