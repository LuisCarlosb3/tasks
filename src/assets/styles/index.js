import React from 'react';
import { StyleSheet } from 'react-native';
const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: '100%',
        zIndex: 1

    },
    welcome: {
        fontFamily: 'Latto',
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
});

export default commonStyles;