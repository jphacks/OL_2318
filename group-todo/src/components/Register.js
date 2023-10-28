// ユーザーの追加

import React from 'react';
import styles from '../index.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [nickname, setNickname] = useState('');
        const navigate = useNavigate();
        useEffect(() => {
            ResisterUser();
        }, []);
    
        const ResisterUser = async () => {
            try {
                const formData = {
                    email,
                    password,
                    nickname
                };
    
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                };
    
                const apiUrl = 'user_add';
    
                const response = await fetch(apiUrl, requestOptions);
                if (!response.ok) {
                    throw new Error('登録に失敗');
                }
    
                const data = await response.json();
                console.log('登録に成功', data);
                // ここでトークンを保存するなどの処理を行う
                localStorage.setItem('nickname', JSON.stringify(nickname)); 
                // nicknameを文字列としてローカルストレージに保存
            } catch (error) {
                console.error('登録に失敗:', error);
            }
        };
    
        const handleRegister = () => {
            ResisterUser();
            navigate('/login'); // 登録後にログインページにリダイレクト
        };

    return(
        <div className={styles['box']}>
        <h2>ユーザー新規登録</h2>
            <form>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)} // nicknameの入力値を更新する
                />
                <button type="button" onClick={handleRegister}>
                    登録
                </button>
            </form>
        </div>
      )
    };
    
    export default Register;