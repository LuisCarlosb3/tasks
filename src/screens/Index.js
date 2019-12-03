import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList } from 'react-native';

import commonStyles from '../assets/styles'
import todayImage from '../assets/imgs/today.jpg'
import Tasks from '../components/Tasks'
const App = () => {
  const [tasks, setTasks] = useState([
    { id: `${Math.random()}`, desc: 'Comprar curso', estimateAt: new Date(), doneAt: new Date() },
    { id: `${Math.random()}`, desc: 'Concluir curso', estimateAt: new Date(), doneAt: null },
  ]);
  const formattedDate = new Date().toLocaleDateString('pt-br');

  const renderItem = itemData => {
    console.log(itemData);
    return (
      <Tasks
        doneAt={itemData.item.doneAt}
        desc={itemData.item.desc}
        estimateAt={itemData.item.estimateAt}
      />
    )
  }

  return (
    <View style={commonStyles.container}>
      <ImageBackground source={todayImage} style={styles.background}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Hoje</Text>
          <Text style={styles.subtitle}>
            {formattedDate}
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.taskContainer}>
        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 3,
    width: '100%'
  },
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'column',
    width: '100%',
  },
  title: {
    fontFamily: 'Latto',
    color: '#F0F0F0',
    fontSize: 50,
    marginRight: 20,
    marginBottom: 30
  },
  subtitle: {
    fontFamily: 'Latto',
    color: '#F0F0F0',
    fontSize: 20,
    marginRight: 20,
    marginBottom: 30
  },
  taskContainer: {
    flex: 7,
    width: '100%',
    paddingHorizontal: 20
  }
});
export default App;
