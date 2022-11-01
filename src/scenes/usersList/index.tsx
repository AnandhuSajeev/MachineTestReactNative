/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, Dispatch} from '../../store';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {UserStackParams, User} from '../../types';
import {getUniqueColor} from '../../helpers/commonHelpers';
import {Colors} from '../../style/colors';

type UserListProp = NativeStackNavigationProp<UserStackParams, 'UserList'>;

const UsersList: FC = () => {
  const dispatch = useDispatch<Dispatch>();
  const userState = useSelector((state: RootState) => state.user);

  const [loading, setLoading] = useState(false);
  const {user} = dispatch;
  const {getUsers} = user;
  const {users, count, page} = userState;

  useEffect(() => {
    _init();
  }, []);

  const _init = async () => {
    await getUsers({pageNo: 1});
  };

  const _getUsers = async () => {
    await getUsers({pageNo: page + 1});
  };

  const navigation = useNavigation<UserListProp>();

  //Pagination call
  const onEndReached = () => {
    if (count > users.length) {
      _getUsers();
    }
  };

  const onRefresh = async () => {
    setLoading(true);
    await _init();
    setLoading(false);
  };

  //Should be separate component under component folder
  const _renderItem = ({item}: ListRenderItemInfo<User>) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('UserProfile', {id: item?.id});
        }}>
        <View
          style={[styles.listItemView, {backgroundColor: getUniqueColor()}]}>
          <Image source={{uri: item.avatar}} style={styles.imageStyle} />
          <View style={styles.profileDetailContainer}>
            <Text style={styles.textStyle}>
              {item.first_name.toUpperCase()} {item.last_name.toUpperCase()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={onRefresh}
        refreshing={loading}
        data={users}
        renderItem={_renderItem}
        keyExtractor={(_, index) => index.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
      />
    </View>
  );
};

export default UsersList;

const styles = StyleSheet.create({
  container: {justifyContent: 'center', flex: 1},
  listItemView: {
    margin: 10,
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: Colors.purple,
    flexDirection: 'row',
  },
  textStyle: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileDetailContainer: {
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  imageStyle: {
    height: 140,
    width: 140,
    borderRadius: 10,
  },
});
