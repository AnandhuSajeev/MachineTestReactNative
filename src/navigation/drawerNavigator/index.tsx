import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {DrawerStackParams} from '../../types';

import UserStack from '../stackNavigator/userStack';

import {CustomDrawerContent} from './customDrawer';

const Drawer = createDrawerNavigator<DrawerStackParams>();

function DrawerNavigator() {
  return (
    // Drawer screen
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'front',
      }}
      initialRouteName="UserStack"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="UserStack" component={UserStack} />
    </Drawer.Navigator>
  );
}
export default DrawerNavigator;
