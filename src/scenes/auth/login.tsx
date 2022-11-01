import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

import {useDispatch} from 'react-redux';
import {Dispatch} from '../../store';
import {Colors} from '../../style/colors';

const Login = () => {
  const dispatch = useDispatch<Dispatch>();

  const {auth} = dispatch;
  const {onLogin} = auth;

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = async () => {
    await onLogin({
      email: email,
      password: password,
    });
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={styles.textInput}
      />
      <TextInput
        secureTextEntry
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        style={styles.textInput}
      />
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          //Simple Validation FOR DEMO, Should use  Redux Form or formik like libraries in real scenarios
          if (email && password) {
            onSubmit();
          } else {
            Alert.alert('Please fill all the data');
          }
        }}>
        <Text style={styles.loginTextStyle}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {alignItems: 'center', justifyContent: 'center', flex: 1},
  textInput: {
    width: '80%',
    height: 40,
    borderRadius: 6,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.gray,
    marginVertical: 5,
  },
  buttonStyle: {
    width: '80%',
    backgroundColor: Colors.purple,
    height: 40,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  loginTextStyle: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '700',
  },
});
