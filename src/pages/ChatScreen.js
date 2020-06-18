import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  FlatList,
  RefreshControl,
  Image,
} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import database from '../database/database';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ChatScreen({route, navigation}) {
    const [texto, setTexto] = useState('');
    const {uid, photoURI, nome} = route.params;

    useEffect(() => {
        getData();
      }, []);

    const getData = async function() {
        var mensagens = (await database.userTalks()).doc(uid).collection('mensagens');
        mensagens.onSnapshot(queryDocuments => {
            queryDocuments.forEach(values => {
                console.log(values.data().mensagem);
            });
        });
    };

    return (
        <View style={styles.constainer}>
            <View style={styles.cabecalho}>
                <View style={styles.photo}>
                    <TouchableOpacity style={styles.voltar} onPress={() => {navigation.goBack()}}>
                        <Icon name='arrow-back' />
                        <Image style={styles.userPhoto} source={{uri: photoURI}} />
                    </TouchableOpacity>
                    <Text style={styles.nome}>{nome}</Text>
                </View>
            </View>
            <View style={styles.chat}>
                <View style={styles.texto}>
                    <TextInput
                        style={styles.entrada}
                        placeholder={'Digite uma mensagem...'}
                        onChangeText={text => {
                            setTexto(text);
                        }}
                        value={texto}
                        autoCorrect={false}
                    />
                    <Icon reverse name='send' color='#2FB171' />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
    },
    cabecalho: {
        height: 60,
        backgroundColor: '#2FB171',
        justifyContent: 'center',
    },
    chat: {
        flex: 1,
        backgroundColor: 'white',
    },
    userPhoto: {
        width: 40,
        height: 40,
        borderRadius: 40,
    },
    photo: {
        marginLeft: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    voltar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nome : {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
    },
    texto: {
        borderColor: 'gray',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    entrada: {
        flex: 1,
        fontSize: 16,
    },
});