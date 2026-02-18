import {createStore,applyMiddleware} from "redux"
import {thunk} from "redux-thunk"
const initialState = {
    tasks: []
}

const Taskreducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TASK":
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
        case "DELETE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter((task, index) => index !== action.payload)
            }
        default:
            return state
    }
}

export const store = createStore(Taskreducer,applyMiddleware(thunk))
console.log(store)

export const addTaskAction = (task) => {
    return {
        type: "ADD_TASK",
        payload: task
    }
}

export const deleteTaskAction = (taskId) => {
    return {
        type: "DELETE_TASK",
        payload: taskId
    }
}

export const fetchTasksAction = () => {
    return async (dispatch) => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
            const data = await response.json()
            dispatch({
                type: "ADD_TASK",
                payload: data.map(task => task.title)
            })       
        } catch (error) {
            console.error("Error fetching tasks:", error)
        }   
    }
}


store.dispatch(addTaskAction("Learn React"))
store.dispatch(addTaskAction("Learn Redux"))


