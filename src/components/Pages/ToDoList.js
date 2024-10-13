import React, { useState } from "react";
import Navbar from '../GeneralComponents/Navbar';
import '../../styles/ToDoList.css'; // For basic styling

// Single ToDo Item Component
const ToDoItem = ({ item, toggleComplete, addSubTask, changePriority, level = 0 }) => {
  const [showSubTaskInput, setShowSubTaskInput] = useState(false);
  const [newSubTask, setNewSubTask] = useState("");

  const handleAddSubTask = () => {
    addSubTask(item.id, newSubTask);
    setNewSubTask("");
    setShowSubTaskInput(false);
  };

  return (
    <div style={{ marginLeft: `${level * 20}px` }} className="todo-item">
      <div className="todo-header">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => toggleComplete(item.id)}
        />
        <span className={`task ${item.completed ? "completed" : ""}`}>
          {item.task}
        </span>
        <span className="date">Added on: {item.dateAdded}</span>
        <span className={`priority priority-${item.priority.toLowerCase()}`}>
          Priority:
          <select
            value={item.priority}
            onChange={(e) => changePriority(item.id, e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </span>
        <span className={`category-label ${item.category.toLowerCase()}`}>
          {item.category}
        </span>
        <button onClick={() => setShowSubTaskInput(!showSubTaskInput)}>
          Add Subtask
        </button>
      </div>

      {/* Show Subtask Input */}
      {showSubTaskInput && (
        <div className="subtask-input">
          <input
            type="text"
            value={newSubTask}
            onChange={(e) => setNewSubTask(e.target.value)}
            placeholder="Enter subtask"
          />
          <button onClick={handleAddSubTask}>Add</button>
        </div>
      )}

      {/* Recursively render sublists */}
      {item.subTasks && item.subTasks.length > 0 && (
        <div className="sublist">
          {item.subTasks.map((subItem) => (
            <ToDoItem
              key={subItem.id}
              item={subItem}
              toggleComplete={toggleComplete}
              addSubTask={addSubTask}
              changePriority={changePriority}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Main ToDo List Component
const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Low");
  const [category, setCategory] = useState("Miscellaneous");
  const [customCategories, setCustomCategories] = useState([
    "Work",
    "Personal",
    "Urgent",
    "Hobby",
    "Miscellaneous"
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [showCategoryManagement, setShowCategoryManagement] = useState(false); // New state for toggling category management

  const addTask = () => {
    const newItem = {
      id: Date.now(),
      task: newTask,
      priority,
      category, // Assign selected category
      dateAdded: new Date().toLocaleDateString(),
      completed: false,
      subTasks: [],
    };
    setTasks([...tasks, newItem]);
    setNewTask("");
  };

  const toggleComplete = (id) => {
    const toggleTaskCompletion = (items) => {
      return items.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        if (item.subTasks.length > 0) {
          return { ...item, subTasks: toggleTaskCompletion(item.subTasks) };
        }
        return item;
      });
    };
    setTasks(toggleTaskCompletion(tasks));
  };

  const addSubTask = (parentId, task) => {
    const addSubtaskToParent = (items) => {
      return items.map((item) => {
        if (item.id === parentId) {
          const newSubTask = {
            id: Date.now(),
            task,
            priority: "Low",
            category: item.category, // Subtask inherits the category of the parent task
            dateAdded: new Date().toLocaleDateString(),
            completed: false,
            subTasks: [],
          };
          return { ...item, subTasks: [...item.subTasks, newSubTask] };
        }
        if (item.subTasks.length > 0) {
          return { ...item, subTasks: addSubtaskToParent(item.subTasks) };
        }
        return item;
      });
    };
    setTasks(addSubtaskToParent(tasks));
  };

  const changePriority = (id, newPriority) => {
    const updatePriority = (items) => {
      return items.map((item) => {
        if (item.id === id) {
          return { ...item, priority: newPriority };
        }
        if (item.subTasks.length > 0) {
          return { ...item, subTasks: updatePriority(item.subTasks) };
        }
        return item;
      });
    };
    setTasks(updatePriority(tasks));
  };

  const handleAddCategory = () => {
    if (newCategory && !customCategories.includes(newCategory)) {
      setCustomCategories([...customCategories, newCategory]);
      setNewCategory("");
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setCustomCategories(customCategories.filter((cat) => cat !== categoryToRemove));
  };

  const filterTasksByCategory = (tasks) => {
    if (filterCategory === "All") return tasks;
    return tasks.filter(task => task.category === filterCategory);
  };

  return (
    <div>
      <Navbar />
      <div className="todo-list-container">
        <h1>To-Do List</h1>

        <div className="new-task-form">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {customCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button onClick={addTask}>Add Task</button>
        </div>

        {/* Manage Categories Button */}
        <button onClick={() => setShowCategoryManagement(!showCategoryManagement)}>
          {showCategoryManagement ? "Hide Category Management" : "Manage Categories"}
        </button>

        {/* Category Management */}
        {showCategoryManagement && (
          <div className="category-management">
            <h3>Manage Categories</h3>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Add new category"
            />
            <button onClick={handleAddCategory}>Add Category</button>
            <ul>
              {customCategories.map((cat) => (
                <li key={cat}>
                  {cat}
                  {cat !== "Miscellaneous" && (
                    <button onClick={() => handleRemoveCategory(cat)}>Remove</button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="filter-category">
          <label>Filter by Category: </label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All</option>
            {customCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="task-list">
          {filterTasksByCategory(tasks).map((item) => (
            <ToDoItem
              key={item.id}
              item={item}
              toggleComplete={toggleComplete}
              addSubTask={addSubTask}
              changePriority={changePriority}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
