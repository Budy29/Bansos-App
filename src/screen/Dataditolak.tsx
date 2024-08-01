import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Akun from '../asset/Icon/back.svg';
import { useAuthStore } from '../store/BansosStore';
import { useNavigation } from '@react-navigation/native';

const App = () => {
    const { pengajuanList, getPengajuan } = useAuthStore();
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const [filteredPengajuanList, setFilteredPengajuanList] = useState([]);
    useEffect(() => {
        getPengajuan(3);
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
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ backgroundColor: '#fff', paddingHorizontal: 15 }}>
                <View style={{ paddingVertical: 20, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Akun />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, color: '#000', fontWeight: '900', marginLeft: 20 }}>DATA PENGAJUAN DITOLAK</Text>
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
                            // onPress={() => openModal(pengajuan)}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 0 }}>
                                    <Text style={{ color: '#000', fontSize: 14, marginTop: 6, fontWeight: '700' }}>{pengajuan.penduduk.nama}</Text>
                                    <Text style={{ color: '#000', fontSize: 12, marginTop: 6, fontWeight: '700' }}>
                                        {pengajuan.status === 3 ? 'Pengajuan Ditolak' : ''}
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
        </ScrollView>
    );
};

export default App;
