(function(){
    var React = require('react/addons');

    var TodoItem = React.createClass({
        render: function(){
            var todo = this.props.todo;
            var completed = todo.status === 1;
            return (
                <li className={completed ? 'completed todo-list-item' : "todo-list-item" }>
                    <div className="todo-list-item-view-box">
                        <input className="todo-list-item-check" type="checkbox" checked={completed}></input>
                        <span className="todo-list-item-label">{todo.label}</span>
                        <button className="todo-list-item-remove" type="button"></button>
                    </div>
                    <div className="todo-list-item-edit-box">
                        <input type="text"></input>
                    </div>
                </li>
            );
        }
    });

    var TodoApp = React.createClass({
        getInitialState:function(){
            return{
                todos:[
                    {id:'_1',status:0, label:"call to mom."},
                    {id:'_2',status:1, label:"walk the dog"},
                    {id:'_3',status:0, label:"buy groceries for dinner"}
                ]
            }
        },
        render: function(){

            var todoArray = this.state.todos.map(function(todo){
                return <TodoItem key={todo.id} todo={todo}></TodoItem>
            });

            return (
                <div className="container">
                    <header>
                        <h1>todos</h1>
                    </header>
                    <section className="main-area">
                        <div className="todo-input-area">
                            <input className="check-all-todos" type="checkbox" ></input>
                            <input className="todo-input" type="text" placeholder="What needs to be done?"></input>
                        </div>
                        <ul className="todo-list">
                            {todoArray}
                        </ul>
                        <footer>
                            <span>1 item left</span>
                            <ul className="filter-list">
                                <li className="filter-list-item">
                                    <a href="#all" className="selected">All</a>
                                </li>
                                <li className="filter-list-item">
                                    <a href="#active" >Active</a>
                                </li>
                                <li className="filter-list-item">
                                    <a href="#completed" >Completed</a>
                                </li>
                            </ul>
                            <button type="button" className="clear-completed">clear completed</button>
                        </footer>
                    </section>
                </div>
            );
        }
    });

    React.render(
        <TodoApp></TodoApp>,
        document.getElementById('todo-app')
    );
})();

