import React, { useState } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import Colors from '../res/colors'


const CoinsSearch = ({ onchange }) => {
    const [query, setQuery] = useState('')

    const handleText = (query) => {
        setQuery(query)

        if (onchange) {
            onchange(query)
        }
    }

    return (
        <View >
            <TextInput style={styles.textInput}
                onChangeText={handleText}
                value={query}
                placeholder='Search coin'
                placeholderTextColor='#fff'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        backgroundColor: Colors.charade,
        borderBottomColor: Colors.zircon,
        paddingLeft: 16,
        color: '#fff',
        borderBottomWidth: 2,
    }
})


export default CoinsSearch