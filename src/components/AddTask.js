import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Alert, Platform, Container, Animated } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
const AddTask = (props) => {
    // { onHandlerSave, onHandlerCancel }
    console.log(props);
    const [desc, setDesc] = useState('');
    const [estimatedAt, setEstimatedAt] = new Date();
    const [showPick, setShowPick] = useState(false);

    const save = () => {
        if (!desc.trim()) {
            Alert.alert('Dados invalidos', 'Informe uma descrição para a tarefa');
            return
        }
        const newTask = { desc, estimatedAt };
        props.onHandlerSave(newTask);
        setDesc('');
        setEstimatedAt(new Date());
    }
    const setDate = (event, date) => {
        date = date || estimatedAt;
        setEstimatedAt(date);
        setShowPick(Platform.OS === 'ios' ? true : false);
    }
    return (
        <Animated.Container>
            <TouchableWithoutFeedback onPress={() => props.onHandlerCancel()}>
                <View style={styles.offset}></View>
            </TouchableWithoutFeedback>
            <View style={styles.container}>
                <Text style={styles.header}>
                    Nova Tarefa:
                </Text>
                <TextInput placeholder="Descrição..." style={styles.input} onChangeText={text => setDesc(text)} value={text} />
                <TouchableWithoutFeedback onPress={() => setShowPick(true)}>
                    <Text style={styles.header}>
                        Data:
                    </Text>
                </TouchableWithoutFeedback>
                {showPick && <DateTimePicker
                    value={estimatedAt}
                    onChange={setDate}
                />}
                <View style={styles.formButton}>
                    <TouchableOpacity onPress={() => props.onHandlerCancel()}>
                        <Text style={styles.buttonCancel}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={save}>
                        <Text style={styles.buttonSave}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableWithoutFeedback onPress={() => props.onHandlerCancel()}>
                <View style={styles.offset}></View>
            </TouchableWithoutFeedback>
        </Animated.Container>
    );
}

const styles = StyleSheet.create({
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    container: {
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    header: {
        fontFamily: 'Latto',
        backgroundColor: '#1631be',
        color: '#FFF',
        textAlign: 'center',
        padding: 10,
        fontSize: 15
    },
    input: {
        fontFamily: 'Latto',
        width: '90%',
        height: 40,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6
    },
    formButton: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    buttonCancel: {
        margin: 20,
        marginVertical: 30,
        color: '#d50000'
    },
    buttonSave: {
        margin: 20,
        marginVertical: 30,
        color: '#1631be'
    }
})
export default AddTask;