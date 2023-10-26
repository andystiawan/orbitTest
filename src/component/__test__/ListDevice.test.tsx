import React from 'react';
import { act, cleanup, fireEvent, render } from '@testing-library/react-native';
import ListDevice from '../ListDevice';

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

    it('should render the list correctly', () => {
        const { getByTestId, getByText } = render(<ListDevice {...props} />);

        const listDevice = getByTestId('list-device');
        expect(listDevice).toBeDefined();
        expect(listDevice.children.length).toBe(props.data.length);
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

    it("collapses more info content when 'More Info' button is pressed again", () => {
        const { getByTestId } = render(
            <ListDevice {...props} />
        );

        const moreInfoButton = getByTestId("more-info-button0");

        fireEvent.press(moreInfoButton);
    });


});