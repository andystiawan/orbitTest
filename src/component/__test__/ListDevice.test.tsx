import React from 'react';
import { act, cleanup, fireEvent, render } from '@testing-library/react-native';
import ListDevice from '../ListDevice';
import { SortDevice } from '../Sort';

describe("List Device", () => {
    afterEach(cleanup);
    const props = {
        data: [
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
            }
        ],
        onChangeSort: jest.fn(),
        reset: jest.fn()
    };

    it('renders list device component correctly', () => {
        render(<ListDevice {...props} />);
    });

    it('should render the list correctly', () => {
        const { getByTestId } = render(<ListDevice {...props} />);

        const listDevice = getByTestId('list-device');
        expect(listDevice).toBeDefined();
        expect(listDevice).toBeTruthy();
        expect(listDevice.children.length).toBe(props.data.length);
    });

    it('Sort is initially', () => {
        const { getByTestId } = render(<ListDevice {...props} />)
        const sortDropdown = getByTestId('header-sort-device')
        expect(sortDropdown).not.toBeNull();
    })

    it('call function sort device', () => {
        const props = {
            data: [{ value: '', label: 'Default' }],
            open: true,
            onClose: jest.fn(),
            onChangeSort: jest.fn(),
            sortSelect: 'Default   ',
        };

        const { getByTestId } = render(<SortDevice {...props} />);
        const selectSortModem = getByTestId('select-sort-device');

        act(() => {
            fireEvent(selectSortModem, 'onPress', props.sortSelect, props.data)
        })

        // Assert that the mock function has been called
        expect(props.onChangeSort).toHaveBeenCalled()
    });

    it('filters the data on sort change', () => {
        const { getByText, getByTestId } = render(<ListDevice {...props} />);

        const sortButton = getByTestId('header-sort-device');
        fireEvent.press(sortButton);

        const nameOption = getByText('Name');
        fireEvent.press(nameOption);

        expect(props.onChangeSort).toHaveBeenCalledWith([
            ...props.data
        ]);
    });

    it('should toggle additional information when "more info" button is pressed', () => {
        const { getByTestId, queryByTestId } = render(<ListDevice {...props} />);

        // Ensure that additional information is not initially visible
        expect(queryByTestId('more-info-content0')).toBeNull();

        // Simulate pressing the "more info" button
        const moreInfoButton = getByTestId('more-info-button0');
        fireEvent.press(moreInfoButton);

        // Assert that additional information is now visible
        expect(getByTestId('more-info-content0')).toBeTruthy();

        // Simulate pressing the "more info" button again to hide the additional information
        fireEvent.press(moreInfoButton);

        // Assert that additional information is hidden again
        expect(queryByTestId('more-info-content0')).toBeNull(); // Adjust the index as needed
    });

    it('clicks on sort button', () => {
        const { getByTestId } = render(<ListDevice {...props} />);
        const sortButton = getByTestId('header-sort-device');
        fireEvent.press(sortButton);
    });


    it("collapses more info content when 'More Info' button is pressed again", () => {
        const { getByTestId } = render(
            <ListDevice {...props} />
        );

        const moreInfoButton = getByTestId("more-info-button0");

        fireEvent.press(moreInfoButton);
    });


    it('refreshes the list of device', async () => {
        const { getByTestId } = render(<ListDevice {...props} />);
        const onRefresh = getByTestId('list-device');
        fireEvent(onRefresh, 'onRefresh');

        expect(onRefresh.props.refreshing).toBe(true);

        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(props.reset).toHaveBeenCalled();

    });


});