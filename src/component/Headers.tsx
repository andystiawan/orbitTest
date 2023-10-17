import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { DHeight, DWidth } from './Dimension';

const phone_img: any = require('../assets/mobile_white.png');
const icon_mobile: any = require('../assets/icon_mobile.png');

const height: number = DHeight;
const width: number = DWidth;

const Headers = (props: any) => {
  const { name, total, title } = props
  const isDevice = name == 'device'

  return (
    <View
      style={[
        styles.headerContainer,
        isDevice && {
          height: 120,
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: 15,
        },
      ]}
    >
      {isDevice && (
        <View style={styles.headerIconDeviceContainer}>
          <Image style={styles.headerIconDevice} source={icon_mobile} />
        </View>
      )}

      <Image
        style={[
          styles.headerImage,
          isDevice && { height: 50, width: 20 },
        ]}
        source={phone_img}
      />

      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.headerTextTitle,
            isDevice && { fontSize: 20 }
          ]}
        >
          {title}
        </Text>

        {total > 1 && (
          <Text style={styles.headerTextCategory}>
            {total} {name}
          </Text>
        )}
      </View>
    </View>
  );
};

export default Headers;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#D81A3C',
    flexDirection: 'row',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    width: width,
    height: height * 0.1,
    alignItems: 'center',
  },
  headerIconDeviceContainer: {
    position: 'absolute',
    right: -15,
  },
  headerImage: {
    width: '20%',
    height: '50%',
    flex: 0,
    objectFit: 'scale-down',
    resizeMode: 'center',
  },
  headerIconDevice: {
    width: 100,
    height: 120,
    resizeMode: 'contain',
  },
  headerTextTitle: {
    fontWeight: '900',
    color: 'white',
  },
  headerTextCategory: {
    fontWeight: '400',
    color: 'white',
  },
});
