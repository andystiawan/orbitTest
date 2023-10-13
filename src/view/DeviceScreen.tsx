import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Headers from '../component/Headers';
import {useIsFocused} from '@react-navigation/native';
import {deviceList} from '../network/service/serviceDevice';
import {LoadDevice} from '../component/Loading';
import ListDevice from '../component/ListDevice';

const DeviceScreen = ({route, navigation}: any) => {
  const initialState = {
    device: [],
    sum: 0,
    loading: false,
  };
  const [state, setState] = useState(initialState);

  const isFocused = useIsFocused();

  const fetchData = async () => {
    setState(p => ({...p, loading: true, sum: 0, checkout: false, device: []}));
    const res = await deviceList().then(res => {
      return JSON.parse(res).data;
    });
    setTimeout(() => {
      setState(p => ({...p, loading: false, device: res}));
    }, 3000);
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  return (
    <View style={{flex: 1, backgroundColor: '#FBFBFB'}}>
      <Headers
        title="Manage Devices"
        name="device"
        summary={state.device.length}
      />
      {!state.loading ? (
        <View style={{flex: 1}}>
          <ListDevice
            onChangeSort={(e: any[]) =>
              setState((p: any) => ({...p, device: e}))
            }
            data={state.device}
            reset={() => fetchData()}
          />
        </View>
      ) : (
        <LoadDevice />
      )}
    </View>
  );
};

export default DeviceScreen;

const styles = StyleSheet.create({});
