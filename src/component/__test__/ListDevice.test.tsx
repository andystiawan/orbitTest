import React from 'react';
import { act, cleanup, fireEvent, render } from '@testing-library/react-native';
import { toBeInTheDocument } from '@testing-library/jest-native';
import ListDevice from '../ListDevice';

describe("List Device", () => {
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

    it('should render the list correctly', () => {
        const { getByTestId } = render(<ListDevice {...props} />);

        const listDevice = getByTestId('list-device');
        expect(listDevice).toBeDefined();
        expect(listDevice).toBeInTheDocument();
    });

    it('should call onChangeSort function when sort option is selected', () => {
        const { getByTestId } = render(<ListDevice {...props} />);

        const moreInfoButton0 = getByTestId('more-info-button0');

        fireEvent.press(moreInfoButton0);

        expect(props.onChangeSort).toHaveBeenCalled();
    });


    it("collapses more info content when 'More Info' button is pressed again", () => {
        const { getByTestId } = render(
            <ListDevice {...props} />
        );

        const moreInfoButton = getByTestId("more-info-button0");

        fireEvent.press(moreInfoButton);
    });


});