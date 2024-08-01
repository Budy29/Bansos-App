import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    // Import Alert
} from 'react-native';
import Akun from '../asset/Icon/login.svg';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../store/BansosStore'; // import the store
import Allert from '../componenet/allert';
import Eye from '../asset/Icon/Eye.svg';
import EyeLock from '../asset/Icon/Hide.svg';
const App = () => {
    const navigation = useNavigation();
    const handleLogin = useAuthStore(state => state.handleLogin);
    const loading = useAuthStore(state => state.loading);
    const message = useAuthStore(state => state.message);
    const token = useAuthStore(state => state.accessToken);
    const msg = useAuthStore(state => state.message);


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {

        if (token) {
            setLoading(true);
            setTimeout(() => {

                if (username === 'Admin') {
                    console.log('Navigating to HomeAdm');
                    navigation.navigate('HomeAdm');
                } else if (username === 'admin') {
                    console.log('Navigating to HomeUsr');
                    navigation.navigate('HomeAdm');
                } else {
                    navigation.navigate('HomeUsr')
                }
            }, 2000)
        }
    }, [token, navigation]);



    const onLoginPress = async () => {
        await handleLogin(username, password);
    };
    return (
        <View style={{ flex: 1, padding: 10 }}>
            <View style={{ backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 10, justifyContent: 'center', paddingTop: '40%' }}>
                <View style={{ paddingVertical: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Akun />
                    <Text style={{ color: '#000', fontSize: 26, fontWeight: '900', marginTop: 26 }}>LOGIN</Text>
                </View>
                {msg === '' ? (
                    <View>
                        <Text></Text>
                    </View>
                ) : (
                    <Allert />
                )}
                <View>
                    <TextInput
                        placeholder='NIK'
                        style={{
                            borderWidth: 1,
                            borderColor: '#000',
                            marginBottom: 20,
                            borderRadius: 4,
                            paddingLeft: 20,
                            color: '#000',
                            fontSize: 16,
                            fontWeight: '700'
                        }}
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        placeholder='Password'
                        style={{
                            borderWidth: 1,
                            borderColor: '#000',
                            marginBottom: 20,
                            borderRadius: 4,
                            paddingLeft: 20,
                            color: '#000',
                            fontSize: 16,
                            fontWeight: '700'
                        }}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility} style={{ position: 'relative', top: '-33%', left: '0%', justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: 20 }}>
                        {showPassword ? (
                            <Eye />
                        ) : (
                            <EyeLock />
                        )}
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={onLoginPress}
                    style={{
                        backgroundColor: '#000',
                        width: '100%',
                        paddingVertical: 16,
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 14 }}>
                            Masuk
                        </Text>
                    )}
                </TouchableOpacity>
            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 100 }}>
                <Text style={{ color: '#000' }}>Belum Punya Akun?</Text>
                <TouchableOpacity style={{ marginLeft: 2 }} onPress={() => navigation.navigate('Daftar')}>
                    <Text style={{ color: '#346DC2' }}>Daftar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default App;
