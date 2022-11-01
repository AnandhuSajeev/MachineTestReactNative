/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect, useLayoutEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {UserStackParams, DrawerStackParams} from '../../types';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../store';
import Loader from '../../common/loader';
import {Colors} from '../../style/colors';

type Props = CompositeScreenProps<
  NativeStackScreenProps<UserStackParams, 'UserProfile'>,
  DrawerScreenProps<DrawerStackParams>
>;

const UsersList: FC<Props> = ({route, navigation}) => {
  const dispatch = useDispatch<Dispatch>();
  const userState = useSelector((state: RootState) => state.user);
  const {user} = dispatch;
  const {getUserDetail, clearUser} = user;
  const {currentUser} = userState;
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <View />,
    });
  });

  useEffect(() => {
    _init();
    return () => {
      clearUser();
    };
  }, []);

  const _init = async () => {
    setLoading(true);
    await getUserDetail({id: route.params.id});
    setLoading(false);
  };

  return (
    <Loader loading={loading} loaderColor={Colors.loaderColor}>
      <View style={styles.container}>
        <Image source={{uri: currentUser?.avatar}} style={styles.imageStyle} />
        <Text style={styles.textStyle2}>
          {currentUser?.first_name} {currentUser?.last_name}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={styles.textStyle}>Back To list</Text>
        </TouchableOpacity>
      </View>
    </Loader>
  );
};

export default UsersList;

const styles = StyleSheet.create({
  container: {alignItems: 'center', flex: 1, paddingHorizontal: 20},
  imageStyle: {
    height: Dimensions.get('window').height / 3,
    width: '100%',
    margin: 20,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Colors.white,
  },
  button: {
    backgroundColor: Colors.lightgreen,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.white,
  },
  textStyle2: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.skyblue,
  },
});
