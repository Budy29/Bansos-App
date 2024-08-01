import { create } from 'zustand';
import axios from 'axios';


interface TokenPayload {
    username: string;
    level: number;
}
type Pengajuan = {
    id_pengajuan: number;
    id_penduduk: number;
    status: number;
    keterangan: string | null;
};

type Penduduk = {
    reduce(arg0: (acc: { [x: string]: any; }, penduduk: { id_penduduk: string | number; }) => { [x: string]: any; }, arg1: {}): unknown;
    id_penduduk: number;
    id_user: number;
    nama: string | null;
    tempat_lahir: string | null;
    tgl_lahir: string | null;
    alamat: string | null;
    jenis_kelamin: string | null;
    pekerjaan: string | null;
    penghasilan: string | null;
    no_hp: string;
    nik: string;
};

type AuthStore = {
    handleLogout: any;
    accessToken: string | null;
    message: string;
    loading: boolean;
    no_hp: string;
    userLevel: number | null;
    massagesDaftar: string;
    penduduk: Penduduk | null;
    peng: string | null;
    pengajuanList: Pengajuan[] | null;
    handleLogin: (username: string, password: string) => Promise<void>;
    handleRegister: (username: string, password: string, no_hp: string) => Promise<void>;
    fetchPenduduk: () => Promise<void>;
    updatePenduduk: (nama: string, nik: string, tempat_lahir: string, tgl_lahir: string, alamat: string, jenis_kelamin: string, penghasilan: string, no_hp: string, pekerjaan: string) => Promise<void>;
    submitPengajuan: (data: any) => Promise<void>;
    getPengajuan: (status: number) => Promise<void>;
    updatePengajuan: (id_pengajuan: number, status: number) => Promise<void>;

};

export const useAuthStore = create<AuthStore>((set, get) => ({
    accessToken: null,
    message: '',
    loading: false,
    no_hp: '',
    massagesDaftar: '',
    penduduk: null,
    userLevel: null,
    pengajuanList: null,
    peng: null,
    handleLogin: async (username: string, password: string) => {
        set({ loading: true, message: '' });
        try {
            const response = await axios.post(`https://api-bansos.jelajahpekalongan.com/login`, {
                username,
                password,
            });
            console.log('Login response:', response.data.data);
            // const { access_token } = response.data;
            const { access_token, level } = response.data;
            set({
                accessToken: access_token,
                userLevel: level,
            });
            // set({ accessToken: access_token });
            // console.log('Access token:', access_token);
            // set({ userLevel: level })

            // const decoded = jwtDecode<TokenPayload>(access_token);
            // set({ username: decoded.username });
            // const decoded = jwtDecode<TokenPayload>(access_token);
            // set({ userLevel: decoded.level })

        } catch (error: any) {
            if (error.response) {
                set({ message: error.response.data.message || 'silahkan masukan usernam dan password' });
            } else {
                set({ message: 'An error occurred. Please try again.' });
            }
        } finally {
            set({ loading: false });
        }
    },

    handleRegister: async (username: string, password: string, no_hp: string) => {
        set({ loading: true, massagesDaftar: '' });
        try {
            const response = await axios.post(`https://api-bansos.jelajahpekalongan.com/registration`, {
                username,
                password,
                no_hp,
            });
            set({ massagesDaftar: response.data.message });
            console.log('Registration response:', response.data.message);
        } catch (error: any) {
            set({ massagesDaftar: 'Registrasi gagal' });
            console.log('Registration error:', error.response?.data?.message || 'An error occurred.');
        } finally {
            set({ loading: false });
        }
    },

    fetchPenduduk: async () => {
        const { accessToken } = get();
        if (!accessToken) {
            set({ message: 'User is not logged in.' });
            return;
        }

        set({ loading: true });
        try {
            const response = await axios.get('https://api-bansos.jelajahpekalongan.com/penduduk', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            set({ penduduk: response.data.data });
            set({ peng: response.data.pengajuan })
            console.log('Penduduk data:', response.data.data);
        } catch (error: any) {
            set({ message: error.response?.data?.message || 'Failed to fetch penduduk data.' });
            console.log('Fetch penduduk error:', error.response?.data?.message || 'An error occurred.');
        } finally {
            set({ loading: false });
        }
    },
    updatePenduduk: async (nama: string, nik: string, tempat_lahir: string, tgl_lahir: string, alamat: string, jenis_kelamin: string, penghasilan: string, no_hp: string, pekerjaan: string) => {
        const { accessToken, penduduk } = get();
        if (!accessToken || !penduduk) {
            set({ message: 'User is not logged in or penduduk data is not available.' });
            return;
        }

        set({ loading: true });
        try {
            const response = await axios.put('https://api-bansos.jelajahpekalongan.com/penduduk', {
                nama,
                alamat,
                jenis_kelamin,
                penghasilan,
                nik,
                tempat_lahir,
                tgl_lahir,
                no_hp,
                pekerjaan
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            set({ penduduk: { ...penduduk, nama, alamat, jenis_kelamin, penghasilan } });
            set({ message: 'Penduduk data updated successfully.' });
            console.log('Update response:', response.data);
        } catch (error: any) {
            set({ message: error.response?.data?.message || 'Failed to update penduduk data.' });
            console.log('Update penduduk error:', error.response?.data?.message || 'An error occurred.');
        } finally {
            set({ loading: false });
        }
    },
    submitPengajuan: async (data) => {
        const { accessToken } = get();
        if (!accessToken) {
            set({ message: 'User is not logged in.' });
            return;
        }

        set({ loading: true });
        try {
            const response = await axios.post('https://api-bansos.jelajahpekalongan.com/pengajuan', data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            set({ message: 'Pengajuan submitted successfully.' });
            console.log('Pengajuan response:', response.data);
        } catch (error: any) {
            set({ message: error.response?.data?.message || 'Failed to submit pengajuan.' });
            console.log('Submit pengajuan error:', error.response?.data?.message || 'An error occurred.');
        } finally {
            set({ loading: false });
        }
    },
    handleLogout: () => {
        set({
            accessToken: null,
            message: '',
            loading: false,
            no_hp: '',
            massagesDaftar: '',
            penduduk: null,
            userLevel: null,
        });
        console.log('User has been logged out.');
    },
    getPengajuan: async (status) => {
        const { accessToken } = get();
        if (!accessToken) {
            set({ message: 'User is not logged in.' });
            return;
        }

        set({ loading: true });
        try {
            const response = await axios.get(`https://api-bansos.jelajahpekalongan.com/pengajuan`, {
                params: { status },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            set({ pengajuanList: response.data.data });
            console.log('Pengajuan data:', response.data.data);
        } catch (error: any) {
            set({ message: error.response?.data?.message || 'Failed to fetch pengajuan data.' });
            console.log('Fetch pengajuan error:', error.response?.data?.message || 'An error occurred.');
        } finally {
            set({ loading: false });
        }
    },
    updatePengajuan: async (id_pengajuan: number, status: number) => { // Add this method
        const { accessToken } = get();
        if (!accessToken) {
            set({ message: 'User is not logged in.' });
            return;
        }

        set({ loading: true });
        try {
            const response = await axios.put('https://api-bansos.jelajahpekalongan.com/pengajuan', {
                id_pengajuan,
                status
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            set({ message: 'Pengajuan updated successfully.' });
            console.log('Update pengajuan response ya guys:', response.data);
        } catch (error: any) {
            set({ message: error.response?.data?.message || 'Failed to update pengajuan.' });
            console.log('Update pengajuan error:', error.response?.data?.message || 'An error occurred.');
        } finally {
            set({ loading: false });
        }
    },
}));
