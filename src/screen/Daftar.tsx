import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Akun from '../asset/Icon/akun.svg';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../store/BansosStore';

const { width, height } = Dimensions.get('window');

const App = () => {
    const navigation = useNavigation();
    const handleRegister = useAuthStore(state => state.handleRegister);
    const msg = useAuthStore(state => state.massagesDaftar);
    const [nik, setNik] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const onRegister = async () => {
        await handleRegister(nik, password, phone);
        setModalVisible(true);
    };

    const closeModal = () => {
        navigation.navigate('Login');
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <View style={styles.header}>
                    <Akun />
                    <Text style={styles.title}>DAFTAR</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='NIK'
                        style={styles.input}
                        value={nik}
                        onChangeText={setNik}
                        keyboardType='numeric'
                    />
                    <TextInput
                        placeholder='Nomor Telepon'
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType='phone-pad'
                    />
                    <TextInput
                        placeholder='Password'
                        style={styles.input}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={onRegister}
                >
                    <Text style={styles.registerButtonText}>Daftar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Sudah Punya Akun?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginLink}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
            </View>
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>{msg}</Text>
                        <TouchableOpacity onPress={closeModal} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.02,
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: width * 0.05,
        justifyContent: 'center',
        marginTop: height * 0.1,
    },
    header: {
        alignItems: 'center',
        marginBottom: height * 0.05,
    },
    title: {
        color: '#000',
        fontSize: width * 0.065,
        fontWeight: '900',
        marginTop: height * 0.02,
    },
    inputContainer: {
        marginBottom: height * 0.03,
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 4,
        paddingLeft: width * 0.04,
        paddingVertical: height * 0.02,
        color: '#000',
        fontSize: width * 0.04,
        fontWeight: '700',
        marginBottom: height * 0.02,
    },
    registerButton: {
        backgroundColor: '#000',
        paddingVertical: height * 0.02,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: width * 0.04,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: height * 0.02,
    },
    footerText: {
        color: '#000',
    },
    loginLink: {
        marginLeft: 5,
    },
    loginText: {
        color: '#346DC2',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
    },
    modalText: {
        color: '#000',
        fontSize: width * 0.045,
        marginBottom: height * 0.03,
        fontWeight: '900',
        textAlign: 'center',
    },
    modalButton: {
        backgroundColor: '#346DC2',
        padding: 10,
        borderRadius: 5,
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: width * 0.04,
    },
});

export default App;
