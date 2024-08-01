import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Modal,
    StyleSheet
} from 'react-native';
import Akun from '../asset/Icon/back.svg';
import { useAuthStore } from '../store/BansosStore';
import { useNavigation } from '@react-navigation/native';

const App = () => {
    const { pengajuanList, getPengajuan, updatePengajuan } = useAuthStore(); // Use updatePengajuan here
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedPengajuan, setSelectedPengajuan] = useState(null);
    const [search, setSearch] = useState('');
    const [filteredPengajuanList, setFilteredPengajuanList] = useState([]);

    useEffect(() => {
        getPengajuan(1);
    }, []);

    useEffect(() => {
        if (search.trim() === '') {
            setFilteredPengajuanList(pengajuanList);
        } else {
            const filtered = pengajuanList?.filter((pengajuan) =>
                pengajuan.penduduk.nama.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredPengajuanList(filtered);
        }
    }, [search, pengajuanList]);

    const openModal = (pengajuan: React.SetStateAction<null>) => {
        setSelectedPengajuan(pengajuan);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedPengajuan(null);
        setModalVisible(false);
    };

    const handleUpdateStatus = async (status: number) => {
        if (selectedPengajuan) {
            await updatePengajuan(selectedPengajuan.id_pengajuan, status); // Use updatePengajuan
            closeModal();
            getPengajuan(1); // Refresh the list after updating
        }
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ backgroundColor: '#fff', paddingHorizontal: 15 }}>
                <View style={{ paddingVertical: 20, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Akun />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, color: '#000', fontWeight: '900', marginLeft: 20 }}>DATA PENGAJUAN</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <TextInput
                        placeholder='Search'
                        placeholderTextColor={'#000'}
                        style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                            marginBottom: 10,
                            borderRadius: 4,
                            paddingLeft: 20,
                            color: '#000',
                            fontSize: 16,
                            backgroundColor: '#D9D9D9',
                            fontWeight: '700',
                        }}
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
                <View style={{ width: '100%', paddingTop: 20 }}>
                    {filteredPengajuanList && filteredPengajuanList.length > 0 ? (
                        filteredPengajuanList.map((pengajuan) => (
                            <TouchableOpacity
                                key={pengajuan.id_pengajuan}
                                style={{ backgroundColor: '#D9D9D9', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8, marginBottom: 10 }}
                                onPress={() => openModal(pengajuan)}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 0 }}>
                                    <Text style={{ color: '#000', fontSize: 14, marginTop: 6, fontWeight: '700' }}>{pengajuan.penduduk.nama}</Text>
                                    <Text style={{ color: '#000', fontSize: 12, marginTop: 6, fontWeight: '700' }}>
                                        {pengajuan.status === 1 ? 'Menunggu Persetujuan' : ''}
                                    </Text>
                                </View>
                                <Text style={{ color: '#000', fontSize: 12, marginTop: 6, fontWeight: '700' }}>
                                    {pengajuan.penduduk.alamat}
                                </Text>
                                <Text style={{ color: '#000', fontSize: 12, marginTop: 6, fontWeight: '700' }}>
                                    {pengajuan.penduduk.nik}
                                </Text>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View style={{ width: '100%', height: 500, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#000', fontSize: 14, fontWeight: '700' }}>GUYS</Text>
                            <Text style={{ color: '#000', fontSize: 14, fontWeight: '700' }}>DATA KOSONG!!!</Text>
                        </View>
                    )}
                </View>
            </View>

            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedPengajuan && (
                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={closeModal} style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: 10, paddingRight: 10 }}>
                                    <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>X</Text>
                                </TouchableOpacity>
                                <Text style={styles.modalTitle}>Nama: {selectedPengajuan.penduduk.nama}</Text>
                                <Text style={styles.modalTitle}>Alamat: {selectedPengajuan.penduduk.alamat}</Text>
                                <Text style={styles.modalTitle}>NIK: {selectedPengajuan.penduduk.nik}</Text>
                                <Text style={styles.modalTitle}>Jenis Kelamin: {selectedPengajuan.penduduk.jenis_kelamin}</Text>
                                <Text style={styles.modalTitle}>Pekerjaan: {selectedPengajuan.penduduk.pekerjaan}</Text>
                                <Text style={styles.modalTitle}>Penghasilan: {selectedPengajuan.penduduk.penghasilan}</Text>
                            </View>
                        )}
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 20, paddingHorizontal: 10 }}>
                            <TouchableOpacity
                                style={{ backgroundColor: '#D9D9DE', width: '46%', padding: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}
                                onPress={() => handleUpdateStatus(0)}
                            >
                                <Text style={{ fontSize: 14, color: '#000', fontWeight: '700' }}>TOLAK</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ backgroundColor: '#D9D9DE', width: '46%', padding: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}
                                onPress={() => handleUpdateStatus(2)}
                            >
                                <Text style={{ fontSize: 14, color: '#000', fontWeight: '700' }}>TERIMA</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};


export default App;
const styles = StyleSheet.create({
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
    modalTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#000'
    },
});
