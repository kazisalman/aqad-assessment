import React from 'react'
import { StyleSheet, View } from 'react-native';

const Seperator = () => {
    return (
        <View style={styles.separator} />
    )
}
export default Seperator


const styles = StyleSheet.create({
    separator: {
        marginVertical: 8,
    },
});