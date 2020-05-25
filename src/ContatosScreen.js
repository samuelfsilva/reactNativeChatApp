import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

export default function ContatosScreen({ navigation }) {
    return (
        <View style={styles.tela}>
          <Text>Tela de Contatos</Text>
          <Button
            title="Voltar"
            onPress={() =>
                navigation.pop()
            }
        />
        </View>
    );
}

const styles = StyleSheet.create({
    tela: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});