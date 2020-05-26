import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function ContatosScreen({navigation}) {
  return (
    <View style={styles.tela}>
      <Text>Bem vindo, {auth().currentUser.email}</Text>
      <Button
        title="Sair"
        onPress={() => {
          auth().signOut();
          navigation.pop();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
