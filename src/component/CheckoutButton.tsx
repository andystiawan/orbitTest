import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { DHeight, DWidth } from './Dimension';

const height: number = DHeight;
const width: number = DWidth;

function currencyFormat(num: number) {
  return 'Rp. ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

const CheckoutButton = (props: any) => {
  const { total, reset, feedBack } = props
  return (
    <View style={styles.container}>
      <View style={styles.price}>

        <Text style={styles.text}>
          {'Total'}
        </Text>

        <Text style={styles.text}>
          {currencyFormat(total)}
        </Text>

      </View>
      <TouchableOpacity
        disabled={total < 1}
        onPress={feedBack}
        style={{
          ...styles.buttonCheckout,
          backgroundColor: total > 1 ? '#3A4144' : '#CFCFCF',
        }}>

        <Text style={styles.textWhite}>
          {'Chekcout'}
        </Text>

      </TouchableOpacity>
      {total > 1 && (
        <TouchableOpacity
          onPress={reset}
          style={styles.buttonReset}>

          <Text style={styles.text}>
            {'Reset'}
          </Text>

        </TouchableOpacity>
      )}
    </View>
  );
};

export default CheckoutButton;

const styles = StyleSheet.create({
  container: {
    width: width,
    alignItems: 'center',
    minHeight: height * 0.1,
    backgroundColor: 'white',
  },
  text: {
    fontWeight: '900',
    color: 'black',
  },
  textWhite: {
    fontWeight: '900',
    color: 'white',
  },
  price: {
    flexDirection: 'row',
    height: height * 0.05,
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonCheckout: {
    borderRadius: 50,
    backgroundColor: '#3A4144',
    height: height / 16,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5.5,
  },
  buttonReset: {
    borderRadius: 50,
    borderColor: '#3A4144',
    borderWidth: 2,
    height: height / 16,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5.5,
  },
});
