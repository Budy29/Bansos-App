import React, { useState } from 'react';
import {
    Modal,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Akun from '../asset/Icon/akun.svg';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../store/BansosStore';

const App = () => {
    const navigation = useNavigation();
    const handleRegister = useAuthStore(state => state.handleRegister);
    const loading = useAuthStore(state => state.loading);
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
        navigation.navigate('Login')
        setModalVisible(false);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 10, justifyContent: 'center', width: '100%', height: '90%', marginBottom: 30 }}>
                <View style={{ paddingVertical: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Akun />
                    <Text style={{ color: '#000', fontSize: 26, fontWeight: '900', marginTop: 26 }}>DAFTAR</Text>
                </View>
                <View>
                    <TextInput
                        placeholder='NIK'
                        style={{ borderWidth: 1, borderColor: '#000', marginBottom: 20, borderRadius: 4, paddingLeft: 20, color: '#000', fontSize: 16, fontWeight: '700' }}
                        value={nik}
                        onChangeText={setNik}
                        keyboardType='numeric'
                    />
                    <TextInput
                        placeholder='Nomer Telepon'
                        style={{ borderWidth: 1, borderColor: '#000', marginBottom: 20, borderRadius: 4, paddingLeft: 20, color: '#000', fontSize: 16, fontWeight: '700' }}
                        value={phone}
                        onChangeText={setPhone}
                    />
                    <TextInput
                        placeholder='Password'
                        style={{ borderWidth: 1, borderColor: '#000', marginBottom: 20, borderRadius: 4, paddingLeft: 20, color: '#000', fontSize: 16, fontWeight: '700' }}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <TouchableOpacity
                    style={{ backgroundColor: '#000', width: '100%', paddingVertical: 16, borderRadius: 8, justifyContent: 'center', alignContent: 'center' }}
                    onPress={onRegister}
                // disabled={loading}
                >
                    <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 14 }}>
                        Daftar
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                <Text style={{ color: '#000' }}>Belum Punya Akun?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginLeft: 2 }}>
                    <Text style={{ color: '#346DC2' }}>Login</Text>
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
                        {/* <Text style={styles.modalText}>Pergi Ke menu Login</Text> */}

                        <TouchableOpacity onPress={closeModal} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
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
        fontSize: 16,
        marginBottom: 20,
        fontWeight: '900'
    },
    modalButton: {
        backgroundColor: '#346DC2',
        padding: 10,
        borderRadius: 5,
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default App;
