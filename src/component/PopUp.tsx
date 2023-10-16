import { Modal, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { DWidth } from './Dimension';

function currencyFormat(num: number) {
   return 'Rp. ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

const width: number = DWidth;

type btmCheckout = {
   open: boolean;
   onClose: () => void;
   total: number;
   modemTotal: any;
   onCheckoutButton: () => void;
};

export const CheckoutSuccessModal = ({
   open,
   onClose,
   total,
   modemTotal,
   onCheckoutButton,
}: btmCheckout) => {
   return (
      <Modal
         animationType="slide"
         transparent={true}
         visible={open}
         onRequestClose={onClose}>
         <View style={styles.modalCheckoutContainer}>
            <View style={styles.modalCheckoutContent}>
               <Text
                  style={styles.checkoutTitleText}>
                  Success!
               </Text>
               <Text style={styles.checkoutMessageText}>
                  {' You have successfully purchase '}
                  {modemTotal}
                  {' modems with total of '}
                  {currencyFormat(total)}.
               </Text>

               <Text style={styles.checkoutInstructionText}>
                  {'Click close to buy another modems'}
               </Text>

               <TouchableOpacity onPress={onCheckoutButton} style={styles.checkoutCloseButton}>

                  <Text style={styles.checkoutCloseButtonText}>
                     {'Close'}
                  </Text>

               </TouchableOpacity>

            </View>
         </View>
      </Modal>
   );
};

const styles = StyleSheet.create({
   modalCheckoutContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
   },
   modalCheckoutContent: {
      backgroundColor: 'white',
      margin: -5,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      padding: 20,
      width: width,
      alignItems: 'center',
   },
   checkoutTitleText: {
      fontSize: 21,
      fontWeight: '900',
      color: '#262627',
      marginVertical: 10,
   },
   checkoutMessageText: {
      fontSize: 15,
      fontWeight: '500',
      textAlign: 'center',
      marginBottom: 1,
      paddingHorizontal: 10,
      marginHorizontal: 40,
   },
   checkoutInstructionText: {
      fontSize: 14,
      fontWeight: '400',
      marginBottom: 20,
   },
   checkoutCloseButton: {
      backgroundColor: '#3A4144',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 48,
      width: width * 0.85,
      alignSelf: 'center',
      justifyContent: 'center',
   },
   checkoutCloseButtonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
   },
});
