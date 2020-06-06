import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const database = {
  async userAuth() {
    return await auth().currentUser;
  },
  async userData() {
    try {
      const currentUser = await auth().currentUser;
      const usersCollection = await firestore()
        .collection('usuarios')
        .doc(currentUser.uid);

      return usersCollection;
    } catch (e) {
      console.log('Erro no componente.');
      console.log(e);
    }
  },
};

export default database;
