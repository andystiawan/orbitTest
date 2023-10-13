import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

type Homes = {
  route: any;
  navigation: any;
};

const HomeScreen = ({route, navigation}: Homes) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Modem')}
        style={styles.btn}>
        <Text style={styles.txt}>Modem</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Device')}>
        <Text style={styles.txt}>Device</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#D81A3C',
    width: '50%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 10,
  },
  txt: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
