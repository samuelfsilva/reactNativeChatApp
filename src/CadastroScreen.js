import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function CadastroScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  let emailInput = null;
  let senhaInput = null;
  let confirmaSenhaInput = null;

  function validar(user) {
    if (!user.email.length) {
      alert('Informe um email');
      emailInput.focus();
      return false;
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(user.email)) {
      alert('Informe um email válido');
      emailInput.focus();
      return false;
    }
    if (!user.senha.length) {
      alert('Informe uma senha');
      senhaInput.focus();
      return false;
    }
    if (user.senha.length < 6) {
      alert('A senha deve ter no mínimo 6 caracteres');
      senhaInput.focus();
      return false;
    }
    if (!user.confirmaSenha.length) {
      alert('Informe a confirmação de senha');
      confirmaSenhaInput.focus();
      return false;
    }
    if (user.senha !== user.confirmaSenha) {
      alert('A senha não pode ser diferente da confirmação');
      confirmaSenhaInput.focus();
      return false;
    }

    return true;
  }

  async function cadastro(user) {
    if (!validar(user)) {
      return;
    }
    try {
      const registro = await auth().createUserWithEmailAndPassword(
        user.email,
        user.senha,
      );
      if (registro) {
        /* const persiste = await auth().setPersistence(
          auth.Auth.Persistence.LOCAL,
        );
        console.log(persiste);
        if (persiste) {
          await auth().signInWithEmailAndPassword(user.email, user.senha);
          navigation.navigate('Login');
        } */
        navigation.navigate('Login');
      }
    } catch (e) {
      alert('Não foi possível realizar o cadastro.');
      console.log(e);
    }
  }

  function telaLogin() {
    navigation.navigate('Login');
  }
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.tela}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.entrada}
          placeholder={'E-mail'}
          onChangeText={text => {
            setEmail(text);
          }}
          value={email}
          returnKeyType="next"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          ref={input => {
            emailInput = input;
          }}
          onSubmitEditing={() => senhaInput.focus()}
        />
        <TextInput
          style={styles.entrada}
          placeholder={'Senha'}
          onChangeText={text => {
            setSenha(text);
          }}
          value={senha}
          ref={input => {
            senhaInput = input;
          }}
          onSubmitEditing={() => confirmaSenhaInput.focus()}
          returnKeyType="next"
          secureTextEntry
        />
        <TextInput
          style={styles.entrada}
          placeholder={'Confirmar Senha'}
          onChangeText={text => {
            setConfirmaSenha(text);
          }}
          value={confirmaSenha}
          ref={input => {
            confirmaSenhaInput = input;
          }}
          returnKeyType="go"
          secureTextEntry
        />
        <Button
          title="Cadastrar"
          color="#2FB171"
          onPress={() => cadastro({email, senha, confirmaSenha})}
        />
        <View style={styles.cadastroContainer}>
          <Text>Já é cadastrado? </Text>
          <TouchableOpacity onPress={() => telaLogin()}>
            <Text style={styles.criarConta}>Entrar na conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#FFF',
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
