import 'react-native-gesture-handler';
import React from 'react';
import { YellowBox, StatusBar } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import './config/ReactotronConfig';

import { store, persistor } from './store';
import App from './App';

YellowBox.ignoreWarnings(['Warning: componentWill']);

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffff" />
        <App />
      </PersistGate>
    </Provider>
  );
}
