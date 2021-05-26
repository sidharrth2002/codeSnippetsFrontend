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
import { ReduxStateInterface } from './reducers/authReducer';
import thunk from 'redux-thunk';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const middleware = applyMiddleware(thunk)
  const store = createStore(authReducer, middleware);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ReduxProvider store={store}>
        <PaperProvider>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </PaperProvider>
      </ReduxProvider>
    );
  }
}
