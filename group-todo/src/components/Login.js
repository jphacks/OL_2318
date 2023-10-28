import React from 'react';
import styles from '../index.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const navigate = useNavigate();
    
        const handleLogin = () => {
            // ログインの処理を実装する
            if (email.trim() !== '' && password.trim() !== '') {
                // ログイン成功の場合、トークンを保存するなどの処理を行う
                console.log("ログインに成功しました。");
                // 例: トークンをローカルストレージに保存する
                localStorage.setItem('token', 'example_token');
    
                // ダッシュボードページにリダイレクトする
                navigate('/dashboard');
            } else {
                // ログイン失敗の場合の処理を行う（例: エラーメッセージの表示）
                console.log('ログインに失敗しました');
            }
        };

    return(
        <div className={styles['box']}>
        <h2>ユーザーログイン</h2>
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
                <button type="button" onClick={handleLogin}>
                    ログイン
                </button>
            </form>
        </div>
      )
    };

    export default Login