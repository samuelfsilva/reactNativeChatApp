import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Avatar} from 'react-native-elements';
import {
  Text,
  View,
  Button,
  StyleSheet,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import database from '../database/database';

export default function ProfileScreen({navigation}) {
  const [usuario, setUsuario] = useState({});

  async function getData() {
    const user = await database.userAuth();
    setUsuario(user);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.tela}>
      {/* <HeaderComponent botaoMenu={abrirDrawer} title="PROFILE" /> */}
      <HeaderComponent {...navigation} title="PROFILE" />
      <Text>Bem vindo, {usuario.email}</Text>
      <Button
        title="Sair da Conta"
        onPress={() => {
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
