import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icon, Header} from 'react-native-elements';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
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

export default function ContatosScreen({navigation}) {
  const [contatos, setContatos] = useState({});

  useEffect(() => {
    try {
      const userId = auth().currentUser.uid;
      database()
        .ref(`/usuarios/${userId}/contatos`)
        .once('value', function(snapshot) {
          setContatos(snapshot.val());
          console.log('consulta');
        });
    } catch (e) {
      console.log('Erro ao conectar com o banco.');
    }
  });

  const abrirDrawer = () => {
    navigation.openDrawer();
  };

  const renderLinha = contato => {
    const {photoURI, nome} = contato.item;
    return (
      <View style={styles.item}>
        <View style={styles.itemContato}>
          <Image style={styles.userPhoto} source={{uri: photoURI}} />
          <View style={styles.subItem}>
            <Text style={styles.userNome}>{nome}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderLista = function() {
    return (
      <FlatList
        data={contatos}
        keyExtractor={item => item.id.toString()}
        renderItem={renderLinha}
      />
    );
  };

  const renderVazio = function() {
    return (
      <View style={styles.listaVazia}>
        <Text style={styles.textoListaVazia}>Nenhum contato cadastrado.</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.tela}>
      <HeaderComponent botaoMenu={abrirDrawer} title="CONTATOS" />
      {contatos.length > 0 ? renderLista() : renderVazio()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemContato: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  item: {
    flexDirection: 'column',
  },
  subItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    borderColor: '#ecf0f1',
    borderBottomWidth: 1,
    marginRight: 15,
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginRight: 20,
    marginLeft: 10,
    marginVertical: 5,
  },
  userNome: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
  },
  listaVazia: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoListaVazia: {
    fontSize: 18,
    fontWeight: '400',
    color: 'gray',
  },
  menuIcon: {
    marginLeft: 15,
  },
});
