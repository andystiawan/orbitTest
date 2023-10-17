import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { getModemList } from '../network/service/serviceModem';

import CheckoutButton from '../component/CheckoutButton';
import Headers from '../component/Headers';
import ListModem from '../component/ListModem';
import { LoadModem } from '../component/Loading';
import { CheckoutSuccessModal } from '../component/PopUp';

const ModemScreen = () => {

   const initialState = {
      isLoading: false,
      isCheckout: false,
      modemListData: [],
      totalCheckout: 0,

   };

   const [state, setState] = useState<any>(initialState);

   const {
      isLoading,
      isCheckout,
      modemListData,
      totalCheckout,
   } = state

   const isFocused = useIsFocused();

   const fetchData = async () => {
      setState({ ...initialState, isLoading: true });
      const res = await getModemList().then(async res => {
         const result = await JSON.parse(res).data;
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
         setState({ ...state, isLoading: false, modemListData: res });
      }, 3000);
   };

   useEffect(() => {
      isFocused && fetchData();
   }, [isFocused]);


   const calculated = (value: any) => {
      let data: any = [...modemListData];

      const { stock = 0, price = 0, quantity } = value?.modem

      const typePlus = value.type === '+'
      const typeMinus = value.type === '-'

      const result = (qty: number) => ({
         ...value.modem,
         quantity: qty,
         subtotal: price * qty,
      })


      if (typePlus) {
         const qty = quantity ? quantity + 1 : 1;

         data[value.index] = result(qty);
      } else if (typeMinus) {
         const qty = quantity ? quantity - 1 : 0;

         data[value.index] = result(qty);
      } else {
         const qty = Number(value?.value || 0);
         const cek = qty >= stock ? stock : qty;

         data[value.index] = result(cek);
      }

      const findSubtotal = data.filter((x: any) => x?.subtotal);
      const cektotal = calculateTotal(findSubtotal);

      setState({
         ...state,
         modemListData: data,
         totalCheckout: cektotal,
         isCheckout: false,
      });
   };

   const onChangeState = (name: string, value: any) => {
      setState({ ...state, [name]: value })
   }

   const calculateTotal = (items: any) => {
      let total = 0;

      for (const item of items) {
         total += item.subtotal;
      }
      return total;
   };

   const onCheckout = () => {
      onChangeState('isCheckout', true)
   };

   const closeCheckout = () => {
      onChangeState('isCheckout', false)
   };

   return (
      <View style={{ flex: 1 }}>
         <Headers
            title="Modem List"
            name="modemListData"
            totalCheckoutmary={modemListData?.length}
         />

         {!isLoading ? (
            <View style={{ flex: 1 }}>
               <ListModem
                  checkout={value => calculated(value)}
                  dataFilter={(data: any[]) => setState({ ...state, modemListData: data })}
                  data={modemListData}
                  reset={() => fetchData()}
               />

               <CheckoutButton
                  total={totalCheckout}
                  reset={() => fetchData()}
                  onCheckout={() => onCheckout()}
               />
            </View>
         ) : (
            <LoadModem />
         )}

         <CheckoutSuccessModal
            open={isCheckout}
            onClose={closeCheckout}
            total={totalCheckout}
            modemTotal={modemListData.filter((x: any) => x?.subtotal).length}
            onCheckoutButton={closeCheckout}
         />
      </View>
   );
};

export default ModemScreen;
