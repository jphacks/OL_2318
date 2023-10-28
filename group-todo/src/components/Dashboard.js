//グループ一覧を取得

import React from 'react';
import styles from '../index.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupAddForm from './GroupAddForm';
import GetGroup from './GetGroup';
export const Dashboard = () => {
    const navigate = useNavigate();
    const [groups, setGroup] = useState([]);
    const url = '/groups'

    const handleLogout = () => {
        // トークンの削除やセッションのクリアなど、ログアウトに関する処理を実装する

        // 例: ローカルストレージからトークンを削除
        localStorage.removeItem('token');
        localStorage.removeItem('nickname');
        // ログアウト後にログインページにリダイレクトする
        navigate('/login');
        console.log("ログアウトしました。")
    };

    async function fetchFunc() {
        try {
          const res = await fetch(url);
          if (!res.ok) {
            throw new Error("fetchに失敗しました");
          }
  
          const data = await res.json();
          if (data.length > 0) {
            setGroup(data);
          } else {
            throw new Error("json化に失敗しました");
          }
        } catch (error) {
          console.log(error);
        }
      }
  
      useEffect(() => {
          fetchFunc();
        }, []);

    return(
        <div className={styles['box']}>
        <h2>Dashboard</h2>
            {localStorage.getItem('token') && (
                <p>Welcome, {localStorage.getItem('nickname')}!</p>
            )}
            <button type="button" onClick={handleLogout}>
                Logout
            </button>
            <GroupAddForm />
            <GetGroup />
        </div>
        
      )
    };
    
    export default Dashboard