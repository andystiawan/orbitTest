import {ActivityIndicator, Image, Text, View} from 'react-native';

export const LoadModem = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: '-5%',
      }}>
      <Image
        source={require('../assets/mobile_black.png')}
        style={{
          width: '20%',
          height: '20%',
          resizeMode: 'contain',
          margin: 15,
        }}
      />
      <Text style={{fontWeight: '900'}}>Loading Modem Data</Text>
      <Text style={{fontWeight: '500'}}>Please wait...</Text>
    </View>
  );
};

export const LoadDevice = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: '-5%',
      }}>
      <ActivityIndicator size="large" color="#D81A3C" />
      <Text style={{fontWeight: '900', fontSize: 21, color: '#3A4144'}}>
        Loading Device Data
      </Text>
      <Text style={{fontWeight: '500'}}>Please wait...</Text>
    </View>
  );
};
