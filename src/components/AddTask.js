import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Alert, DatePickerAndroid, Dimensions, Animated } from 'react-native';
const screenHeight = Dimensions.get("screen").height
import { setDate, setMonth, setYear, format } from 'date-fns';
const AddTask = ({ onHandlerSave, isOpen, onHandlerClose }) => {
    const [desc, setDesc] = useState('');
    const [estimateAt, setEstimateAt] = useState(new Date());
    const [formatedDate, setFormatedDate] = useState(format(estimateAt, "dd'/'MM'/'yyyy"))
    const top = new Animated.Value(screenHeight);

    const toggleModal = () => {
        Animated.spring(top, { toValue: 0 }).start();
    }
    const closeModal = () => {
        Animated.spring(top, { toValue: screenHeight }).start();
        setDesc('');
        setEstimateAt(new Date());
    }
    useEffect(() => {
        if (isOpen)
            toggleModal();
        else
            closeModal();
    }, [isOpen]);

    useEffect(() => {
        setFormatedDate(format(estimateAt, "dd'/'MM'/'yyyy"))
    }, [estimateAt]);

    const handlerDatePick = () => {
        DatePickerAndroid.open({
            date: estimateAt
        }).then(e => {
            if (e.action !== DatePickerAndroid.dismissedAction) {
                const momentDate = estimateAt;
                momentDate.setDate(e.day);
                momentDate.setMonth(e.month);
                momentDate.setYear(e.year);
                setEstimateAt(momentDate);
                setFormatedDate(format(estimateAt, "dd'/'MM'/'yyyy"))
                console.log(estimateAt);
                console.log(formatedDate);
            }
        });
    }
    const save = () => {
        if (!desc.trim()) {
            Alert.alert('Dados invalidos', 'Informe uma descrição para a tarefa');
            return
        }
        const newTask = { desc, estimateAt };
        onHandlerSave(newTask);
        closeModal();
    }

    return (
        <Animated.View style={{ top: top, ...styles.animatedContainer }}>
            <TouchableWithoutFeedback onPress={onHandlerClose}>
                <View style={styles.offset}>
                    <View style={styles.container}>
                        <Text style={styles.header}>
                            Nova Tarefa
                        </Text>
                        <Text style={styles.dataLabel}>Descrição:</Text>
                        <TextInput placeholder="Descrição..." style={styles.input} onChangeText={text => setDesc(text)} value={desc} />
                        <Text style={styles.dataLabel}>Data:</Text>
                        <TouchableOpacity onPress={handlerDatePick}>
                            <Text style={styles.data}>
                                {formatedDate}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.formButton}>
                            <TouchableOpacity onPress={onHandlerClose}>
                                <Text style={styles.buttonCancel}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={save}>
                                <Text style={styles.buttonSave}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Animated.View >
    );
}

const styles = StyleSheet.create({
    animatedContainer: {
        flex: 1,
        position: "absolute",
        width: '100%',
        height: '100%',
        zIndex: 10
    },
    offset: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.8)',
        justifyContent: 'center'
    },
    container: {
        marginHorizontal: 10,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        elevation: 2,
        borderRadius: 6,
        overflow: 'hidden',
    },
    header: {
        fontFamily: 'Latto',
        backgroundColor: '#1631be',
        color: '#FFF',
        textAlign: 'center',
        padding: 10,
        fontSize: 15
    },
    dataLabel: {
        fontFamily: 'Latto',
        fontSize: 12,
        color: 'rgba(0,0,0,0.4)',
        marginTop: 10,
        marginBottom: 0,
        marginHorizontal: 10,
    },
    data: {
        fontFamily: 'Latto',
        fontSize: 15,
        marginHorizontal: 10,
        borderWidth: 1,
        height: 40,
        borderColor: '#e3e3e3',
        borderRadius: 6,
        width: '90%',
        paddingTop: 10,
        paddingLeft: 3
    },
    input: {
        fontFamily: 'Latto',
        fontSize: 15,
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