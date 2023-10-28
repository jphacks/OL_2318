// Todoをグループに追加


import React from 'react';
import { useState } from 'react';

export const AddTodo = () => {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [deadline, setDeadline] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // フォームデータを作成
        const formData = {
          group_id,
          name,
          content,
          deadline,
        };
    
        try {
          const response = await fetch('/todo_add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            // リクエストが成功した場合の処理
            console.log('Todo added successfully');
            // リクエストが成功したら、ここで適切な処理を行う
          } else {
            // エラーレスポンスの処理
            console.error('Failed to add todo');
          }
        } catch (error) {
          // リクエスト自体が失敗した場合の処理
          console.error('Request failed:', error);
        }
      };

    return(
        <div className={styles['box']}>
        <h2>Add Todo</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Content:
          <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <label>
          Deadline:
          <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        </label>
        <button type="submit">Add Todo</button>
      </form>
        </div>
      )
    };
    
    export default AddTodo;