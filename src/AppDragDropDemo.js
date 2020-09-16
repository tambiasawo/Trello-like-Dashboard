import React, { Component } from "react";
import "./App.css";

export default class AppDragDropDemo extends Component {
  state = {
    tasks: [
      { name: "Learn Angular", category: "wip", bgcolor: "yellow" },
      { name: "React", category: "complete", bgcolor: "pink" },
      { name: "Vue", category: "complete", bgcolor: "skyblue" },
      { name: "Learn Bootstrap", category: "todo", bgcolor: "yellow" },
      { name: "Learn Ruby", category: "todo", bgcolor: "yellow" }
    ]
  };
  onDragStart = (ev, id, col) => {
    console.log("dragstart:", id);
    console.log("Color:", col);
    ev.dataTransfer.setData("id", id);
  };

  onDragOver = (ev) => {
    ev.preventDefault();
  };

  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");
    //let col = ev;
    //console.log(ev);
    let tasks = this.state.tasks.filter((task) => {
      if (task.name === id) {
        task.category = cat;
      }
      return task;
    });

    this.setState({
      ...this.state,
      tasks
    });
  };

  render() {
    // render performs what we actually want to do in our code, it renders the dynamic aspect of our code
    var tasks1 = {
      todo: [],
      wip: [],
      complete: []
    };

    this.state.tasks.forEach((t) => {
      tasks1[t.category].push(
        <div
          // key={t.name} // like an id
          onDragStart={(e) => this.onDragStart(e, t.name, t.bgcolor)} //to know which element is being dragged use the onDrag Start event
          draggable //to make this div elem draggable
          className="draggable"
        >
          {t.name}
        </div>
      );
    });

    return (
      <div className="container-drag">
        <h2 className="header">DRAG & DROP DEMO</h2>
        <div
          className="todo"
          onDragOver={(e) => this.onDragOver(e)} //this makes it possile for you to return a compketed item to WIP
          onDrop={(e) => {
            //this makes it possible for you to actually drop the elem in another pane or the same one
            this.onDrop(e, "todo");
          }}
        >
          <div> </div>
          <h3 className="task-header">Todo</h3>
          {tasks1.todo}
        </div>

        <div
          className="wip"
          onDragOver={(e) => this.onDragOver(e)} //this makes it possile for you to return a compketed item to WIP
          onDrop={(e) => {
            //this makes it possible for you to actually drop the elem in another pane or the same one
            this.onDrop(e, "wip");
          }}
          style={{ backgroundColor: this.isDraggingOver ? "#5bc0de" : "pink" }}
        >
          <h3 className="task-header">WIP</h3>
          {tasks1.wip}
        </div>
        <div
          className="completed"
          onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e) => this.onDrop(e, "complete")}
        >
          <h3 className="task-header">Completed</h3>
          {tasks1.complete}
        </div>
      </div>
    );
  }
}
