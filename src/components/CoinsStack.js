import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CoinsScreen from '../components/CoinsScreen'
import CoinDetailScreen from '../components/coinDetail/CoinDetailScreen'
import PaymentScreen from '../components/PaymentScreen'
import Colors from '../res/colors'

const Stack = createStackNavigator();

const CoinsStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.blackPearl,
                    shadowOpacity: 0
                },
                headerTintColor: Colors.white
            }}>
            <Stack.Screen name="Coins" component={CoinsScreen} />
            <Stack.Screen name="CoinDetail" component={CoinDetailScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />

        </Stack.Navigator>
    );
}


export default CoinsStack;