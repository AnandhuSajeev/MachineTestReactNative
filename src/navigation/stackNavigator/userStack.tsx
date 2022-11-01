import * as React from 'react';

import {UserStackParams} from '../../types';

import UserList from '../../scenes/usersList';
import UserProfile from '../../scenes/userProfile';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const UserStack = createNativeStackNavigator<UserStackParams>();

//User Stack screens
export default function UserStackNavigator() {
  return (
    <UserStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="UserList">
      <UserStack.Screen name="UserList" component={UserList} />
      <UserStack.Screen name="UserProfile" component={UserProfile} />
    </UserStack.Navigator>
  );
}
