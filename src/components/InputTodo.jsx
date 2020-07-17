import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ADD_TODO,
  TOGGLE_TODO,
  TOGGLE_ALL_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  CLEAR_COMPLETED,
  CHANGE_TAB,
} from "../store/types";

class InputTodo extends Component {
  handleInput = (event) => {
    if (event.keyCode === 13 && event.target.value.trim()) {
      this.props.dispatch({
        type: ADD_TODO,
        payload: event.target.value,
      });

      event.target.value = "";
      return;
    }
  };

  handleToggleAllTodo = (event) => {
    return this.props.dispatch({
      type: TOGGLE_ALL_TODO,
    });
  };
  render() {
    return (
      <header className="input_sec">
        <span
          className={
            this.props.allTodos && this.props.allTodos.length 
              ? "down_arrow_wrapper visible"
              : "down_arrow_wrapper hidden"
          }
          onClick={this.handleToggleAllTodo}
        >
          <i className="fas fa-chevron-down down_arrow"></i>
        </span>
        <h1 className="heading">todos</h1>
        <input
          type="text"
          placeholder="What needs to be done?"
          className="todo_input"
          onKeyDown={this.handleInput}
        />
      </header>
    );
  }
}

export default connect((state) => state)(InputTodo);
