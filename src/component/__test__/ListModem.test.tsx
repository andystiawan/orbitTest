import { act, cleanup, fireEvent, render, waitFor } from '@testing-library/react-native';

import ListModem from '../ListModem';

describe("List Modem", () => {
    afterEach(cleanup);

    const props = {
        data: [
            {
                id: 1,
                name: "Orbit Max",
                price: 370000,
                stock: 5,
                quantity: 1
            },
            {
                id: 2,
                name: "Orbit Min",
                price: 300000,
                stock: 5,
                quantity: 2
            },
            {
                id: 2,
                name: "Orbit Min",
                price: 300000,
                stock: 5,
                quantity: 2
            },
        ],
        dataFilter: jest.fn(),
        checkout: jest.fn(),
        reset: jest.fn()
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders list modem component correctly', () => {
        render(<ListModem {...props} />);
    });

    it('filters the data on sort change', () => {
        const { getByText, getByTestId } = render(<ListModem {...props} />);

        const sortButton = getByTestId('header-sort-modem');
        fireEvent.press(sortButton);

        const highestPriceOption = getByText('Highest Price');
        fireEvent.press(highestPriceOption);

        expect(props.dataFilter).toHaveBeenCalledWith([
            ...props.data
        ]);
    });

    // it('handleSortChange should sort modems by lowest price', () => {
    //     const { getByTestId } = render(<ListModem {...props} />);
    //     const data = [
    //         {
    //             id: 3,
    //             name: "Orbit Min S",
    //             price: 30000,
    //             stock: 15,
    //             quantity: 1
    //         },
    //         {
    //             id: 2,
    //             name: "Orbit Min",
    //             price: 300000,
    //             stock: 5,
    //             quantity: 2
    //         },
    //         {
    //             id: 2,
    //             name: "Orbit Min",
    //             price: 300000,
    //             stock: 5,
    //             quantity: 2
    //         },
    //     ];

    //     const setstate = jest.fn();
    //     const dataFilter = jest.fn();

    //     const sortOption = 'lowestPrice';

    //     const sortButton = getByTestId('header-sort-modem');
    //     fireEvent.press(sortButton);

    //     expect(setstate).toHaveBeenCalledWith({
    //         isSortedOpen: true,
    //         selectedSortData: sortOption,
    //     });

    //     expect(dataFilter).toHaveBeenCalledWith(data);
    // });

    it('clicks on sort button', () => {
        const { getByTestId } = render(<ListModem {...props} />);
        const sortButton = getByTestId('header-sort-modem');
        fireEvent.press(sortButton);
    });





    it('increments the quantity on add button click', () => {
        const { getByTestId } = render(<ListModem {...props} />);

        const addButton = getByTestId('add-btn-quantity0');
        fireEvent.press(addButton);
        expect(props.checkout).toHaveBeenCalledWith({
            modem: props.data[0],
            index: 0,
            type: '+',
        });
    });

    it('decrements the quantity on subtract button click', () => {
        const { getByTestId } = render(<ListModem {...props} />);

        const subtractButton = getByTestId('sub-btn-quantity1');
        fireEvent.press(subtractButton);

        expect(props.checkout).toHaveBeenCalledWith({
            modem: props.data[1],
            type: '-',
            index: 1,
        });
    });

    it('changes the quantity on text input change', () => {
        const { getByTestId } = render(<ListModem {...props} />);

        const quantityInput = getByTestId('input-quantity2');
        fireEvent.changeText(quantityInput, '4');

        expect(props.checkout).toHaveBeenCalledWith({
            modem: props.data[2],
            type: '',
            index: 2,
            value: '4',
        });
    });


    it('refreshes the list of modems', async () => {
        const { getByTestId } = render(<ListModem {...props} />);
        const onRefresh = getByTestId('list-modem');
        fireEvent(onRefresh, 'onRefresh');

        expect(onRefresh.props.refreshing).toBe(true);

        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(props.reset).toHaveBeenCalled();

    });

});
