import {Modal, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {DHeight, DWidth} from './Dimension';

const height: number = DHeight;
const width: number = DWidth;

type sortModem = {
  data: any;
  open: boolean;
  onClose: () => void;
  onChangeSort: (data: any) => void;
  selected: any;
};

export const SortModem = ({
  data,
  open,
  onClose,
  onChangeSort,
  selected,
}: sortModem) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={onClose}>
      <TouchableOpacity onPress={onClose} style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {data.map((item: any, index: number) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => onChangeSort(item.value)}
                style={[
                  styles.labelFilter,
                  index == data.length - 1 && {borderBottomWidth: 0},
                ]}>
                <Text
                  style={[
                    styles.textSort,
                    item.value == selected && {fontWeight: '900'},
                  ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

type sortDevice = {
  data: any;
  open: boolean;
  onClose: () => void;
  onChangeSort: (data: any) => void;
  sortSelect: any;
};

export const SortDevice = ({
  data,
  open,
  onClose,
  onChangeSort,
  sortSelect,
}: sortDevice) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={onClose}>
      <TouchableOpacity onPress={onClose} style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {data.map((item: any, index: number) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => onChangeSort(item.value)}
                style={[
                  styles.labelFilter2,
                  index == data.length - 1 && {borderBottomWidth: 0},
                ]}>
                <Text
                  style={[
                    styles.textSort,
                    item.value == sortSelect && {fontWeight: '900'},
                  ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contentHeader: {
    backgroundColor: 'white',
    height: height * 0.1,
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  sortIcon: {
    resizeMode: 'contain',
    width: '4%',
    marginHorizontal: 5,
  },
  labelFilter: {
    borderBottomWidth: 2,
    borderBottomColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  labelFilter2: {
    borderBottomWidth: 2,
    borderBottomColor: '#F6F6F6',
    width: '100%',
  },
  sort: {
    minWidth: '40%',
    backgroundColor: '#F0F0F0',
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    borderRadius: 16,
    justifyContent: 'space-between',
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
  item: {
    margin: 10,
    flexDirection: 'row',
  },
  textSort: {fontWeight: '400', color: '#262627', marginVertical: 10},
  textTitle: {fontWeight: '900', color: '#3A4144'},
});
