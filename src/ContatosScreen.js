import React, {useState, useEffect} from 'react';
import {Text, View, Button, StyleSheet, FlatList, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function ContatosScreen({navigation}) {
  const [contatos, setContatos] = useState({});
  const data = [
    {
      id: 1,
      photoURI:
        'https://imgix.bustle.com/uploads/image/2018/5/9/fa2d3d8d-9b6c-4df4-af95-f4fa760e3c5c-2t4a9501.JPG',
      nome: 'João',
    },
    {
      id: 2,
      photoURI:
        'https://imgix.bustle.com/uploads/image/2018/5/9/fa2d3d8d-9b6c-4df4-af95-f4fa760e3c5c-2t4a9501.JPG',
      nome: 'Carlos',
    },
    {
      id: 3,
      photoURI:
        'https://imgix.bustle.com/uploads/image/2018/5/9/fa2d3d8d-9b6c-4df4-af95-f4fa760e3c5c-2t4a9501.JPG',
      nome: 'Maria',
    },
    {
      id: 4,
      photoURI:
        'https://imgix.bustle.com/uploads/image/2018/5/9/fa2d3d8d-9b6c-4df4-af95-f4fa760e3c5c-2t4a9501.JPG',
      nome: 'Valéria',
    },
    {
      id: 5,
      photoURI:
        'https://imgix.bustle.com/uploads/image/2018/5/9/fa2d3d8d-9b6c-4df4-af95-f4fa760e3c5c-2t4a9501.JPG',
      nome: 'Rosa',
    },
    {
      id: 6,
      photoURI:
        'https://imgix.bustle.com/uploads/image/2018/5/9/fa2d3d8d-9b6c-4df4-af95-f4fa760e3c5c-2t4a9501.JPG',
      nome: 'Rosa',
    },
    {
      id: 7,
      photoURI:
        'https://imgix.bustle.com/uploads/image/2018/5/9/fa2d3d8d-9b6c-4df4-af95-f4fa760e3c5c-2t4a9501.JPG',
      nome: 'Rosa',
    },
    {
      id: 8,
      photoURI:
        'https://imgix.bustle.com/uploads/image/2018/5/9/fa2d3d8d-9b6c-4df4-af95-f4fa760e3c5c-2t4a9501.JPG',
      nome: 'Rosa',
    },
    {
      id: 9,
      photoURI:
        'https://imgix.bustle.com/uploads/image/2018/5/9/fa2d3d8d-9b6c-4df4-af95-f4fa760e3c5c-2t4a9501.JPG',
      nome: 'Rosa',
    },
    {
      id: 10,
      photoURI:
        'https://imgix.bustle.com/uploads/image/2018/5/9/fa2d3d8d-9b6c-4df4-af95-f4fa760e3c5c-2t4a9501.JPG',
      nome: 'Rosa',
    },
  ];
  useEffect(() => {
    const userId = auth().currentUser.userId;
    const contato = database().ref(`/usuarios/${userId}/contatos`);
    contato.on('value', snapshot => {
      setContatos(snapshot.val());
      console.log(snapshot.val());
    });
  });

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

  return (
    <SafeAreaView style={styles.tela}>
      <Text>Bem vindo, {auth().currentUser.email}</Text>
      <Button
        title="Sair"
        onPress={() => {
          auth().signOut();
          navigation.pop();
        }}
      />
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={renderLinha}
      />
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
});
