import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, TextInput, Alert } from 'react-native'
import Colors from '../../res/colors'

const CoinDetailScreen = ({ route, navigation }) => {

    const [amount, setAmount] = useState(0);
    const [amountToBuy, setAmountToBuy] = useState(0);
    const { coin } = route.params;

    useEffect(() => {
        // set the title in the screen with coin symbol choice in the previous page
        navigation.setOptions({ title: coin.symbol })
    }, []);

    useEffect(() => {
        if (amount > 0) {
            setAmountToBuy((amount / coin.price_usd).toFixed(4));
        } else {
            setAmountToBuy(0);
        }
    }, [amount]);


    const getSymbolIcon = (name) => {
        if (name) {
            let symbol = name.toLowerCase().replace(" ", "-")
            return `https://c1.coinlore.com/img/25x25/${symbol}.png`
        }
    }

    const buyCoin = () => {
        console.log(amount)
        if (amount > 0) {

            navigation.navigate('Payment', { amountToBuy, name: coin.name });
        } else {
            return Alert.alert('Message', 'You have to enter an amount', [
                {
                    text: 'Ok',
                },
            ]);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.subHeader}>
                <View style={styles.row}>
                    <Image style={styles.iconImg} source={{ uri: getSymbolIcon(coin.name) }} />
                    <Text style={styles.titleText}>{coin.name}</Text>
                </View>
                <Text style={styles.titleText}>{`u$d ${coin.price_usd}`}</Text>
            </View>
            <View>
                <View style={styles.formText}>
                    <Text style={styles.formTextLabel}>Amount (u$d):</Text>
                    <TextInput
                        style={styles.formTextInput}
                        keyboardType='number-pad'
                        value={amount}
                        onChangeText={setAmount}
                    />
                </View>
                <View style={styles.formText}>
                    <Text style={styles.formTextLabel}>{coin.name}:</Text>
                    <Text
                        style={[styles.formTextInput, { textAlignVertical: 'center', height: 31 }]}
                    >{amountToBuy}</Text>
                </View>
                <Pressable
                    onPress={buyCoin}
                    style={styles.btnBuy}>
                    <Text style={styles.btnBuyText}>Buy</Text>
                </Pressable>

            </View>

        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade,
    },
    row: {
        flexDirection: 'row'
    },
    subHeader: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 8
    },
    formText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 60,
        marginTop: 20,
    },
    formTextLabel: {
        fontSize: 15,
        marginEnd: 10,
        color: '#fff'
    },
    formTextInput: {
        borderRadius: 8,
        borderColor: '#fff',
        color: '#fff', borderWidth: 1,
        width: 100
    },
    iconImg: {
        width: 25,
        height: 25
    },
    sectionHeader: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: 8
    },
    sectionItem: {
        padding: 8
    },
    itemText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold'
    },

    btnBuy: {
        margin: 20,
        padding: 8,
        borderRadius: 8,
        fontSize: 25,
        width: 80,
        alignSelf: 'center',
        backgroundColor: Colors.picton
    },
    btnBuyText: {
        textAlign: 'center',
        color: Colors.white,
    }
})
export default CoinDetailScreen;