import React, { useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator
} from 'react-native';
import Akun from '../asset/Icon/user.svg';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../store/BansosStore';

const App = () => {
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleLogout = useAuthStore(state => state.handleLogout);

    const hndLogout = () => {
        setLoading(true);
        setVisible(false);
        setTimeout(() => {
            setLoading(false);
            handleLogout();
            navigation.navigate('Login');
        }, 2000);
    };

    const handleLog = () => {
        setVisible(true);
    };

    const closeModal = () => {
        setVisible(false);
    };

    return (
        <View style={styles.container}>
            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FFF" />
                </View>
            )}
            {!loading && (
                <View style={styles.content}>
                    <View style={styles.userInfo}>
                        <Akun />
                        <Text style={styles.userTitle}>ADMIN</Text>
                    </View>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={() => navigation.navigate('DataPengaju')} style={styles.button}>
                            <Text style={styles.buttonText}>Data Pengajuan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('DataSetuju')} style={styles.button1}>
                            <Text style={styles.buttonText}>Pengajuan Diterima</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('DataTolak')} style={styles.button1}>
                            <Text style={styles.buttonText}>Pengajuan Ditolak</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.userDetails}>
                        <Text style={styles.detailText}>Hii Selamat Datang</Text>
                        <Text style={styles.detailText}>Di Admin Sistem Pengajuan Bansos</Text>
                        {/* <Text style={styles.detailText}>NIK : 332609320203844283</Text> */}
                    </View>
                    <TouchableOpacity onPress={handleLog} style={styles.logoutButton}>
                        <Text style={styles.logoutButtonText}>Keluar</Text>
                    </TouchableOpacity>
                </View>
            )}
            <Modal
                visible={visible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Apakah Anda Yakin Ingin Keluar</Text>
                        </View>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={closeModal}
                            >
                                <Text style={styles.modalButtonText}>Tidak</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={hndLogout}
                            >
                                <Text style={styles.modalButtonText}>Ya</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingVertical: 20,
    },
    content: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    userInfo: {
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userTitle: {
        color: '#000',
        fontSize: 16,
        fontWeight: '900',
        marginTop: 15,
    },
    buttonRow: {
        flexDirection: 'row',
        // justifyContent: 'center',
        paddingVertical: 10,
        // backgroundColor: 'red',
        alignItems: 'center',
        width: '90%'
    },
    button: {
        maxWidth: 120,
        padding: 8,
        backgroundColor: '#D9D9D9',
        borderRadius: 8,

        alignItems: 'center',
        marginRight: 0,
    },
    button1: {
        maxWidth: 120,
        padding: 8,
        backgroundColor: '#D9D9D9',
        borderRadius: 8,
        alignItems: 'center',
        marginLeft: 9,
    },
    buttonText: {
        color: '#000',
        fontWeight: '600',
        fontSize: 10,
    },
    userDetails: {
        width: '90%',
        paddingVertical: 15,
        paddingHorizontal: 4,
        backgroundColor: '#D9D9D9',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 30,

    },
    detailText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#000',
        marginTop: 6,
    },
    logoutButton: {
        backgroundColor: '#000',
        width: '90%',
        paddingVertical: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    logoutButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
    },
    modalHeader: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    modalButtons: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 20,
        paddingHorizontal: 10,
    },
    modalButton: {
        backgroundColor: '#D9D9DE',
        width: '30%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    confirmButton: {
        marginLeft: 8,
    },
    modalButtonText: {
        fontSize: 14,
        color: '#000',
        fontWeight: '700',
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 100
    },
});
