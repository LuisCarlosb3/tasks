import AsyncStorage from '@react-native-community/async-storage';

export const initTasks = async () => {
    try {
        const value = await AsyncStorage.getItem('tasks');
        if (value === null)
            AsyncStorage.setItem('tasks', JSON.stringify([]));
    } catch (e) {
        console.log(`${e}`);
    }
}
export const getTasks = async () => {
    try {
        const tasks = await AsyncStorage.getItem('tasks');
        return JSON.parse(tasks);
    } catch (e) {
        console.log(`${e}`);
    }
}
export const addTask = async (newTask) => {
    try {
        const tasks = await getTasks();
        tasks.push(newTask);
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (e) {
        console.log(`${e}`);
    }
}
export const removeTask = async (id) => {
    try {
        const tasks = await getTasks();
        const modifiedTasks = tasks.filter(task => task.id !== id);
        await AsyncStorage.setItem('tasks', JSON.stringify(modifiedTasks));
    } catch (e) {
        console.log(`${e}`);
    }
}
