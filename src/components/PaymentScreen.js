import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import Colors from '../res/colors'

const PaymentScreen = ({ route, navigation }) => {

    const { amountToBuy, name } = route.params;
    // wherever the useState is located 
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);

    // Check if hardware supports biometrics
    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);
        })();
    });

    useEffect(() => {
        handleBiometricAuth();
    }, [isBiometricSupported]);

    const fallBackToDefaultAuth = () => {
        console.log('fall back to password authentication');
    };

    const alertComponent = (title, mess, btnTxt, btnFunc) => {
        return Alert.alert(title, mess, [
            {
                text: btnTxt,
                onPress: btnFunc,
            },
        ]);
    };

    const handleBiometricAuth = async () => {
        // Check if hardware supports biometrics
        const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();

        // Fallback to default authentication method (password) if Fingerprint is not available
        if (!isBiometricAvailable)
            return alertComponent(
                'Please enter your password',
                'Biometric Authentication not supported',
                'OK',
                () => fallBackToDefaultAuth()
            );

        // Check Biometrics types available (Fingerprint, Facial recognition, Iris recognition)
        let supportedBiometrics;
        if (isBiometricAvailable)
            supportedBiometrics = await LocalAuthentication.supportedAuthenticationTypesAsync();

        // Check Biometrics are saved locally in user's device
        const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
        if (!savedBiometrics)
            return alertComponent(
                'Biometric record not found',
                'Please login with your password',
                'OK',
                () => fallBackToDefaultAuth()
            );

        // Authenticate use with Biometrics (Fingerprint, Facial recognition, Iris recognition)

        const biometricAuth = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Login with Biometrics',
            cancelLabel: 'Cancel',
            disableDeviceFallback: true,
        });
        // Log the user in on success
        if (biometricAuth.success) alertComponent(
            'Message',
            `You bought ${amountToBuy} of ${name} successfully!`,
            'OK', navigation.navigate('Coins'));

        console.log({ isBiometricAvailable });
        console.log({ supportedBiometrics });
        console.log({ savedBiometrics });
        console.log({ biometricAuth });
    };


    return (
        <View style={styles.container} >
            <Text style={styles.textMessage}> {isBiometricSupported ? 'Your device is compatible with Biometrics'
                : 'Face or Fingerprint scanner is available on this device'}
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade,
    },
    textMessage:{
        color: Colors.white,
    }
});

export default PaymentScreen;