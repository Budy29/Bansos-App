import React from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Akun from '../asset/Icon/back.svg';
import { useRoute } from '@react-navigation/native';
import { useAuthStore } from '../store/BansosStore';
import Navigation from '../navigation/navigations';
import { useNavigation } from '@react-navigation/native';

const Pengajuan = () => {
    const { params } = useRoute();
    const penduduk = params?.penduduk || {};
    const navigation = useNavigation();

    const submitPengajuan = useAuthStore(state => state.submitPengajuan);

    const handleAjukan = async () => {
        try {
            await submitPengajuan(penduduk);
            navigation.navigate('HomeUsr');
            // alert('Pengajuan berhasil diajukan.');
        } catch (error) {
            alert('Gagal mengajukan pengajuan. Silakan coba lagi.');
        }
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ backgroundColor: '#fff', paddingHorizontal: 10 }}>
                <View style={{ paddingVertical: 20, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Akun />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, color: '#000', fontWeight: '900', marginLeft: 20 }}>Pengajuan Data Bansos</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#000', marginBottom: 6, marginLeft: 4 }}>Nama</Text>
                    <View style={{ borderWidth: 1, borderColor: '#000', marginBottom: 10, borderRadius: 4, paddingLeft: 20, paddingVertical: 8 }}>
                        <TextInput style={{ color: '#000', fontWeight: 'black' }} value={penduduk.nama || ''} editable={false} />
                    </View>
                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#000', marginBottom: 6, marginLeft: 4 }}>NIK</Text>
                    <View style={{ borderWidth: 1, borderColor: '#000', marginBottom: 10, borderRadius: 4, paddingLeft: 20, paddingVertical: 8 }}>
                        <TextInput style={{ color: '#000', fontWeight: 'black' }} value={penduduk.nik || ''} editable={false} />
                    </View>
                    {/* <Text style={{ fontSize: 12, fontWeight: '600', color: '#000', marginBottom: 6, marginLeft: 4 }}>Tempat Tanggal Lahir</Text> */}
                    {/* <View style={{ borderWidth: 1, borderColor: '#000', marginBottom: 10, borderRadius: 4, paddingLeft: 20, paddingVertical: 8 }}>
                        <TextInput value={`${penduduk.tempat_lahir || ''}, ${penduduk.tgl_lahir || ''}`} editable={false} />
                    </View> */}
                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#000', marginBottom: 6, marginLeft: 4 }}>Alamat</Text>
                    <View style={{ borderWidth: 1, borderColor: '#000', marginBottom: 10, borderRadius: 4, paddingLeft: 20, paddingVertical: 8 }}>
                        <TextInput style={{ color: '#000', fontWeight: 'black' }} value={penduduk.alamat || ''} editable={false} />
                    </View>
                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#000', marginBottom: 6, marginLeft: 4 }}>Jenis Kelamin</Text>
                    <View style={{ borderWidth: 1, borderColor: '#000', marginBottom: 10, borderRadius: 4, paddingLeft: 20, paddingVertical: 8 }}>
                        <TextInput style={{ color: '#000', fontWeight: 'black' }} value={penduduk.jenis_kelamin || ''} editable={false} />
                    </View>
                    {/* <Text style={{ fontSize: 12, fontWeight: '600', color: '#000', marginBottom: 6, marginLeft: 4 }}>Pekerjaan</Text> */}
                    {/* <View style={{ borderWidth: 1, borderColor: '#000', marginBottom: 10, borderRadius: 4, paddingLeft: 20, paddingVertical: 8 }}>
                        <TextInput value={penduduk.pekerjaan || ''} editable={false} />
                    </View> */}
                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#000', marginBottom: 6, marginLeft: 4 }}>Penghasilan</Text>
                    <View style={{ borderWidth: 1, borderColor: '#000', marginBottom: 10, borderRadius: 4, paddingLeft: 20, paddingVertical: 8 }}>
                        <TextInput style={{ color: '#000', fontWeight: 'black' }} value={penduduk.penghasilan || ''} editable={false} />
                    </View>
                </View>
                <View style={{ alignItems: 'flex-end', marginBottom: 20 }}>
                    <TouchableOpacity onPress={handleAjukan} style={{ backgroundColor: '#000', width: '40%', paddingVertical: 16, borderRadius: 8, justifyContent: 'center', alignContent: 'center' }}>
                        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 14 }}>Ajukan</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default Pengajuan;
function alert(arg0: string) {
    throw new Error('Function not implemented.');
}

