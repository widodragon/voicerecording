import React from 'react';
import {StatusBar} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import store from './redux/index';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';

import theme from './utils/Theme';
import Recording from './screens/Recording';
import Effects from './screens/Effects';
import Splash from './screens/Splash';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar hidden={true} />
        <PaperProvider theme={theme}>
          <Stack.Navigator initialRouteName={'splash'}>
            <Stack.Screen
              name="splash"
              component={Splash}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="record"
              component={Recording}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="effects"
              component={Effects}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  );
}
