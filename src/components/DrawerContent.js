import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import {DrawerItem} from '@react-navigation/drawer';
import database from '../database/database';

export default function DrawerContent(props) {
  const [usuario, setUsuario] = useState({});
  const no_image_avatar =
    'https://firebasestorage.googleapis.com/v0/b/chat-ab87a.appspot.com/o/profile.png' +
    '?alt=media&token=ec119b25-0fee-4561-8dcc-53cac389b7f2';

  async function getData() {
    var user = await database.userData();
    var auth = await database.userAuth();
    console.log(auth);
    try {
      user.get().then(value => {
        console.log(value.data());
        setUsuario(value.data());
      });
    } catch (e) {
      console.log('Erro ao carregar dados.', e);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar
          rounded
          ImageComponent={() => {
            return (
              <View>
                <Image
                  source={{uri: usuario.photoURI}}
                  style={styles.imageAvatar}
                />
              </View>
            );
          }}
          size="large"
          overlayContainerStyle={styles.avatar}
        />
        <View style={styles.avatarDetalhes}>
        <Text style={styles.avatarNome}>{usuario.nome}</Text>
          <Text style={styles.avatarStatus}>{usuario.email}</Text>
        </View>
      </View>
      <View style={styles.listaMenu}>
        <DrawerItem
          icon={() => <Icon name="home" />}
          label="Início"
          labelStyle={styles.itemMenu}
          onPress={() => {
            props.navigation.navigate('Contatos');
          }}
        />
        <DrawerItem
          icon={() => <Icon name="person" />}
          label="Perfil"
          labelStyle={styles.itemMenu}
          onPress={() => {
            props.navigation.navigate('Profile');
          }}
        />
      </View>
      <DrawerItem
        icon={() => <Icon name="exit-to-app" color="white" />}
        label="Desconectar"
        labelStyle={[styles.itemMenu, styles.itemMenuSairTexto]}
        style={styles.itemMenuSair}
        onPress={() => {
          //props.navigation.navigate('Profile');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  avatar: {
    backgroundColor: 'green',
  },
  avatarContainer: {
    marginTop: 25,
    marginLeft: 10,
    marginBottom: 50,
    flexDirection: 'row',
  },
  imageAvatar: {
    height: 80,
  },
  avatarDetalhes: {
    marginTop: 15,
    marginLeft: 15,
  },
  avatarNome: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  avatarStatus: {
    color: 'gray',
    fontSize: 15,
  },
  listaMenu: {
    //backgroundColor: 'black',
    flexGrow: 1,
  },
  itemMenu: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
  },
  itemMenuSair: {
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 0,
    marginHorizontal: 0,
    marginBottom: 0,
  },
  itemMenuSairTexto: {
    color: 'white',
  },
});
