import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { DHeight, DWidth } from './Dimension';

const height: number = DHeight;
const width: number = DWidth;

function currencyFormat(num: number) {
   return 'Rp. ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

const CheckoutButton = (props: any) => {
   const { total, reset, onCheckout } = props
   return (
      <View style={styles.btnCheckoutContainer}>
         <View style={styles.btnCheckoutTotalContainer}>
            <Text style={styles.btnCheckoutTotalTitle}>
               {'Total'}
            </Text>

            <Text style={styles.btnCheckoutTotalPrice}>
               {currencyFormat(total)}
            </Text>
         </View>

         <TouchableOpacity
            disabled={total < 1}
            testID='checkout-button'
            onPress={() => onCheckout()}
            style={{
               ...styles.btnCheckoutOnClickButton,
               backgroundColor: total > 1 ? '#3A4144' : '#CFCFCF',
            }}
         >
            <Text style={styles.btnCheckoutOnClickText}>
               {'Checkout'}
            </Text>
         </TouchableOpacity>

         {total > 1 && (
            <TouchableOpacity
               onPress={() => reset()}
               style={styles.btnCheckoutResetButton}
            >
               <Text style={styles.btnCheckoutResetText}>
                  {'Reset'}
               </Text>
            </TouchableOpacity>
         )}
      </View>
   );
};

export default CheckoutButton;

const styles = StyleSheet.create({
   btnCheckoutContainer: {
      width: width,
      alignItems: 'center',
      minHeight: height * 0.1,
      backgroundColor: 'white',
   },
   btnCheckoutTotalContainer: {
      flexDirection: 'row',
      height: height * 0.05,
      width: '90%',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   btnCheckoutOnClickButton: {
      borderRadius: 50,
      backgroundColor: '#3A4144',
      height: height / 16,
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 5.5,
   },
   btnCheckoutResetButton: {
      borderRadius: 50,
      borderColor: '#3A4144',
      borderWidth: 2,
      height: height / 16,
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 5.5,
   },
   btnCheckoutTotalTitle: {
      fontWeight: '900',
      color: 'black',
   },
   btnCheckoutTotalPrice: {
      fontWeight: '900',
      color: 'black',
   },
   btnCheckoutResetText: {
      fontWeight: '900',
      color: 'black',
   },
   btnCheckoutOnClickText: {
      fontWeight: '900',
      color: 'white',
   },
});
