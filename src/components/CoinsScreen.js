import React, { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import CoinsItem from '../components/CoinsItem'
import Http from '../libs/http'
import Colors from '../res/colors'
import CoinsSearch from '../components/CoinsSearch'

const CoinsScreen = ({ navigation }) => {
    const [coins, setCoins] = useState([]);
    const [allCoins, setAllCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCoins()
    }, []);


    const getCoins = async () => {
        setLoading(true);
        const res = await Http.instance.get('https://api.coinlore.net/api/tickers/');
        setCoins(res.data);
        setAllCoins(res.data);
        setLoading(false);
    }


    const handlePress = (coin) => {
        navigation.navigate('CoinDetail', { coin })
    }

    const handleSearch = (query) => {

        const coinsFiltered = allCoins.filter((coin) => {
            return coin.name.toLowerCase().includes(query.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(query.toLowerCase())
        })
        setCoins(coinsFiltered);
    }


    return (
        <View style={styles.container}>

            <CoinsSearch onchange={handleSearch} />

            {/* <Text style={styles.titleText}>Coins Screen</Text>
                <Pressable style={styles.btn} onPress={this.handlePress} ><Text>Go to detail</Text></Pressable> */}

            {loading &&
                <ActivityIndicator
                    style={styles.loader}
                    color='#fff'
                    size='large'
                />
            }

            <FlatList
                data={coins}
                renderItem={({ item }) =>
                    <CoinsItem item={item} onPress={() => handlePress(item)} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade,
        // alignItems: 'center'
    },
    titleText: {
        color: '#fff',
        textAlign: 'center',
    },
    btn: {
        padding: 5,
        backgroundColor: 'blue',
        borderRadius: 8,
        margin: 16
    },
    btnText: {
        color: '#fff',
        textAlign: 'center',
    },
    loader: {

    }

})

export default CoinsScreen;