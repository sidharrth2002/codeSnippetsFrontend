import { StackScreenProps } from '@react-navigation/stack'
import * as React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import { RootStackParamList } from '../types'
import { Text } from '../components/Themed';
import { useSelector } from 'react-redux'
import { ReduxStateInterface } from '../reducers/authReducer'

export default function LoginScreen({
    navigation,
}: StackScreenProps<RootStackParamList, 'Login'>) {
    const [redirect, setRedirect] = React.useState(false);
    const isAuthenticated = useSelector((state: ReduxStateInterface) => state.isAuthenticated);

    React.useEffect(() => {
        if(redirect) {
            navigation.replace('Root');
        }
    }, [redirect])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to App Snippets</Text>
      <View>
      <TextInput
        style={styles.textInput}
        label="Email"
        value={""}
    //   onChangeText={text => setText(text)}
        />
        <TextInput
            style={styles.textInput}
            label="Password"
            value={""}
    //   onChangeText={text => setText(text)}
        />
      </View>
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
});
