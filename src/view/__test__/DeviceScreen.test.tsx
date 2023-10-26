import { render } from '@testing-library/react-native';
import DeviceScreen from '../DeviceScreen';
import { deviceList } from '../../network/service/serviceDevice';

jest.mock('../../network/service/serviceDevice', () => ({
    deviceList: jest.fn(),
}));

// Mock useIsFocused
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useIsFocused: jest.fn(),
}));

describe('DeviceScreen', () => {
    beforeEach(() => {
        (deviceList as jest.Mock).mockClear();
    });

    it('should fetch data on component mount if it is focused', async () => {
        (deviceList as jest.Mock).mockResolvedValueOnce({ data: [] });

        const { rerender } = render(<DeviceScreen route={{}} navigation={{}} />);

        rerender(<DeviceScreen route={{}} navigation={{}} />);

        expect(deviceList).toHaveBeenCalledTimes(0);
    });

    it('should not fetch data on component mount if it is not focused', async () => {
        (deviceList as jest.Mock).mockResolvedValueOnce({ data: [] });

        render(<DeviceScreen route={{}} navigation={{}} />);

        expect(deviceList).not.toHaveBeenCalled();
    });

    // Add more test cases as needed...
});
