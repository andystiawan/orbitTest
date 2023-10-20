import { fireEvent, render, screen } from '@testing-library/react-native';
import ListModem from '../ListModem';

describe("List Modem", () => {

    it('calls a function', () => {
        const props = {
            data: [
                {
                    id: 1,
                    name: "Orbit Max",
                    price: 370000,
                    stock: 5,
                    quantity: 1
                },
            ],
            dataFilter: jest.fn(),
            checkout: jest.fn(),
            reset: jest.fn()
        };



        const { } = render(<ListModem {...props} />);
        fireEvent.press(screen.getByTestId('select-sort'), 'Default');
        fireEvent.press(screen.getByTestId('close-sort'));
        fireEvent.press(screen.getByTestId('close-modal'));
        fireEvent.press(screen.getByText('-'), { item: props.data[0], index: 0, type: '-' });
        fireEvent.press(screen.getByText('+'), { item: props.data[0], index: 0, type: '+' });
        fireEvent.changeText(screen.getByTestId('input-quantity'), '10');


        const onRefresh = jest.fn();

        expect(onRefresh).toHaveBeenCalledWith('refresh');

    });
})