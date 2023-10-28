import React, { useState } from 'react'

export const GetTodos = () => {
    const [groupID, setGroupID] = useState(""); // グループIDを入力
    const [todos, setTodos] = useState([]); // 取得したToDoのリスト
  
    const handleGroupIDChange = (event) => {
      setGroupID(event.target.value);
    };
  
    const handleGetTodos = async () => {
      try {
        const response = await fetch(`/get_todo_group/?group_id=${groupID}`);
  
        if (response.ok) {
          const data = await response.json();
          setTodos(data.todos); // 取得したToDoのリストをセット
        } else {
          console.error("ToDoの取得に失敗しました");
        }
      } catch (error) {
        console.error("ToDoの取得に失敗しました:", error);
      }
    };

    return(
        <div>
      <h2>ToDoリストを取得</h2>
      <input
        type="number"
        placeholder="グループID"
        value={groupID}
        onChange={handleGroupIDChange}
      />
      <button onClick={handleGetTodos}>ToDoリストを取得</button>
      <div>
        <h3>ToDoリスト:</h3>
        <ul>
          {todos.map((todo) => (
            <li key={todo.todo_id}>
              {todo.name} - {todo.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
      )
    };
    
    export default GetTodos