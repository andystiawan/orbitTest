import {useState} from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DHeight, DWidth} from './Dimension';
import {SortDevice} from './Sort';

const height: number = DHeight;
const width: number = DWidth;

const filter = [
  {value: '', label: 'Default   '},
  {value: 'name', label: 'Name    '},
  {value: 'quota', label: 'Quota    '},
];

type list = {
  data: any[];
  onChangeSort: (data: any[]) => void;
  reset: () => void;
};

type ItemType = {
  id: string;
};

const ListDevice = ({data, onChangeSort, reset}: list) => {
  const initialState = {
    sortOpen: false,
    selectedSort: '',
    refresh: false,
    selectedInfo: '',
  };

  const [state, setstate] = useState(initialState);

  //Sort
  const handleSortChange = (sortOption: string) => {
    let sortedModems: any = [...data];

    switch (sortOption) {
      case 'quota':
        sortedModems.sort(
          (a: any, b: any) =>
            b.quota.maxUsage -
            b.quota.currentUsage -
            (a.quota.maxUsage - a.quota.currentUsage),
        );
        break;
      case 'name':
        sortedModems.sort((a: any, b: any) => a.name.localeCompare(b.name));
        break;
      default:
        reset();
        break;
    }

    setstate(p => ({
      ...p,
      selectedSort: sortOption,
      sortOpen: !state.sortOpen,
    }));

    if (sortOption !== '') {
      onChangeSort(sortedModems);
      setstate(p => ({
        ...p,
        selectedInfo: '',
      }));
    }
  };

  //Select More Info
  const onChangeSelect = (data: any) => {
    setstate(p => ({
      ...p,
      selectedInfo: state.selectedInfo == data ? '' : data,
    }));
  };

  const listHeaderComponent = () => {
    const filterSelect = () => {
      return filter.find(item => item.value === state.selectedSort);
    };

    return (
      <View style={styles.header}>
        <View style={styles.contentHeader}>
          <Image
            source={require('../assets/sort.png')}
            style={styles.sortIcon}
          />
          <Text style={{color: '#3A4144'}}>Sort By:</Text>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              paddingHorizontal: 5,
            }}>
            <TouchableOpacity
              onPress={() =>
                setstate(p => ({
                  ...p,
                  sortOpen: !state.sortOpen,
                }))
              }
              style={styles.sort}>
              <Text style={styles.textLabel}>{filterSelect()?.label}</Text>
              <Image
                resizeMode="contain"
                style={{width: '10%', height: '100%'}}
                source={require('../assets/arrow_bottom.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const convertToGB = (number: number, unit: string) => {
    let convert: number = number;
    switch (unit) {
      case 'MB':
        convert = convert / 1000;
        break;
      case 'KB':
        convert = convert / 1000000;
        break;
      default:
        break;
    }

    return Math.round(convert);
  };

  const renderItem: ListRenderItem<ItemType> = ({item, index}: any) => {
    const percentage = Math.round(
      (item.quota.currentUsage / item.quota.maxUsage) * 100,
    );

    return (
      <View style={styles.itemContainer}>
        <View style={styles.item}>
          <View style={{flex: 2, justifyContent: 'center'}}>
            <Text>name</Text>
            <Text style={styles.textTitle}>{item.name}</Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text>Quota</Text>
            <View style={styles.progressContain}>
              <View
                style={{
                  backgroundColor:
                    percentage <= 25
                      ? '#DB2424'
                      : percentage > 25 && percentage <= 75
                      ? '#FFCE20'
                      : '#A9CF3B',
                  borderRadius: 32,
                  width: `${percentage}%`,
                  height: 15,
                }}
              />
            </View>
          </View>
          <View style={{flex: 0, margin: 10, justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => onChangeSelect(item.id)}>
              <Image
                resizeMethod="resize"
                resizeMode="contain"
                style={{width: 15}}
                source={
                  state.selectedInfo == item.id
                    ? require('../assets/minus.png')
                    : require('../assets/plus.png')
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        {state.selectedInfo == item.id && (
          <View style={styles.subContain}>
            <View style={styles.subItem}>
              <Text style={{flex: 1}}>Usage</Text>
              <Text>
                {convertToGB(item.quota.currentUsage, item.quota.unit)}GB
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {` / `}
                {convertToGB(item.quota.maxUsage, item.quota.unit)}GB
              </Text>
            </View>
            <View style={styles.subItem}>
              <Text>Validity</Text>
              <Text>{`${item.validity.value} ${item.validity.unit}`}</Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  const onRefresh = () => {
    setstate(p => ({...p, refresh: true}));
    reset();
    setTimeout(() => {
      setstate(p => ({
        ...p,
        refresh: false,
        selectedSort: '',
        sortOpen: false,
      }));
    }, 1000);
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        onRefresh={onRefresh}
        refreshing={state.refresh}
        ListHeaderComponent={listHeaderComponent}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <SortDevice
        data={filter}
        open={state.sortOpen}
        onClose={() =>
          setstate(p => ({
            ...p,
            sortOpen: false,
          }))
        }
        onChangeSort={handleSortChange}
        sortSelect={state.selectedSort}
      />
    </View>
  );
};
export default ListDevice;
const styles = StyleSheet.create({
  contentHeader: {
    height: height * 0.1,
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  sortIcon: {
    resizeMode: 'contain',
    width: '4%',
    marginHorizontal: 5,
  },
  labelFilter: {
    borderBottomWidth: 2,
    borderBottomColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  sort: {
    minWidth: '40%',
    backgroundColor: '#F0F0F0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    borderRadius: 10,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: height / 14,
  },
  itemContainer: {
    marginVertical: 10,
    shadowColor: '#000',
    marginHorizontal: 20,

    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  textSort: {fontWeight: '400', color: '#262627', marginVertical: 10},
  textTitle: {fontWeight: '900', color: '#3A4144'},
  progressContain: {
    borderRadius: 32,
    width: '90%',
    backgroundColor: '#EDEDED',
  },
  subItem: {
    flexDirection: 'row',
    flex: 1,
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  subContain: {
    borderTopWidth: 1,
    borderTopColor: '#EBEBEB',
    marginVertical: 5,
  },
  textLabel: {fontWeight: 'bold', alignSelf: 'center', color: 'black'},
});
