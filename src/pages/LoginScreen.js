import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  let emailInput = null;
  let senhaInput = null;

  navigation.setOptions({
    title: 'Login',
    drawerLockMode: 'locked-closed',
  });

  useEffect(() => {
    isLogged();
  });

  function isLogged() {
    if (auth().currentUser) {
      navigation.replace('Home');
    }
  }

  function validar(user) {
    if (!user.email.length) {
      Alert.alert('Informação', 'Email não inserido.');
      emailInput.focus();
      return false;
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(user.email)) {
      Alert.alert('Informação', 'O email inserido não é válido.');
      emailInput.focus();
      return false;
    }
    if (!user.senha.length) {
      Alert.alert('Informação', 'Senha não inserida.');
      senhaInput.focus();
      return false;
    }
    if (user.senha.length < 6) {
      Alert.alert('Informação', 'A senha deve ter no mínimo 6 caracteres.');
      senhaInput.focus();
      return false;
    }

    return true;
  }

  async function login(user) {
    if (!validar(user)) {
      return;
    }
    try {
      const autentica = await auth().signInWithEmailAndPassword(
        user.email,
        user.senha,
      );
      if (autentica) {
        navigation.replace('Home');
      }
    } catch (e) {
      Alert.alert('Informação', 'Email ou senha incorretos.');
      emailInput.focus();
    }
  }
  function telaCadastro() {
    navigation.navigate('Cadastro');
  }
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.tela}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/images/logo.png')}
        />
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.entrada}
          placeholder={'E-mail'}
          onChangeText={text => setEmail(text)}
          ref={input => {
            emailInput = input;
          }}
          value={email}
          returnKeyType="next"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={() => senhaInput.focus()}
        />
        <TextInput
          style={styles.entrada}
          placeholder={'Senha'}
          onChangeText={text => setSenha(text)}
          value={senha}
          ref={input => {
            senhaInput = input;
          }}
          returnKeyType="go"
          secureTextEntry
        />
        <Button
          title="Login"
          color="#2FB171"
          onPress={() => {
            login({email, senha});
          }}
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
