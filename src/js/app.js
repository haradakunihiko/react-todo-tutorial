(function(){
    var React = require('react/addons');
    var Router = require('director').Router;

    var TodoItem = React.createClass({
        getInitialState:function(){
            return {
                editingText: ''
            }
        },
        handleChange:function(e){
            this.props.completeItem(this.props.todo.id, e.target.checked);
        },
        handleRemoveClick:function(e){
            this.props.removeItem(this.props.todo.id);
        },
        handleDoubleClick:function(e){
            this.setState({
                editingText : this.props.todo.label
            })
            this.props.startEditItem(this.props.todo.id);
        },
        handleChangeEdit:function(e){
            this.setState({
                editingText:e.target.value
            })
        },
        handleKeyDownEdit:function(e){
            if(e.which === 13){
                this.completeEditItem();
            }else if(e.which === 27){
                this.props.cancelEditItem(this.props.todo.id);
            }
        },
        handleBlurEdit:function(e){
            if(this.props.todo.editing){
                this.completeEditItem();
            }
        },
        completeEditItem:function(){
            var val = this.state.editingText.trim();
            if(val){
                this.props.completeEditItem(this.props.todo.id, val);
            }else{
                this.props.removeItem(this.props.todo.id);
            }
        },
        componentDidUpdate:function(prevProps){
            if(!prevProps.todo.editng && this.props.todo.editing){
                React.findDOMNode(this.refs.editItem).focus();
            }
        },
        render: function(){
            var todo = this.props.todo;
            var completed = todo.status === 1;
            return (
                <li className={todo.editing? "editing todo-list-item": completed ? 'completed todo-list-item' :  "todo-list-item" }>
                    <div className="todo-list-item-view-box" onDoubleClick={this.handleDoubleClick}>
                        <input className="todo-list-item-check" type="checkbox" checked={completed} onChange={this.handleChange}></input>
                        <span className="todo-list-item-label">{todo.label}</span>
                        <button className="todo-list-item-remove" type="button" onClick={this.handleRemoveClick}></button>
                    </div>
                    <div className="todo-list-item-edit-box">
                        <input
                            ref="editItem"
                            type="text"
                            value={this.state.editingText}
                            onChange={this.handleChangeEdit}
                            onKeyDown={this.handleKeyDownEdit}
                            onBlur={this.handleBlurEdit}
                            ></input>
                    </div>
                </li>
            );
        }
    });


    var TodoApp = React.createClass({
        getInitialState:function(){
            return{
                todos:[
                    {id:'_1',status:0, label:"call to mom.", editing:false},
                    {id:'_2',status:1, label:"walk the dog", editing:false},
                    {id:'_3',status:0, label:"buy groceries for dinner", editing:false}
                ],
                newTodoLabel : '',
                allChecked : false,
                filter:'all'
            }
        },
        componentDidMount:function(){
            Router({
                '/':this.setState.bind(this,{filter:'all'}),
                '/active':this.setState.bind(this,({filter:'active'})),
                '/completed': this.setState.bind(this,({filter:'completed'}))
            }).init('/');

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
        generateId : function(){
            var num = 4;
            return function(){
                return '_' + num++;
            }
        }(),
        handleNewTodoKeyPress: function(e){
            if(e.charCode == 13){
                var newTodoLabel = this.state.newTodoLabel.trim();
                if(newTodoLabel.length > 0){
                    var newTodo = {id : this.generateId(),status:0,label:newTodoLabel};
                    this.setState(
                        {
                            todos:React.addons.update(this.state.todos,{$push:[newTodo]}),
                            newTodoLabel: ''
                        }
                    );
                }
            }
        },
        handleNewTodoChange: function(e){
            this.setState({newTodoLabel:e.target.value});
        },
        handleAllCheckChange : function(e){
            this.setState(
                {
                    todos:
                        this.state.todos.map(function(todo){
                            return React.addons.update(todo,{status:{$set: (e.target.checked ? 1  : 0)}});
                        }),
                    allChecked: e.target.checked
                }

            );
        },
        removeItem:function(id){
            this.setState({
                todos: this.state.todos.filter(function(todo){
                    return todo.id !== id;
                })
            });
        },
        handleClearCompletedClick:function(e){
            this.setState({
                todos: this.state.todos.filter(function(todo){
                    return todo.status === 0;
                })
            });
        },
        startEditItem:function(id){
            this.setState({
                todos: this.state.todos.map(function(todo){
                    return  React.addons.update(todo, {editing:{$set:todo.id === id}});
                })
            });
        },
        completeEditItem:function(id,newValue){
            if(id){
                this.setState({
                    todos: this.state.todos.map(function(todo){
                        if(id === todo.id && todo.editing){
                            return  React.addons.update(todo, {editing:{$set:false},label:{$set:newValue}});
                        }else{
                            return todo;
                        }
                    })
                });
            }
        },
        cancelEditItem:function(id){
            this.setState({
                todos: this.state.todos.map(function(todo){
                    if(todo.id === id){
                        return  React.addons.update(todo, {editing:{$set:false}});
                    }else{
                        return todo;
                    }
                })
            });
        },
        render: function(){

            var todoArray = this.state.todos.filter(function(todo){

                switch (this.state.filter){
                    case 'all':
                        return true;
                    case 'active':
                        return todo.status === 0;
                    case 'completed':
                        return todo.status === 1;
                    default:
                        return true;
                }
            }.bind(this))
                .map(function(todo){
                return (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        completeItem={this.completeItem}
                        removeItem={this.removeItem}
                        startEditItem={this.startEditItem}
                        completeEditItem={this.completeEditItem}
                        cancelEditItem={this.cancelEditItem}
                        >
                    </TodoItem>
                );
            }.bind(this));
            var activeTodoCount = this.state.todos.filter(function(todo){
                return todo.status === 0;
            }).length;

            return (
                <div className="container">
                    <header>
                        <h1>todos</h1>
                    </header>
                    <section className="main-area">
                        <div className="todo-input-area">
                            <input className="check-all-todos" type="checkbox" checked={this.state.allChecked} onChange={this.handleAllCheckChange}></input>
                            <input className="todo-input" value={this.state.newTodoLabel} type="text" placeholder="What needs to be done?" onChange={this.handleNewTodoChange} onKeyPress={this.handleNewTodoKeyPress}></input>
                        </div>
                        <ul className="todo-list">
                            {todoArray}
                        </ul>
                        <footer>
                            <span>{activeTodoCount} items left</span>
                            <ul className="filter-list">
                                <li className="filter-list-item">
                                    <a href="#/" className={this.state.filter === 'all' && 'selected'}>All</a>
                                </li>
                                <li className="filter-list-item">
                                    <a href="#/active" className={this.state.filter === 'active' && 'selected'}>Active</a>
                                </li>
                                <li className="filter-list-item">
                                    <a href="#/completed" className={this.state.filter === 'completed' && 'selected'}>Completed</a>
                                </li>
                            </ul>
                            <button type="button" className="clear-completed" onClick={this.handleClearCompletedClick}>clear completed</button>
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

