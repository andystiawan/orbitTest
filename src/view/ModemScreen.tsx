import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { getModemList } from '../network/service/serviceModem';

import CheckoutButton from '../component/CheckoutButton';
import Headers from '../component/Headers';
import ListModem from '../component/ListModem';
import { LoadModem } from '../component/Loading';
import { DWidth } from '../component/Dimension';
import { BtmCloseCheckout } from '../component/PopUp';

const width: number = DWidth;

const ModemScreen = ({ navigation }: any) => {

   const initialState = {
      modemListData: [],
      totalCheckout: 0,
      isLoading: false,
      isCheckout: false,
   };

   const [state, setState] = useState(initialState);

   const { modemListData, totalCheckout, isLoading, isCheckout } = state

   const isFocused = useIsFocused();

   const fetchData = async () => {
      setState({ isLoading: true, totalCheckout: 0, isCheckout: false, modemListData: [] });

      const res = await getModemList().then(res => {
         const result = JSON.parse(res).data;
         return result.map((item: any) => {
            return {
               id: item?.id,
               stock: item?.Stock,
               name: item?.Name,
               price: item?.Price,
            };
         });
      });

      setTimeout(() => {
         setState(p => ({ ...p, isLoading: false, Data: res }));
      }, 3000);
   };

   useEffect(() => {

      if (isFocused) {
         fetchData();
      }

   }, [isFocused]);

   const calculated = (value: any) => {
      let data: any = [...modemListData];

      const { stock = 0, price = 0 } = value.modemListData

      const quantity = value.Data?.quantity
      const typePlus = value.type === '+'
      const typeMinus = value.type === '-'


      if (typePlus) {
         const qty = quantity ? quantity + 1 : 1;
         const result = {
            ...value.modemListData,
            quantity: qty,
            subtotal: price * qty,
         };
         data[value.index] = result;
      } else if (typeMinus) {
         const qty = quantity ? quantity - 1 : 0;
         const result = {
            ...value.modemListData,
            quantity: qty,
            subtotal: price * qty,
         };
         data[value.index] = result;
      } else {
         const qty = value.value;
         const cekQty = qty >= stock ? stock : qty;
         const result = {
            ...value.modemListData,
            quantity: Number(cekQty) || 0,
            subtotal: price * Number(cekQty) || 0,
         };
         data[value.index] = result;
      }

      const findSubtotal = data.filter((x: any) => x?.subtotal);
      const cektotal = calculateTotal(findSubtotal);
      setState(p => ({
         ...p,
         modemListData: data,
         totalCheckout: cektotal,
         isCheckout: false,
      }));
   };

   const calculateTotal = (items: any) => {
      let total = 0;
      for (const item of items) {
         total += item.subtotal;
      }
      return total;
   };

   const feedbackCheckout = () => {
      setState(p => ({
         ...p,
         isCheckout: true,
      }));
   };

   const closeCheckout = () => {
      setState(p => ({
         ...p,
         isCheckout: false,
      }));
   };

   return (
      <View style={{ flex: 1 }}>
         <Headers title="Modem List" name="modemListData" totalCheckoutmary={modemListData?.length} />

         {!isLoading ? (
            <View style={{ flex: 1 }}>

               <ListModem
                  checkout={value => calculated(value)}
                  dataFilter={(data: any[]) => setState((p: any) => ({ ...p, modemListData: data }))}
                  data={modemListData}
                  stateFirst={state}
                  reset={() => fetchData()}
               />

               <CheckoutButton
                  total={totalCheckout}
                  reset={() => fetchData()}
                  feedBack={() => feedbackCheckout()}
               />

            </View>
         ) : (
            <LoadModem />
         )}

         <BtmCloseCheckout
            open={isCheckout}
            onClose={closeCheckout}
            sum={totalCheckout}
            modemTotal={modemListData.filter((x: any) => x?.subtotal).length}
            afterCheckout={closeCheckout}
         />
      </View>
   );
};

export default ModemScreen;
