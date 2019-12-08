import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { format } from 'date-fns';
import Swipeable from 'react-native-swipeable';
export default function Tasks({ doneAt, desc, estimateAt, onTaskHandler, id, onDeleteHandler }) {
    let check = null;
    check = doneAt !== null ?
        <View style={styles.done}>
            <Icon name='check' size={20} color={'#FFF'} />
        </View>
        :
        check = <View style={styles.pending} />

    const descStyle = doneAt !== null ? { textDecorationLine: 'line-through' } : {}

    const leftContent = (
        <View style={styles.exclude}>
            <Icon name='trash' size={20} color='#FFF' />
            <Text style={styles.excludeText}>
                Excluir
            </Text>
        </View>
    )
    const rightContent = [
        <TouchableOpacity style={[styles.exclude, styles.rightContent]} onPress={() => onDeleteHandler(id)}>
            <Icon name='trash' size={30} color='#FFF' />
        </TouchableOpacity>
    ]
    return (
        <Swipeable leftActionActivationDistance={200} onLeftActionActivate={() => onDeleteHandler(id)} leftContent={leftContent} rightButtons={rightContent}>
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
                        {estimateAt}
                    </Text>
                </View>
            </View>
        </Swipeable>
    );
}
const styles = StyleSheet.create({
    exclude: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    excludeText: {
        fontFamily: 'Latto',
        color: '#FFF',
        fontSize: 20,
        margin: 10
    },
    rightContent: {
        justifyContent: 'flex-start',
        paddingLeft: 20
    },
    container: {
        paddingVertical: 10,
        paddingHorizontal: 10,
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
