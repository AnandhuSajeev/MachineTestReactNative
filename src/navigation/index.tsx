/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {MainStackParams} from '../types';

import Login from '../scenes/auth/login';
import Register from '../scenes/auth/register';
import DrawerNavigator from './drawerNavigator';

import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../store';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Loader from '../common/loader';

const MainStack = createNativeStackNavigator<MainStackParams>();

export default function AppNavigator() {
  const dispatch = useDispatch<Dispatch>();

  const {auth} = dispatch;
  const {checkLogin} = auth;
  const authState = useSelector((state: RootState) => state.auth);
  const {isLoggedIn} = authState;

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    _checkLogin();
  }, []);

  const _checkLogin = async () => {
    await checkLogin();
    setLoading(false);
  };

  return (
    <Loader loading={loading} loaderColor={'blue'}>
      <NavigationContainer>
        <MainStack.Navigator>
          {isLoggedIn ? (
            <>
              {/* logged in stack */}
              <MainStack.Screen
                options={{headerShown: false}}
                name="Drawer"
                component={DrawerNavigator}
              />
            </>
          ) : (
            <>
              {/* Not logged in stack */}
              <MainStack.Screen name="Register" component={Register} />
              <MainStack.Screen name="Login" component={Login} />
            </>
          )}
        </MainStack.Navigator>
      </NavigationContainer>
    </Loader>
  );
}
