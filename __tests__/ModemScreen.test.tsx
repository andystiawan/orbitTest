// import { render, fireEvent, cleanup } from '@testing-library/react-native';

// import ModemScreen from '../src/view/ModemScreen';// Adjust the import path
// import ListModem from '../src/component/ListModem';
// import CheckoutButton from '../src/component/CheckoutButton';
// import { LoadModem } from '../src/component/Loading';

// // Mock your network service function
// jest.mock('../src/network/service/serviceModem', () => ({
//     getModemList: jest.fn(() => Promise.resolve({ data: [] })),
// }));

// //Mock navigation
// jest.mock('@react-navigation/native', () => {
//     return {
//         useIsFocused: jest.fn()
//     };
// });

// jest.useFakeTimers();

// // Clean up the DOM after each test
// afterEach(cleanup);


// describe('ModemScreen', () => {

//     const props = {
//         data: [
//             {
//                 id: 1,
//                 name: "Orbit Max",
//                 price: 370000,
//                 stock: 5,
//                 quantity: 1
//             },
//             {
//                 id: 2,
//                 name: "Orbit Min",
//                 price: 300000,
//                 stock: 4,
//                 quantity: 2
//             },
//         ],
//         dataFilter: jest.fn(),
//         checkout: jest.fn(),
//         reset: jest.fn(),
//     };

//     render(<ModemScreen />);


//     it('call function by Text', () => {
//         const { getByText } = render(<ModemScreen />);
//         fireEvent.press(getByText('Checkout'));
//     });

//     props.data.map((item, index) => {
//         it('calls a function', () => {
//             const { getByTestId } = render(<ListModem {...props} />);

//             fireEvent.press(getByTestId(`add-btn-quantity${index}`), { item, index, type: '-' });

//             fireEvent.press(getByTestId(`sub-btn-quantity${index}`), { item, index, type: '-' });

//             fireEvent.changeText(getByTestId(`input-quantity${index}`), '10');

//         });
//     });

//     it('renders Checkout', () => {
//         render(<CheckoutButton total={10000} reset={() => jest.fn()} onCheckout={() => jest.fn()} />);
//     });

//     it('renders Loading', () => {
//         render(<LoadModem />)
//     });

// });

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useIsFocused as mockUseIsFocused } from '@react-navigation/native';

import { getModemList } from '../src/network/service/serviceModem';

import ModemScreen from '../src/view/ModemScreen';

jest.mock('../src/network/service/serviceModem', () => ({
    getModemList: jest.fn()
}));

// Mock useIsFocused
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useIsFocused: jest.fn(),
}));

describe('ModemScreen', () => {
    beforeEach(() => {
        (mockUseIsFocused as jest.Mock).mockReturnValue(true);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders ModemScreen correctly', async () => {
        (getModemList as jest.Mock).mockResolvedValueOnce(JSON.stringify({ data: [] }));

        render(<ModemScreen />);

        expect(getModemList).toHaveBeenCalledTimes(1);
        expect(mockUseIsFocused).toHaveBeenCalledTimes(2);
        expect(mockUseIsFocused).toHaveBeenCalledWith();
    });


});
