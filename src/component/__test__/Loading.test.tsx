import { fireEvent, render, screen } from '@testing-library/react-native';


import { LoadDevice, LoadModem } from '../Loading';



describe('Loading', () => {
    it('call function loading device', () => {
        render(<LoadDevice />);
    });

    it('call function loading modem', () => {
        render(<LoadModem />);
    });
});