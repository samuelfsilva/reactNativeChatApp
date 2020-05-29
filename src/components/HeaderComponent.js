import React from 'react';
import {Header} from 'react-native-elements';
import {StyleSheet} from 'react-native';

export default function HeaderComponent(props) {
  const {botaoMenu, title} = props;
  return (
    <Header
      leftComponent={{icon: 'menu', onPress: botaoMenu, color: '#000'}}
      placement="left"
      centerComponent={{
        text: title,
        style: styles.centerComponent,
      }}
      containerStyle={styles.header}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#2FB171',
    justifyContent: 'space-around',
  },
  centerComponent: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
