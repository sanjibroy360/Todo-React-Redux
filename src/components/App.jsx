import React, { Component } from 'react';
import InputTodo from "./InputTodo";
import TodoList from "./TodoList";
import Footer from "./Footer";

class App extends Component {
    render() {
        return (
            <div>
                <InputTodo />
                <TodoList />
                <Footer />
            </div>
        );
    }
}

export default App;