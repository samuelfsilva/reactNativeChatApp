import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Image,
} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import database from '../database/database';
import { concat } from 'react-native-reanimated';

export default function ChatScreen({route, navigation}) {
    const {uid} = route.params;
    return (
        <View>
            <Text>{uid}</Text>
        </View>
    );
}
