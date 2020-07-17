import { connect } from "react-redux";
import React, { Component } from "react";
import TodoListItems from "./TodoListItems";

class TodoList extends Component {
  render() {
    return (
      <ul className="todo_list">
        <TodoListItems
          todos={this.props.allTodos}
          activeTab={this.props.activeTab}
        />
      </ul>
    );
  }
}

export default connect((state) => state)(TodoList);
