(function(){
    var React = require('react/addons');

    var TodoApp = React.createClass({
        render: function(){
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
                            <li className="todo-list-item">
                                <div className="todo-list-item-view-box">
                                    <input className="todo-list-item-check" type="checkbox"></input>
                                    <span className="todo-list-item-label">aiueo</span>
                                    <button className="todo-list-item-remove" type="button"></button>
                                </div>
                                <div className="todo-list-item-edit-box">
                                    <input type="text"></input>
                                </div>
                            </li>
                            <li className="todo-list-item completed">
                                <div className="todo-list-item-view-box">
                                    <input className="todo-list-item-check" type="checkbox"></input>
                                    <span className="todo-list-item-label">kakiku</span>
                                    <button className="todo-list-item-remove" type="button"></button>
                                </div>
                                <div className="todo-list-item-edit-box">
                                    <input type="text"></input>
                                </div>
                            </li>
                            <li className="todo-list-item editing">
                                <div className="todo-list-item-view-box">
                                    <input className="todo-list-item-check" type="checkbox"></input>
                                    <span className="todo-list-item-label">kakiku</span>
                                    <button className="todo-list-item-remove" type="button"></button>
                                </div>
                                <div className="todo-list-item-edit-box">
                                    <input type="text"></input>
                                </div>
                            </li>
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

