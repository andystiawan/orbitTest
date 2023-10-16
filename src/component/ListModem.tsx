import React, { useEffect, useState } from 'react';
import {
   FlatList,
   Image,
   ListRenderItem,
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   View,
} from 'react-native';

import { DHeight, DWidth } from './Dimension';
import { SortModem } from './Sort';

const height: number = DHeight;

type list = {
   data: any[];
   dataFilter: (data: any[]) => void;
   checkout: (data: any) => void;
   reset: () => void;
};

type ItemType = {
   id: string;
};

function currencyFormat(num: number) {
   return 'Rp. ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

const filter = [
   { value: '', label: 'Default   ' },
   { value: 'highestPrice', label: 'Highest Price' },
   { value: 'lowestPrice', label: 'Lowest Price' },
   { value: 'name', label: 'Name    ' },
];

function ListModem({ data, dataFilter, checkout, reset }: list) {

   const initialState = {
      isSortedOpen: false,
      refresh: false,
      selectedSortData: '',
   };
   const [state, setstate] = useState(initialState);


   const handleSortChange = (sortOption: string) => {
      let sortedModems: any = [...data];

      switch (sortOption) {
         case 'highestPrice':
            sortedModems.sort((a: any, b: any) => b.price - a.price);
            break;
         case 'lowestPrice':
            sortedModems.sort((a: any, b: any) => a.price - b.price);
            break;
         case 'name':
            sortedModems.sort((a: any, b: any) => a.name.localeCompare(b.name));
            break;
         default:
            reset();
            break;
      }

      setstate({
         ...state,
         isSortedOpen: !state.isSortedOpen,
         selectedSortData: sortOption,
      });

      if (sortOption !== '') {
         dataFilter(sortedModems);
      }
   };

   const filterSelect = () => {
      return filter.find(item => item.value === state.selectedSortData);
   };

   const handleChangeTextInputCheckout = ({ item, index, event }: any) => {
      checkout({ modem: item, type: '', index, value: event });
      setstate({ ...state, isSortedOpen: false });
   }

   const handleChangeButtonPlus = ({ item, index }: any) => {
      checkout({ modem: item, type: '+', index });
      setstate({ ...state, isSortedOpen: false });
   }

   const handleChangeButtonMinus = ({ item, index }: any) => {
      checkout({ modem: item, type: '-', index });
      setstate({ ...state, isSortedOpen: false });
   }

   const onRefreshListModem = () => {
      setstate(p => ({ ...p, refresh: true }));
      reset();
      setTimeout(() => {
         setstate(initialState);
      }, 1000);
   }


   const listHeaderComponent = () => {
      return (
         <View style={{ alignItems: 'center', marginVertical: 10 }}>
            <View style={styles.listHeaderContainer}>

               <Image
                  source={require('../assets/sort.png')}
                  resizeMode={'contain'}
                  style={styles.listHeaderIconSort}
               />

               <Text>
                  {'Sort By:'}
               </Text>

               <View style={styles.listHeaderSortContainer}>

                  <TouchableOpacity
                     onPress={() => setstate({ ...state, isSortedOpen: !state.isSortedOpen })}
                     style={styles.listHeaderSortButton}
                  >

                     <Text style={styles.listHeaderSortLable}>
                        {filterSelect()?.label}
                     </Text>

                     <Image
                        style={{ width: '20%', height: '100%' }}
                        source={require('../assets/arrow_bottom.png')}
                     />

                  </TouchableOpacity>
               </View>

            </View>
         </View>
      );
   };

   const renderItem: ListRenderItem<ItemType> = ({ item, index }: any) => {
      const minStock = item?.stock <= item?.quantity
      const maxStock = item?.quantity >= item?.stock

      return (
         <View style={styles.itemContainer}>

            <View style={{ flex: 1 }}>

               <Text style={styles.textTitle}>
                  {item.name}
               </Text>

               <Text style={styles.textPrice}>
                  {currencyFormat(item?.price || 0)}
               </Text>

            </View>

            <View style={styles.buttonContainer}>

               <TouchableOpacity
                  disabled={item?.quantity < 1}
                  onPress={() => handleChangeButtonMinus({ item, index })}
                  style={{
                     ...styles.minus,
                     backgroundColor: item?.quantity > 0 ? '#3A4144' : '#CFCFCF',
                  }}>

                  <Text style={styles.minusText}>
                     {'-'}
                  </Text>

               </TouchableOpacity>

               <TextInput
                  style={{ flex: 1, textAlign: 'center' }}
                  defaultValue="0"
                  value={item?.quantity?.toString()}
                  onChangeText={event => handleChangeTextInputCheckout({ item, index, event })}
                  keyboardType="numeric"
               />

               <TouchableOpacity
                  disabled={maxStock}
                  onPress={() => handleChangeButtonPlus({ item, index })}
                  style={{
                     ...styles.plus,
                     backgroundColor: minStock ? '#CFCFCF' : '#3A4144',
                  }}>
                  <Text style={styles.plusText}>
                     {'+'}
                  </Text>

               </TouchableOpacity>
            </View>
         </View>
      );
   };

   return (
      <View style={styles.container}>
         <FlatList
            onRefresh={onRefreshListModem}
            refreshing={state.refresh}
            ListHeaderComponent={listHeaderComponent}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
         />

         <SortModem
            data={filter}
            open={state.isSortedOpen}
            onClose={() => setstate({ ...state, isSortedOpen: false })}
            onChangeSort={handleSortChange}
            selected={state.selectedSortData}
         />
      </View>
   );
}

export default ListModem;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white',
      position: 'relative',
   },
   listContainer: {
      alignItems: 'center',
      marginVertical: 10,
      backgroundColor: 'white',
   },
   listHeaderIconSort: {
      width: '4%',
      marginHorizontal: 5,
   },
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
      width: '100%',
      alignItems: 'center',
   },
   listHeaderSortContainer: {
      flex: 1,
      alignItems: 'flex-end',
      marginHorizontal: 5,
   },
   listHeaderSortButton: {
      minWidth: '10%',
      maxWidth: 200,
      backgroundColor: '#F0F0F0',
      paddingVertical: 5,
      paddingHorizontal: 20,
      flexDirection: 'row',
      borderRadius: 16,
      justifyContent: 'space-between',
   },
   listHeaderContainer: {
      backgroundColor: 'white',
      height: height * 0.1,
      width: '90%',
      alignItems: 'center',
      flexDirection: 'row',
   },
   listHeaderSortLable: {
      borderBottomWidth: 2,
      borderBottomColor: '#F6F6F6',
      justifyContent: 'center',
      alignItems: 'center',
      width: '50%',
   },
   itemContainer: {
      margin: 10,
      flexDirection: 'row',
   },
   textTitle: { fontWeight: '900', color: '#3A4144' },
   textPrice: { fontWeight: '700', color: '#7D8285' },
   textSort: { fontWeight: '400', color: '#262627', marginVertical: 10 },
   btnFooter: {
      backgroundColor: 'red',
      height: height * 0.05,
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 16,
   },
   plus: {
      borderRadius: 4,
      backgroundColor: '#3A4144',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
   },
   plusText: {
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      fontSize: height * 0.045,
      margin: 0,
      padding: 0,
      lineHeight: height * 0.05,
   },
   minus: {
      borderRadius: 4,
      backgroundColor: '#CFCFCF',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
   },
   minusText: {
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      fontSize: height * 0.045,
      margin: 0,
      padding: 0,
      lineHeight: height * 0.05,
   },
   textLabel: { fontWeight: 'bold', alignSelf: 'center', color: 'black' },
   buttonContainer: {
      flexDirection: 'row',
      flex: 0.8,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#F6F6F6',
      borderRadius: 8,
      paddingHorizontal: 10,
      height: '95%',
   }
});
