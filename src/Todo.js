import React, { useState } from 'react';
import { useEffect } from 'react';

function Todo() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    // Save tasks to local storage when the component is first rendered
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            setTasks(savedTasks);
        }
    }, []);

    // Save tasks to local storage whenever the tasks array changes
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);




    const handleSubmit = (e) => {
        e.preventDefault();
        setTasks([...tasks, newTask]);
        setNewTask('');
    }

    const handleDelete = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    }

    //export function

    const handleExport = () => {
        // Create a new Blob object with the tasks array as its content
        const blob = new Blob([tasks.join('\n')], { type: 'text/plain' });

        // Create a URL that can be used to refer to the blob object
        const url = URL.createObjectURL(blob);

        // Create an anchor tag
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'tasks.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    //remove all

    const handleRemoveAll = () => {
        setTasks([]);
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="New Task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button type="submit">Add Task</button>
            </form>
            <ul>
                {tasks.map((task, index) => (
                    <li className="task-item" key={index}>

                        <p className="task">{task}</p>
                        <button className="delete" onClick={() => handleDelete(index)}>
                            Delete
                        </button>

                    </li>
                ))}
            </ul>
            <button className='export' onClick={handleExport}>Export</button>
            <button className='removeall' onClick={handleRemoveAll}>Clear All</button>


        </div>
        
    );
}

export default Todo;
