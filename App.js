import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import DrawerContent from './src/components/DrawerContent';

/* Telas */
import LoginScreen from './src/pages/LoginScreen';
import CadastroScreen from './src/pages/CadastroScreen';
import ContatosScreen from './src/pages/ContatosScreen';
import ProfileScreen from './src/pages/ProfileScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Home() {
  return (
    <Drawer.Navigator
      initialRouteName="Contatos"
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Contatos" component={ContatosScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
