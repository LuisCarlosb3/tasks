import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { format, set } from 'date-fns';
import commonStyles from '../assets/styles'
import todayImage from '../assets/imgs/today.jpg'
import Tasks from '../components/Tasks'
const App = () => {
  const formattedDate = format(new Date(), "dd 'do' MM 'de' yyyy", { locale: '' });
  const [tasks, setTasks] = useState([
    { id: `${Math.random()}`, desc: 'Comprar curso', estimateAt: new Date(), doneAt: new Date() },
    { id: `${Math.random()}`, desc: 'Concluir curso', estimateAt: new Date(), doneAt: null },
  ]);
  const [visibleTasks, setVisibleTasks] = useState([]);
  const [showDoneTasks, setShowDoneTasks] = useState(true);

  const onTaskHandler = (id) => {
    const task = tasks.map(task => {
      return (task.id === id) ? { ...task, doneAt: task.doneAt !== null ? null : new Date() } : task;
    });
    setTasks(task);
  }
  const filterTask = () => {
    if (showDoneTasks) {
      setVisibleTasks(tasks);
    } else {
      const pedding = tasks.filter(task => task.doneAt === null);
      setVisibleTasks(pedding);
    }
  }
  const onHandlerFilter = () => {
    setShowDoneTasks(!showDoneTasks);
  }

  useEffect(() => {
    filterTask();
  }, [showDoneTasks, tasks]);
  const renderItem = itemData => {
    return (
      <Tasks
        id={itemData.item.id}
        doneAt={itemData.item.doneAt}
        desc={itemData.item.desc}
        estimateAt={itemData.item.estimateAt}
        onTaskHandler={onTaskHandler}
      />
    )
  }

  return (
    <View style={commonStyles.container}>
      <ImageBackground source={todayImage} style={styles.background}>
        <View style={styles.iconBar}>
          <TouchableOpacity onPress={onHandlerFilter}>
            <Icon name={showDoneTasks ? 'eye' : 'eye-slash'} size={20} color={'#F0F0F0'} />
          </TouchableOpacity>
        </View>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Hoje</Text>
          <Text style={styles.subtitle}>
            {formattedDate}
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.taskContainer}>
        <FlatList
          extraData={tasks}
          data={visibleTasks}
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
  iconBar: {
    marginTop: Platform.OS === 'ios' ? 30 : 10,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: 'flex-end'
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
