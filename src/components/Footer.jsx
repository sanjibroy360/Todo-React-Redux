import React, { Component } from "react";
import { connect } from "react-redux";
import { CHANGE_TAB, CLEAR_COMPLETED } from "../store/types";

class Footer extends Component {
  handleChangeTab = (event, activeTab) => {
    return this.props.dispatch({
      type: CHANGE_TAB,
      payload: activeTab,
    });
  };
  
  handleClearCompleted = () => {
    return this.props.dispatch({
      type: CLEAR_COMPLETED
    })
  }

  render() {
    var { allTodos, activeTab } = this.props;
    var itemLeft = allTodos.filter((todo) => !todo.isDone).length;
    return (
      <footer
        className={
          !allTodos.length && activeTab === "ALL_TODO" ? "hidden" : "visible"
        }
      >
        <div className="footer footer_flex2">
          <span className="item_left">
            {itemLeft > 1 ? `${itemLeft} items left` : `${itemLeft} item left`}
          </span>
          <ul className="footer_list footer_flex">
            <li
              className={
                this.props.activeTab === "ALL_TODO" ? "all selected" : "all"
              }
              onClick={(event) => this.handleChangeTab(event, "ALL_TODO")}
            >
              All
            </li>
            <li
              className={
                this.props.activeTab === "ALL_ACTIVE_TODOS"
                  ? "active selected"
                  : "active"
              }
              onClick={(event) =>
                this.handleChangeTab(event, "ALL_ACTIVE_TODOS")
              }
            >
              Active
            </li>
            <li
              className={
                this.props.activeTab === "ALL_COMPLETED_TODOS"
                  ? "completed selected"
                  : "completed"
              }
              onClick={(event) =>
                this.handleChangeTab(event, "ALL_COMPLETED_TODOS")
              }
            >
              Completed
            </li>
          </ul>
          <span
            className={
              itemLeft !== allTodos.length
                ? "clear_completed visible"
                : "clear_completed hidden"
            }
            onClick={this.handleClearCompleted}
          >
            Clear completed
          </span>
        </div>
      </footer>
    );
  }
}

export default connect((state) => state)(Footer);
