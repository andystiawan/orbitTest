import { act, cleanup, fireEvent, render } from '@testing-library/react-native';
import ListDevice from '../ListDevice';

jest.useFakeTimers();

describe("List Modem", () => {
    afterEach(cleanup);

    const props = {
        data: [
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
        ],
        onChangeSort: jest.fn(),
        reset: jest.fn()
    };


    it('function refresh device', () => {
        const { getByTestId } = render(<ListDevice {...props} />);

        const listDevice = getByTestId('list-device');

        act(() => {
            fireEvent(listDevice, 'onRefresh');
        });


        act(() => {
            jest.runAllTimers();
        });

        expect(listDevice.props.refreshing).toBe(false);
    });

});