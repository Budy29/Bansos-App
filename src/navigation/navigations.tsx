import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Daftar from '../screen/Daftar';
import Login from '../screen/login';
import DataDiSetujui from '../screen/DataDisetujui';
import DataDiTolak from '../screen/Dataditolak';
import DataPengajuan from '../screen/DataPengajuan';
import HomeAdm from '../screen/HomeAdmin';
import HomeUser from '../screen/HomeUser';
import Pengajuan from '../screen/Pengajuan';
import Profil from '../screen/Profil'

const Stack = createNativeStackNavigator();

function Navigation() {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                animation: 'none'
            }}
        >
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Daftar" component={Daftar} options={{ headerShown: false }} />
            <Stack.Screen name="DataSetuju" component={DataDiSetujui} options={{ headerShown: false }} />
            <Stack.Screen name="DataTolak" component={DataDiTolak} options={{ headerShown: false }} />
            <Stack.Screen name="DataPengaju" component={DataPengajuan} options={{ headerShown: false }} />
            <Stack.Screen name="HomeAdm" component={HomeAdm} options={{ headerShown: false }} />
            <Stack.Screen name="HomeUsr" component={HomeUser} options={{ headerShown: false }} />
            <Stack.Screen name="Pengajuan" component={Pengajuan} options={{ headerShown: false }} />
            <Stack.Screen name="Profil" component={Profil} options={{ headerShown: false }} />

        </Stack.Navigator>
    );
};

export default Navigation;