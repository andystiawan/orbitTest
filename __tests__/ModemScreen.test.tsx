import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import ModemScreen from '../src/view/ModemScreen';

jest.mock('@react-navigation/native', () => {
    return {
        useIsFocused: jest.fn()
    };
})

// Clean up the DOM after each test
afterEach(cleanup);

describe('ModemScreen Component', () => {
    it('renders correctly', () => {
        renderer.create(<ModemScreen />);
    });
});