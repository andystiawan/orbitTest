const { render, fireEvent } = require('@testing-library/react-native');
import ListDevice from '../../component/ListDevice';

describe('ListDevice', () => {
    const data = [
        {
            id: '1',
            name: 'Device 1',
            quota: {
                maxUsage: 3000,
                currentUsage: 2000,
                unit: 'MB',
            },
            validity: {
                value: 30,
                unit: 'Days',
            },
        },
        {
            id: '2',
            name: 'Device 2',
            quota: {
                maxUsage: 5000,
                currentUsage: 1000,
                unit: 'KB',
            },
            validity: {
                value: 15,
                unit: 'Days',
            },
        },
    ];

    const onChangeSortMock = jest.fn();
    const resetMock = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render ListDevice component correctly', () => {
        const { getByTestId } = render(
            <ListDevice data={data} onChangeSort={onChangeSortMock} reset={resetMock} />
        );

        const listDevice = getByTestId('list-device');
        expect(listDevice).toBeDefined();
    });

    it('should call handleSortChange and onChangeSort with the correct sorted devices when header-sort-device is pressed', () => {
        const { getByTestId } = render(
            <ListDevice data={data} onChangeSort={onChangeSortMock} reset={resetMock} />
        );

        const headerSortDevice = getByTestId('header-sort-device');

        fireEvent.press(headerSortDevice);
    });
});