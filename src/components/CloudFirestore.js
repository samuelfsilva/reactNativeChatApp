import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const CloudFirestore = async () => {
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
};

export default CloudFirestore;
