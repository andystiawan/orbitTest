import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Headers from '../component/Headers';
import {LoadModem} from '../component/Loading';
import ListModem from '../component/ListModem';
import {modemList} from '../network/service/serviceModem';
import {useIsFocused} from '@react-navigation/native';
import CheckoutButton from '../component/CheckoutButton';
import {DWidth} from '../component/Dimension';
import {BtmCloseCheckout} from '../component/PopUp';

const width: number = DWidth;

const ModemScreen = ({navigation}: any) => {
  const initialState = {
    modem: [],
    sum: 0,
    loading: false,
    checkout: false,
  };

  const [state, setState] = useState(initialState);

  const isFocused = useIsFocused();

  const fetchData = async () => {
    setState(p => ({...p, loading: true, sum: 0, checkout: false, modem: []}));
    const res = await modemList().then(res => {
      const result = JSON.parse(res).data;
      return result.map((item: any) => {
        return {
          id: item.id,
          stock: item.Stock,
          name: item.Name,
          price: item.Price,
        };
      });
    });
    setTimeout(() => {
      setState(p => ({...p, loading: false, modem: res}));
    }, 3000);
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const calculated = (e: any) => {
    let dataModem: any = [...state.modem];

    if (e.type === '+') {
      const qty = e.modem?.quantity ? e.modem?.quantity + 1 : 1;
      const result = {
        ...e.modem,
        quantity: qty,
        subtotal: e.modem?.price * qty,
      };
      dataModem[e.index] = result;
    } else if (e.type === '-') {
      const qty = e.modem?.quantity ? e.modem?.quantity - 1 : 0;
      const result = {
        ...e.modem,
        quantity: qty,
        subtotal: e.modem?.price * qty,
      };
      dataModem[e.index] = result;
    } else {
      const qty = e.value;
      const cekQty = qty >= e.modem?.stock ? e.modem?.stock : qty;
      const result = {
        ...e.modem,
        quantity: Number(cekQty) || 0,
        subtotal: e.modem?.price * Number(cekQty) || 0,
      };
      dataModem[e.index] = result;
    }

    const findSubtotal = dataModem.filter((x: any) => x?.subtotal);
    const cektotal = calculateTotal(findSubtotal);
    setState(p => ({
      ...p,
      modem: dataModem,
      sum: cektotal,
      checkout: false,
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
      checkout: true,
    }));
  };

  return (
    <View style={{flex: 1}}>
      <Headers title="Modem List" name="modem" summary={state?.modem?.length} />
      {!state.loading ? (
        <View style={{flex: 1}}>
          <ListModem
            checkout={e => calculated(e)}
            dataFilter={(e: any[]) => setState((p: any) => ({...p, modem: e}))}
            data={state.modem}
            stateFirst={state}
            reset={() => fetchData()}
          />
          <CheckoutButton
            total={state.sum}
            reset={() => fetchData()}
            feedBack={() => feedbackCheckout()}
          />
        </View>
      ) : (
        <LoadModem />
      )}

      <BtmCloseCheckout
        open={state.checkout}
        onClose={() =>
          setState(p => ({
            ...p,
            checkout: false,
          }))
        }
        sum={state.sum}
        modemTotal={state.modem.filter((x: any) => x?.subtotal).length}
        afterCheckout={() => {
          setState(p => ({
            ...p,
            checkout: false,
          }));
        }}
      />
    </View>
  );
};

export default ModemScreen;

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
