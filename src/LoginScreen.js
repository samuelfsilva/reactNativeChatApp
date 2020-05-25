import React, { useState } from 'react';
import { Text, View, TextInput, Button, Image, KeyboardAvoidingView, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
    const [ email, setEmail ] = useState("");
    const [ senha, setSenha ] = useState("");
    let senhaInput = null;

    function login() {
        console.log('Login')
    }
    function telaCadastro() {
        navigation.navigate('Cadastro')
    }
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.tela}>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require('../assets/logo.png')}
                />
            </View>
            <View style={styles.form}>
                <TextInput 
                    style={styles.entrada}
                    placeholder={'E-mail'}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    returnKeyType='next'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onSubmitEditing={() => senhaInput.focus()}
                />
                <TextInput 
                    style={styles.entrada}
                    placeholder={'Senha'}
                    onChangeText={(text) => setSenha(text)}
                    value={senha}
                    ref={(input) => {senhaInput = input}}
                    returnKeyType='go'
                    secureTextEntry
                />
                <Button
                    title="Login"
                    color="#2FB171"
                    onPress={() => login()}
                />
                <View style={styles.cadastroContainer}>
                    <Text>Não é cadastrado? </Text>
                    <TouchableOpacity onPress={() => telaCadastro()}>
                        <Text style={styles.criarConta}>Criar conta</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    logoContainer: {
        alignItems: 'center',
        marginVertical: 40,
    },
    logo: {
        width: 100,
        height: 100,
    },
    form: {
        justifyContent: 'center',
        marginHorizontal: 50,
    },
    entrada: {
        width: 250,
        height: 50,
        fontSize: 17,
        borderBottomWidth: 2,
        marginBottom: 30,
    },
    cadastroContainer: {
        flexDirection: 'row',
        marginTop: 18,
        justifyContent: 'center',
    },
    criarConta: {
        color: 'red',
    },
});