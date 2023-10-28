// ユーザーの追加

import React from 'react';
import styles from '../index.module.css';
import { useState } from 'react';

export const PostUserForm = () => {
    const [userName, setUserName] = useState("");
  
    const handleUserNameChange = (event) => {
      setUserName(event.target.value);
    };
  
    const handleUserAdd = async () => {
      try {
        const response = await fetch("/user_add/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_name: userName }),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("新規ユーザーid:", data.user_id);
        } else {
          console.error("ユーザーの作成に失敗");
        }
      } catch (error) {
        console.error("ユーザーの作成に失敗:", error);
      }
    };
    

    return(
        <div className={styles['box']}>
        <h2>ユーザー新規登録</h2>
        <input
        type="text"
        placeholder="ユーザーネーム"
        value={userName}
        onChange={handleUserNameChange}
      />
      <button onClick={handleUserAdd}>ユーザーを追加</button>
        </div>
      )
    };
    
    export default PostUserForm;