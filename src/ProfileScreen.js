import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Text,
  View,
  Button,
  StyleSheet,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import HeaderComponent from './components/HeaderComponent';
import auth from '@react-native-firebase/auth';

export default function ProfileScreen({navigation}) {
  const abrirDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView style={styles.tela}>
      <HeaderComponent botaoMenu={abrirDrawer} title="PROFILE" />
      <Text>Bem vindo, {auth().currentUser.email}</Text>
      <Button
        title="Sair da Conta"
        onPress={() => {
          auth().signOut();
          navigation.pop();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
  },
});
