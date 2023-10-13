import {Modal, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {DWidth} from './Dimension';

function currencyFormat(num: number) {
  return 'Rp. ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

const width: number = DWidth;

type btmCheckout = {
  open: boolean;
  onClose: () => void;
  sum: number;
  modemTotal: any;
  afterCheckout: () => void;
};

export const BtmCloseCheckout = ({
  open,
  onClose,
  sum,
  modemTotal,
  afterCheckout,
}: btmCheckout) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text
            style={{
              fontSize: 21,
              fontWeight: '900',
              color: '#262627',
              marginVertical: 10,
            }}>
            Success!
          </Text>
          <Text style={styles.successText}>
            You have successfully purchase {modemTotal} modems with total of{' '}
            {currencyFormat(sum)}.
          </Text>
          <Text style={styles.instructionsText}>
            Click close to buy another modems
          </Text>
          <TouchableOpacity onPress={afterCheckout} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: -5,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    width: width,
    alignItems: 'center',
  },
  successText: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 1,
    paddingHorizontal: 10,
    marginHorizontal: 40,
  },
  instructionsText: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#3A4144',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 48,
    width: width * 0.85,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
