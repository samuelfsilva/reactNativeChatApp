import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

var currentUser;

const database = {
  async userAuth() {
    if (currentUser) {
      return currentUser;
    }
    else {
      currentUser = await auth().currentUser;
      return currentUser;
    }
  },
  async userData() {
    try {
      this.userAuth();
      const usersCollection = await firestore()
        .collection('usuarios')
        .doc(currentUser.uid);

      return usersCollection;
    } catch (e) {
      console.log('Erro no componente.');
      console.log(e);
    }
  },
  async userTalks() {
    try {
      this.userAuth();
      var userTalks = firestore()
        .doc(`conversas/${currentUser.uid}`)
        .collection('linhas');

      return userTalks;
    } catch (e) {
      console.log('Erro no componente.');
      console.log(e);
    }
  },
};

export default database;
