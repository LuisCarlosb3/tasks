import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform, Container } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { format } from 'date-fns';
import commonStyles from '../assets/styles'
import todayImage from '../assets/imgs/today.jpg'
import Tasks from '../components/Tasks'
import ActionButton from 'react-native-action-button';
import AddTask from '../components/AddTask';

import { initTasks, getTasks, addTask, removeTask } from '../store/TaskStore';
async function initData() {
  await initTasks();
}
const App = () => {
  initData();
  const formattedDate = format(new Date(), "dd 'do' MM 'de' yyyy", { locale: '' });
  const [tasks, setTasks] = useState();

  const [showDoneTasks, setShowDoneTasks] = useState(true);
  const [showAddTasks, setShowAddTasks] = useState(false);

  useEffect(() => {
    startData();
  }, []);
  const startData = async () => {
    const data = await getTasks();
    setTasks(data);
  }
  const onTaskHandler = (id) => {
    const task = tasks.map(task => {
      return (task.id === id) ? { ...task, doneAt: task.doneAt !== null ? null : new Date() } : task;
    });
    setTasks(task);
  }
  const onDeleteHandler = (id) => {
    removeTask(id).then(() => {
      startData();
    })
  }
  const onHandlerFilter = () => {
    setShowDoneTasks(!showDoneTasks);
  }


  const addNewTask = async (newTask) => {
    const newTaskObj = { id: `${Math.random()}`, desc: newTask.desc, estimateAt: format(newTask.estimateAt, "dd'/'MM'/'yyyy"), doneAt: null };
    await addTask(newTaskObj);
    await startData();
    setShowAddTasks(false);
    // setTasks(newTasks => [...newTasks, { id: `${Math.random()}`, desc: newTask.desc, estimateAt: newTask.estimateAt, doneAt: null }]);
  }


  const renderItem = itemData => {
    if (!showDoneTasks && itemData.item.doneAt !== null)
      return

    return (
      <Tasks
        id={itemData.item.id}
        doneAt={itemData.item.doneAt}
        desc={itemData.item.desc}
        estimateAt={itemData.item.estimateAt}
        onTaskHandler={onTaskHandler}
        onDeleteHandler={onDeleteHandler}
      />
    )
  }
  return (
    <>
      <View style={commonStyles.container}>
        <AddTask onHandlerSave={addNewTask} onHandlerClose={() => setShowAddTasks(false)} isOpen={showAddTasks} />
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
            data={tasks}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        </View>
        <ActionButton buttonColor={'#b71c1c'} onPress={() => setShowAddTasks(true)} />
      </View>
    </>

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
  }
});
export default App;
