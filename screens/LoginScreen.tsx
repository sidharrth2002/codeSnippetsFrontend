import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { RootStackParamList } from '../types'
import { Text } from '../components/Themed';
import { useDispatch, useSelector } from 'react-redux'
import { ReduxStateInterface } from '../reducers/authReducer'
import { useMutation } from '@apollo/client'
import * as SecureStore from 'expo-secure-store';
import { LoginInput, UserData } from '../types'
import { LOGIN } from '../graphQLQueries'

export default function LoginScreen({
    navigation,
}: StackScreenProps<RootStackParamList, 'Login'>) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [redirect, setRedirect] = useState(false);
    const [credentialsError, setCredentialsError] = useState(false);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: ReduxStateInterface) => state.isAuthenticated);

    useEffect(() => {
      if(isAuthenticated) {
        navigation.replace('Root');
      }
    }, [])

    useEffect(() => {
        if(redirect) {
            navigation.replace('Root');
        }
    }, [redirect])

    const [loginUser, { error, data }] = useMutation<UserData,LoginInput>(LOGIN, 
      {
        variables: { email, password }
      }
    );

    useEffect(() => {
      if(error !== undefined) {
        console.log(JSON.stringify(error, null, 2));
      }
    }, [error])


    if(error) {
      console.log(error);
    }

    React.useEffect(() => {
      if(data) {
        console.log(data);
        if(data.login) {
          console.log(data.login);
          dispatch({
            type: 'LOGIN',
            payload: data.login
          })
          SecureStore.setItemAsync('accessToken', data.accessToken);
          setRedirect(true);
        } else {
          console.log('Wrong Credentials');
          setCredentialsError(true);
        }
      }  
    }, [data])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to App Snippets</Text>
      <View>
      <TextInput
        style={styles.textInput}
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
        <TextInput
            style={styles.textInput}
            label="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
        />
      </View>
      {
        credentialsError==true ? 
        <Text>Wrong Credentials</Text>    
        : 
        <Text></Text>    
      }
      <Button style={styles.submitButton} mode="contained" onPress={() => {
        loginUser();
      }}>
        Login
      </Button>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  textInput: {
    marginTop: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  submitButton: {
    marginTop: 20
  }
});
