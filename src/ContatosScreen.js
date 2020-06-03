import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Image,
} from 'react-native';
import HeaderComponent from './components/HeaderComponent';
import CloudFirestore from './components/CloudFirestore';

export default function ContatosScreen({navigation}) {
  const [contatos, setContatos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async function() {
    try {
      const usuarioContatos = (await CloudFirestore()).collection('contatos');
      usuarioContatos.onSnapshot(documentSnapshot => {
        var snapDocs = documentSnapshot.docs;

        const getItems = snapDocs.map(docs => {
          var ref = docs.data().usuario;
          return ref.get();
        });

        Promise.all(getItems).then(docs => {
          var lista = [];
          docs.map(values => {
            lista.push(values.data());
          });
          setContatos(lista);
          setCarregando(false);
        });
      });
    } catch (e) {
      console.log('Error ao receber dados.', e);
    }
  };

  const abrirDrawer = () => {
    navigation.openDrawer();
  };

  const renderLinha = ({item}) => {
    try {
      var contato = item;
      var {photoURI = '', nome = 'Carregando...'} = contato;

      return (
        <View style={styles.item}>
          <View style={styles.itemContato}>
            <Image
              style={styles.userPhoto}
              source={
                photoURI.length > 0
                  ? {uri: photoURI}
                  : require('../assets/profile.png')
              }
            />
            <View style={styles.subItem}>
              <Text style={styles.userNome}>{nome}</Text>
            </View>
          </View>
        </View>
      );
    } catch (e) {
      console.log(e);
    }
  };

  const renderLista = function() {
    return (
      <FlatList
        data={contatos}
        keyExtractor={item => item.email}
        renderItem={renderLinha}
        refreshControl={
          <RefreshControl refreshing={carregando} onRefresh={getData} />
        }
      />
    );
  };

  const renderMensagem = function(mensagem) {
    return (
      <View style={styles.listaVazia}>
        <Text style={styles.textoListaVazia}>{mensagem}</Text>
      </View>
    );
  };

  if (carregando) {
    return (
      <SafeAreaView style={styles.tela}>
        <HeaderComponent botaoMenu={abrirDrawer} title="CONTATOS" />
        {renderMensagem('Carregando...')}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.tela}>
      <HeaderComponent botaoMenu={abrirDrawer} title="CONTATOS" />
      {contatos.length > 0
        ? renderLista()
        : renderMensagem('Nenhum contato encontrado.')}
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
