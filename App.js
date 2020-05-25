import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

/* Telas */
import LoginScreen from './src/LoginScreen';
import CadastroScreen from './src/CadastroScreen';
import ContatosScreen from './src/ContatosScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: 'Login'}}
        />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Contatos" component={ContatosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
