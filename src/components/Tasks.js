import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../assets/styles'
import todayImage from '../assets/imgs/today.jpg'
import { format } from 'date-fns';
export default function Tasks({ doneAt, desc, estimateAt, onTaskHandler, id }) {
    let check = null;
    check = doneAt !== null ?
        <View style={styles.done}>
            <Icon name='check' size={20} color={'#FFF'} />
        </View>
        :
        check = <View style={styles.pending} />

    const descStyle = doneAt !== null ? { textDecorationLine: 'line-through' } : {}
    return (
        <View style={styles.container}>
            <View style={styles.checkContainer}>
                <TouchableOpacity onPress={() => onTaskHandler(id)}>
                    {check}
                </TouchableOpacity>
            </View>
            <View>
                <Text style={[styles.description, descStyle]}>
                    {desc}
                </Text>
                <Text style={styles.date}>
                    {format(estimateAt, "dd 'do' MM 'de' yyyy", { locale: '' })}
                </Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#AAA',
    },
    checkContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%'
    },
    pending: {
        borderWidth: 1,
        height: 25,
        width: 25,
        borderRadius: 15,
        borderColor: '#555'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 15,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center',
    },
    description: {
        fontFamily: 'Latto',
        color: '#000',
        fontSize: 15,
    },
    date: {
        fontFamily: 'Latto',
        color: '#000',
        fontSize: 12
    }
});
