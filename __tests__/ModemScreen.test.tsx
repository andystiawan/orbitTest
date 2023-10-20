import { useState, useEffect } from "react";
import { render, fireEvent, cleanup, waitFor, screen } from '@testing-library/react-native';
// Note: test renderer must be required after react-native.

import ModemScreen from '../src/view/ModemScreen';

jest.mock('@react-navigation/native', () => {
    return {
        useIsFocused: jest.fn()
    };
})

// Clean up the DOM after each test
afterEach(cleanup);

describe('ModemScreen', () => {
    it('renders correctly', () => {
        render(<ModemScreen />);
    });

    it('call function by Text', () => {
        render(<ModemScreen />);
        fireEvent.press(screen.getByText('Checkout'));
    });

});