import React from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {useDispatch} from 'react-redux';
import {Dispatch} from '../../store';

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const dispatch = useDispatch<Dispatch>();

  const {auth} = dispatch;
  const {onLogout} = auth;
  return (
    <DrawerContentScrollView {...props}>
      {/* To list the pages under drawer navigation by default */}
      {/* <DrawerItemList {...props} /> */}
      <DrawerItem
        label="Logout"
        onPress={() => {
          props.navigation.closeDrawer();
          onLogout();
        }}
      />
    </DrawerContentScrollView>
  );
}
