import React, { Component } from "react";
import { connect } from "react-redux";
import { TOGGLE_TODO, DELETE_TODO, UPDATE_TODO } from "../store/types";

class TodoListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replace: false,
      todoText: "",
      todoId: "",
    };
  }

  handleTick = (event, todoId) => {
    return this.props.dispatch({
      type: TOGGLE_TODO,
      payload: todoId,
    });
  };

  handleDeleteTodo = (event, todoId) => {
    console.log(todoId)
    return this.props.dispatch({
      type: DELETE_TODO,
      payload: todoId,
    });
  };

  handleReplaceElement = (event, todoId) => {
    console.log(event.target.innerText);
    return this.setState({
      replace: true,
      todoText: event.target.innerText,
      todoId,
    });
  };

  handleUpdateTodo = (event, todoId) => {
    console.log(event.key);
    if (event.key.toUpperCase() === "ENTER" && event.target.value.trim()) {
      this.props.dispatch({
        type: UPDATE_TODO,
        id: todoId,
        text: event.target.value,
      });
      return this.setState({ replace: false });
    }
  };

  getTodoList = (allTodos, activeTab) => {
    switch (activeTab) {
      case "ALL_TODO":
        return allTodos;
      case "ALL_ACTIVE_TODOS":
        return allTodos.filter((todo) => !todo.isDone);
      case "ALL_COMPLETED_TODOS":
        return allTodos.filter((todo) => todo.isDone);
      default:
        return allTodos;
    }
  };

  render() {
    var { replace, todoText, todoId } = this.state;
    var { allTodos, activeTab } = this.props;
    var todos = this.getTodoList(allTodos, activeTab);
    return (
      <>
        {todos.map((todo) => {
          return (
            <li className="flex list_item">
              {!replace || todo.id !== todoId? (
                
                <>
                  <input
                    type="checkbox"
                    id={todo.id}
                    key={todo.id}
                    className="check"
                  />

                  <label
                    htmlFor={todo.id}
                    onClick={(event) => this.handleTick(event, todo.id)}
                  >
                    <div className="tick_wrapper">
                      {todo.isDone ? (
                        <img
                          src="./images/tick.png"
                          alt="Tick"
                          className="tick_mark"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </label>
                  <p
                    className={todo.isDone ? "todo_show strike" : "todo_show"}
                    onDoubleClick={(event) =>
                      this.handleReplaceElement(event, todo.id)
                    }
                  >
                    {todo.text}
                  </p>
                  <span
                    className="delete"
                    onClick={(event) => this.handleDeleteTodo(event, todo.id)}
                  >
                    ✕
                  </span>
                </>
              ) : (
                <input
                  type="text"
                  value={todoText}
                  onKeyDown={(event) => this.handleUpdateTodo(event, todoId)}
                  onChange={(event) =>
                    this.setState({ todoText: event.target.value })
                  }
                  className="todo_input edit"
                />
              )}
            </li>
          );
        })}
      </>
    );
  }
}

export default connect((state) => ({ allTodos: state.allTodos }))(
  TodoListItems
);
