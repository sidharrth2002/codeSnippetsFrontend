import { StackScreenProps } from '@react-navigation/stack'
import * as React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { RootStackParamList } from '../types'
import { Text } from '../components/Themed';
import { useDispatch, useSelector } from 'react-redux'
import { ReduxStateInterface } from '../reducers/authReducer'
import { gql, useMutation, useQuery } from '@apollo/client'
import * as SecureStore from 'expo-secure-store';

interface LoginInput {
  email: string;
  password: string;  
}

interface UserData {
  id: number,
  name: string,
  email: string,
  accessToken: string
}

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(
      email: $email,
      password: $password
    ) {
      id
      name
      email
      accessToken
    } 
  } 
`

export default function LoginScreen({
    navigation,
}: StackScreenProps<RootStackParamList, 'Login'>) {
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [redirect, setRedirect] = React.useState(false);
    const [credentialsError, setCredentialsError] = React.useState(false);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: ReduxStateInterface) => state.isAuthenticated);

    React.useEffect(() => {
      if(isAuthenticated) {
        navigation.replace('Root');
      }
    }, [])

    React.useEffect(() => {
        if(redirect) {
            navigation.replace('Root');
        }
    }, [redirect])

    const [loginUser, { error, data }] = useMutation<
      UserData,
      LoginInput
      >(LOGIN, {
        variables: { email, password }
    });

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
  {/* <TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
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
