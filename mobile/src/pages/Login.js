//KeyboardAvoidingView  serve pra não deiar o teclado do ios passar por cima de campos importantes como o campo que estamos preenchendo no momento, no andoid isso é automatico, não precisa do KeyboardAvoidingView.  Platform serve pra reconhecer o sistema do usuario e retorna dentro da variavel OS.
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { KeyboardAvoidingView , Platform, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ navigation }) {
    const [user, setUser] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('Main', { user })
            }
        })
    }, []);

    async function handleLogin() {
        const response = await api.post('/devs', { username: user });

        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);

        navigation.navigate('Main', { user: _id });
    }

    return(
        <KeyboardAvoidingView 
            behavior="padding"
            enabled={Platform.OS == 'ios'}
            style={styles.container}>

                <Image source={logo}></Image>

                <TextInput 
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Digite seu usuário do Github"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={user}
                    onChangeText={setUser}>
                </TextInput>

                <TouchableOpacity onPress={ handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },

    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15,
    },

    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#DF4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});