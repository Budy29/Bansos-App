import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Akun from '../asset/Icon/back.svg';
import { useRoute } from '@react-navigation/native';
import { useAuthStore } from '../store/BansosStore';
import { useNavigation } from '@react-navigation/native';

const Profil = () => {
    const route = useRoute();
    const { penduduk } = route.params as { penduduk: any }; // Get penduduk from route params
    const updatePenduduk = useAuthStore((state) => state.updatePenduduk);
    const [nama, setNama] = useState(penduduk?.nama ?? '');
    const [nik, setNik] = useState(penduduk?.nik ?? '');
    const [tempatTglLahir, setTempatTglLahir] = useState(penduduk?.tempat_lahir ?? '');
    const [alamat, setAlamat] = useState(penduduk?.alamat ?? '');
    const [jenisKelamin, setJenisKelamin] = useState(penduduk?.jenis_kelamin ?? '');
    const [pekerjaan, setPekerjaan] = useState(penduduk?.pekerjaan ?? '');
    const [penghasilan, setPenghasilan] = useState(penduduk?.penghasilan ?? '');
    const [noHp, setNoHp] = useState(penduduk?.no_hp ?? '');
    const [Tgl, setTgl] = useState(penduduk?.tgl_lahir ?? '');
    const navigation = useNavigation();
    const handleSave = () => {
        updatePenduduk(nama, nik, tempatTglLahir, Tgl, alamat, jenisKelamin, penghasilan, noHp, pekerjaan);
        navigation.navigate('HomeUsr')
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ backgroundColor: '#fff', paddingHorizontal: 10 }}>
                <View style={{ paddingVertical: 20, flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Akun />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, color: '#000', fontWeight: '900', marginLeft: 20 }}>Data Profil</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#000', marginBottom: 6, marginLeft: 4 }}>Nama</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderColor: '#000', marginBottom: 10, borderRadius: 4, paddingLeft: 20, color: '#000', fontSize: 16, fontWeight: '700' }}
                        value={nama}
                        onChangeText={setNama}
                    />
                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#000', marginBottom: 6, marginLeft: 4 }}>NIK</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderColor: '#000', marginBottom: 10, borderRadius: 4, paddingLeft: 20, color: '#000', fontSize: 16, fontWeight: '700' }}
                        value={nik}
                        onChangeText={setNik}
                        editable={false}
                    />
                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#000', marginBottom: 6, marginLeft: 4 }}>Tempat Lahir</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderColor: '#000', marginBottom: 10, borderRadius: 4, paddingLeft: 20, color: '#000', fontSize: 16, fontWeight: '700' }}
                        value={tempatTglLahir}
                        onChangeText={setTempatTglLahir}
                    />
                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#000', marginBottom: 6, marginLeft: 4 }}>Tanggal Lahir</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderColor: '#000', marginBottom: 10, borderRadius: 4, paddingLeft: 20, color: '#000', fontSize: 16, fontWeight: '700' }}
                        value={Tgl}
                        onChangeText={setTgl}
                        placeholder='YYYY-MM-DD'
                    />
                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#000', marginBottom: 6, marginLeft: 4 }}>No Hp</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderColor: '#000', marginBottom: 10, borderRadius: 4, paddingLeft: 20, color: '#000', fontSize: 16, fontWeight: '700' }}
                        value={noHp}
                        onChangeText={setNoHp}
                    />
                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#000', marginBottom: 6, marginLeft: 4 }}>Alamat</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderColor: '#000', marginBottom: 10, borderRadius: 4, paddingLeft: 20, color: '#000', fontSize: 16, fontWeight: '700' }}
                        value={alamat}
                        onChangeText={setAlamat}
                    />
                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#000', marginBottom: 6, marginLeft: 4 }}>Jenis Kelamin</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderColor: '#000', marginBottom: 10, borderRadius: 4, paddingLeft: 20, color: '#000', fontSize: 16, fontWeight: '700' }}
                        value={jenisKelamin}
                        onChangeText={setJenisKelamin}
                    />
                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#000', marginBottom: 6, marginLeft: 4 }}>Pekerjaan</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderColor: '#000', marginBottom: 10, borderRadius: 4, paddingLeft: 20, color: '#000', fontSize: 16, fontWeight: '700' }}
                        value={pekerjaan}
                        onChangeText={setPekerjaan}
                    />
                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#000', marginBottom: 6, marginLeft: 4 }}>Penghasilan</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderColor: '#000', marginBottom: 10, borderRadius: 4, paddingLeft: 20, color: '#000', fontSize: 16, fontWeight: '700' }}
                        value={penghasilan}
                        onChangeText={setPenghasilan}
                    />
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity onPress={handleSave} style={{ backgroundColor: '#000', width: '40%', paddingVertical: 16, borderRadius: 8, justifyContent: 'center', alignContent: 'center', }}>
                        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 14 }}>Simpan</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default Profil;
