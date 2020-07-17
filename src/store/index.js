import { createStore, combineReducers } from "redux";
import uuid from "react-uuid";
import {
  ADD_TODO,
  TOGGLE_TODO,
  TOGGLE_ALL_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  CLEAR_COMPLETED,
  CHANGE_TAB,
} from "./types";

var initialState = {
  allTodos: [],
  activeTab: "ALL_TODO",
};

// Reducers

function allTodoReducer(state = initialState.allTodos, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: uuid(),
          text: action.payload,
          isDone: false,
        },
      ];

    case TOGGLE_TODO:
      return state.reduce((acc, cv) => {
        if (cv.id === action.payload) {
          cv.isDone = !cv.isDone;
        }
        acc.push(cv);
        return acc;
      }, []);

    case TOGGLE_ALL_TODO:
      var noOfCompletedTask = state.filter((task) => task.isDone).length;
      var length = state.length;

      if (noOfCompletedTask < length) {
        return state.map((task) => {
          if (!task.isDone) {
            task.isDone = true;
          }
          return task;
        });
      } else {
        return state.map((task) => {
          task.isDone = false;
          return task;
        });
      }

    case DELETE_TODO:
      return state.filter((task) => task.id !== action.payload);

    case UPDATE_TODO:
      return state.map((task) => {
        if (task.id === action.id) {
          task.text = action.text;
        }
        return task;
      });

    case CLEAR_COMPLETED:
      return state.filter((task) => !task.isDone);

    default:
      return state;
  }
}

function activeTabReducer(state = initialState.activeTab, action) {
  switch (action.type) {
    case CHANGE_TAB:
      return action.payload;

    default:
      return state;
  }
}

var rootReducer = combineReducers({
  allTodos: allTodoReducer,
  activeTab: activeTabReducer,
});


export var store = createStore(rootReducer);
