import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { colors } from '~/styles';

// Sign
import Sign from '~/pages/Sign';
// App
import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import Detail from '~/pages/Detail';
import Problem from '~/pages/Problem';
import Visualization from '~/pages/Visualization';
import Confirmation from '~/pages/Confirmation';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function Routes({ signed }) {
  function DeliveryStack() {
    return (
      <Stack.Navigator headerMode="float">
        <Stack.Screen
          options={{ title: 'Entregas', headerShown: false }}
          name="Delivery"
          component={Dashboard}
        />
        <Stack.Screen
          options={{
            title: 'Detalhes da encomenda',
          }}
          name="Details"
          component={Detail}
        />
        <Stack.Screen
          options={{
            title: 'Informar Problemas',
          }}
          name="Problem"
          component={Problem}
        />
        <Stack.Screen
          options={{
            title: 'Visualizar problemas',
          }}
          name="Visualization"
          component={Visualization}
        />
        <Stack.Screen
          options={{
            title: 'Confirmar entrega',
          }}
          name="Confirmation"
          component={Confirmation}
        />
      </Stack.Navigator>
    );
  }
  return (
    <NavigationContainer>
      {!signed ? (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Sign" component={Sign} />
        </Stack.Navigator>
      ) : (
        <BottomTab.Navigator
          headerMode="none"
          screenOptions={({ route }) => ({
            tabBarIcon: icons => {
              const { color, size } = icons;
              let iconName;
              if (route.name === 'Deliveries') {
                iconName = 'menu';
              } else if (route.name === 'Profile') {
                iconName = 'account-circle';
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: colors.primary,
            inactiveTintColor: '#999999',
          }}
        >
          <BottomTab.Screen
            options={{ title: 'Entregas' }}
            name="Deliveries"
            component={DeliveryStack}
          />
          <BottomTab.Screen
            options={{ title: 'Meu Perfil' }}
            name="Profile"
            component={Profile}
          />
        </BottomTab.Navigator>
      )}
    </NavigationContainer>
  );
}

Routes.propTypes = {
  signed: PropTypes.bool.isRequired,
};
