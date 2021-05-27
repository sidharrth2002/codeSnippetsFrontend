import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider, useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux'
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { createStore, applyMiddleware } from 'redux';
import { authReducer } from './reducers/authReducer';
import thunk from 'redux-thunk';
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink  } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import * as SecureStore from 'expo-secure-store';

const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:4000/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = SecureStore.getItemAsync('accessToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const middleware = applyMiddleware(thunk)
  const store = createStore(authReducer, middleware);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
        <ReduxProvider store={store}>
          <PaperProvider>
            <SafeAreaProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </SafeAreaProvider>
          </PaperProvider>
        </ReduxProvider>
      </ApolloProvider>
    );
  }
}

AppRegistry.registerComponent('CodeSnippets', () => App);