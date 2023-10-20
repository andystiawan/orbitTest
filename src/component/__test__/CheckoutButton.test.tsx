import { fireEvent, render, screen } from '@testing-library/react-native'
import CheckoutButton from '../CheckoutButton'

describe("CheckoutButton Test", () => {

    it('calls a function', () => {
        const props = {
            onCheckout: jest.fn(),
            total: 23,
            reset: jest.fn()
        };

        render(<CheckoutButton {...props} />);
        fireEvent.press(screen.getByText('Reset'));
        fireEvent.press(screen.getByText('Checkout'));

        // Assert that the mock function has been called
        expect(props.onCheckout).toHaveBeenCalled();
        // Assert that the mock function has been called
        expect(props.reset).toHaveBeenCalled();
    });
})