import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {DHeight, DWidth} from './Dimension';

const phone_img: any = require('../assets/mobile_white.png');
const icon_mobile: any = require('../assets/icon_mobile.png');

const height: number = DHeight;
const width: number = DWidth;

const Headers = (props: any) => {
  return (
    <View
      style={[
        styles.container,
        props?.name == 'device' && {
          height: 120,
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: 15,
        },
      ]}>
      {props?.name == 'device' && (
        <View style={styles.posIcon}>
          <Image style={styles.icon} source={icon_mobile} />
        </View>
      )}
      <Image
        style={[
          styles.image,
          props?.name == 'device' && {height: 50, width: 20},
        ]}
        source={phone_img}
      />
      <View style={{flex: 1}}>
        <Text style={[styles.text, props?.name == 'device' && {fontSize: 20}]}>
          {props?.title}
        </Text>
        {props?.summary > 1 && (
          <Text style={styles.text2}>
            {props?.summary} {props?.name}
          </Text>
        )}
      </View>
    </View>
  );
};

export default Headers;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D81A3C',
    flexDirection: 'row',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    width: width,
    height: height * 0.1,
    alignItems: 'center',
  },
  posIcon: {
    position: 'absolute',
    right: -15,
  },
  image: {
    width: '20%',
    height: '50%',
    flex: 0,
    objectFit: 'scale-down',
    resizeMode: 'center',
  },
  icon: {
    width: 100,
    height: 120,
    resizeMode: 'contain',
  },
  text: {
    fontWeight: '900',
    color: 'white',
  },
  text2: {
    fontWeight: '400',
    color: 'white',
  },
});
