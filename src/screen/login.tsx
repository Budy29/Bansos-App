import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Dimensions,
    StyleSheet,
} from 'react-native';
import Akun from '../asset/Icon/login.svg';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../store/BansosStore';
import Allert from '../componenet/allert';
import Eye from '../asset/Icon/Eye.svg';
import EyeLock from '../asset/Icon/Hide.svg';

const { width, height } = Dimensions.get('window');

const App = () => {
    const navigation = useNavigation();
    const handleLogin = useAuthStore(state => state.handleLogin);
    const loading = useAuthStore(state => state.loading);
    const token = useAuthStore(state => state.accessToken);
    const msg = useAuthStore(state => state.message);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        if (token) {
            if (username === 'Admin') {
                navigation.navigate('HomeAdm');
            } else if (username === 'admin') {
                navigation.navigate('HomeAdm');
            } else {
                navigation.navigate('HomeUsr')
            }
        }
    }, [token, navigation]);

    const onLoginPress = async () => {
        await handleLogin(username, password);
    };

    return (
        <View style={styles.container}>
            <View style={styles.loginContainer}>
                <View style={styles.header}>
                    <Akun />
                    <Text style={styles.loginText}>LOGIN</Text>
                </View>
                {msg !== '' && <Allert />}
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='NIK'
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                    />
                    <View style={styles.passwordContainer}>
                        <TextInput
                            placeholder='Password'
                            style={styles.input}
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                            {showPassword ? <Eye /> : <EyeLock />}
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={onLoginPress}
                    style={styles.loginButton}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.loginButtonText}>Masuk</Text>
                    )}
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Belum Punya Akun?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Daftar')}>
                    <Text style={styles.signupText}>Daftar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: width * 0.05,
        backgroundColor: '#fff'
    },
    loginContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: width * 0.05,
        justifyContent: 'center',
        marginTop: height * 0.15,
    },
    header: {
        alignItems: 'center',
        marginBottom: height * 0.05,
    },
    loginText: {
        color: '#000',
        fontSize: width * 0.065,
        fontWeight: '900',
        marginTop: height * 0.03,
    },
    inputContainer: {
        marginBottom: height * 0.03,
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 4,
        padding: width * 0.03,
        color: '#000',
        fontSize: width * 0.04,
        fontWeight: '700',
        marginBottom: height * 0.02,
    },
    passwordContainer: {
        position: 'relative',
    },
    eyeIcon: {
        position: 'absolute',
        right: width * 0.03,
        top: height * 0.01,
    },
    loginButton: {
        backgroundColor: '#000',
        paddingVertical: height * 0.02,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: width * 0.035,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: height * 0.05,
    },
    footerText: {
        color: '#000',
    },
    signupText: {
        color: '#346DC2',
        marginLeft: 2,
    },
});

export default App;
