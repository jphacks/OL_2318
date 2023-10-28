//グループ一覧を取得

import React from 'react';
import styles from '../index.module.css';
import GroupAddForm from './PostGroupForm';

export const Dashboard = () => {
 
    return(
        <div className={styles['box']}>
            <GroupAddForm />
        </div>
        
      )
    };
    
    export default Dashboard