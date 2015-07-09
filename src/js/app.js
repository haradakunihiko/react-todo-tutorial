(function(){
    var React = require('react/addons');

    var TodoItem = React.createClass({
        handleChange:function(e){
            this.props.completeItem(this.props.todo.id, e.target.checked);
        },
        render: function(){
            var todo = this.props.todo;
            var completed = todo.status === 1;
            return (
                <li className={completed ? 'completed todo-list-item' : "todo-list-item" }>
                    <div className="todo-list-item-view-box">
                        <input className="todo-list-item-check" type="checkbox" checked={completed} onChange={this.handleChange}></input>
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
        completeItem:function(id,completed){
            var newTodos = this.state.todos.map(function(todo, index){
                if(todo.id === id){
                    return React.addons.update(todo,{status: {$set : (completed ? 1 : 0) }});
                }else{
                    return todo;
                }
            });
            this.setState({todos:newTodos});
        },
        render: function(){

            var todoArray = this.state.todos.map(function(todo){
                return <TodoItem key={todo.id} todo={todo} completeItem={this.completeItem}></TodoItem>
            }.bind(this));


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

