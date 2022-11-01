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
import {useNavigation} from '@react-navigation/native';
import {MainStackParams} from '../../types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Loader from '../../common/loader';
import {Colors} from '../../style/colors';

type RegisterScreenNavigationProps = NativeStackNavigationProp<
  MainStackParams,
  'Register'
>;

const Register = () => {
  const navigation = useNavigation<RegisterScreenNavigationProps>();
  const dispatch = useDispatch<Dispatch>();

  const {auth} = dispatch;
  const {register} = auth;

  const [loading, setLoading] = React.useState(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = async () => {
    setLoading(true);
    const res = await register({
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    });
    if (res.status === 'success') {
      navigation.navigate('Login');
    }
    setLoading(false);
  };
  return (
    <Loader loading={loading} loaderColor={Colors.loaderColor}>
      <View style={styles.container}>
        <TextInput
          placeholder="Enter your first name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Enter your last name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.textInput}
        />
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
            if (firstName && lastName && email && password) {
              onSubmit();
            } else {
              Alert.alert('Please fill all the data');
            }
          }}>
          <Text style={styles.loginTextStyle}>Log in</Text>
        </TouchableOpacity>
      </View>
    </Loader>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {alignItems: 'center', justifyContent: 'center', flex: 1},
  textInput: {
    width: '80%',
    height: 40,
    borderRadius: 6,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 5,
  },
  buttonStyle: {
    width: '80%',
    backgroundColor: 'purple',
    height: 40,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  loginTextStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
});
