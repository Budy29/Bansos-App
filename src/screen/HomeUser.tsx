import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Modal,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import Akun from '../asset/Icon/user.svg';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../store/BansosStore';
import Pengajuan from './Pengajuan';

const App = () => {
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const { penduduk, fetchPenduduk } = useAuthStore((state) => ({
        penduduk: state.penduduk,
        fetchPenduduk: state.fetchPenduduk,
    }));
    const peng = useAuthStore(state => state.peng);
    const handleLogout = useAuthStore(state => state.handleLogout);

    useEffect(() => {
        fetchPenduduk();
    }, [fetchPenduduk]);

    const handleNavigateToProfil = () => {
        navigation.navigate('Profil', {
            penduduk: penduduk,
        });
    };
    const handleNavigateToPengajuan = () => {
        navigation.navigate('Pengajuan', { penduduk });
    };

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
        <View style={{ flex: 1, backgroundColor: '#FFF', paddingVertical: 20 }}>
            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FFF" />
                </View>
            )}
            <View style={{ backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 10, width: '100%', height: '100%' }}>

                {!loading && (
                    <View>
                        <View style={{ paddingVertical: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Akun />
                            <Text style={{ color: '#000', fontSize: 16, fontWeight: '900', marginTop: 15 }}>
                                {penduduk?.nik ? `${penduduk.nik}` : ''}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 10 }}>
                            <TouchableOpacity onPress={handleNavigateToProfil} style={{ maxWidth: 120, padding: 8, backgroundColor: '#D9D9D9', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                <Text style={{ color: '#000', fontWeight: '600', fontSize: 10 }}>Lengkapi Profil</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleNavigateToPengajuan} style={{ maxWidth: 120, padding: 8, backgroundColor: '#D9D9D9', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#000', fontWeight: '600', fontSize: 10 }}>Pengajuan Data</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                            <View style={{ width: '90%', paddingVertical: 15, paddingHorizontal: 4, backgroundColor: '#D9D9D9', justifyContent: 'center', alignItems: 'center', borderRadius: 8 }}>
                                <Text style={{ fontSize: 14, fontWeight: '900', color: '#000' }}>
                                    Nama : {penduduk?.nama ?? '-'}
                                </Text>
                                <Text style={{ fontSize: 14, fontWeight: '900', color: '#000', marginTop: 6 }}>
                                    Alamat : {penduduk?.alamat ?? '-'}
                                </Text>
                                <Text style={{ fontSize: 14, fontWeight: '900', color: '#000', marginTop: 6 }}>
                                    NIK : {penduduk?.nik ?? '-'}
                                </Text>
                                <Text style={{ fontSize: 14, fontWeight: '900', color: '#000', marginTop: 6 }}>
                                    Jenis Kelamin : {penduduk?.jenis_kelamin ?? '-'}
                                </Text>
                                <Text style={{ fontSize: 14, fontWeight: '900', color: '#000', marginTop: 6 }}>
                                    Penghasilan : {penduduk?.penghasilan ?? '-'}
                                </Text>
                                {peng && (
                                    <Text style={{ fontSize: 14, fontWeight: '900', color: '#000', marginTop: 6 }}>
                                        Status Pengajuan : {peng.status === 1 ? 'menunggu persetujuan' : peng.status === 2 ? 'Pengajuan diterima' : peng.status === 3 ? 'pengahuan ditolak' : '-'}
                                    </Text>
                                )}
                            </View>
                            <TouchableOpacity onPress={handleLog} style={{ backgroundColor: '#000', width: '90%', paddingVertical: 16, borderRadius: 8, justifyContent: 'center', alignContent: 'center', marginTop: 20 }}>
                                <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 14 }}>Keluar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
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