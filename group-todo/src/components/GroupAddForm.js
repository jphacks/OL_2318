import React from 'react';
import { useState } from 'react';

export const GroupAddForm = () => {
  const [groupName, setGroupName] = useState(''); // グループ名
  const [groupDetail, setGroupDetail] = useState(''); // グループの詳細情報（オプション）
  const [groupId, setGroupId] = useState(''); // レスポンスから取得したグループID
  const [error, setError] = useState(null); // エラーメッセージ

  const handleInputChange = (e) => {
    if (e.target.name === 'group_name') {
      setGroupName(e.target.value);
    } else if (e.target.name === 'group_detail') {
      setGroupDetail(e.target.value);
    }
  }

  const handleSubmit = () => {
    const data = {
      group_name: groupName,
      detail: groupDetail,
    };

    fetch('/group_add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('グループの追加に失敗しました');
      }
    })
    .then((data) => {
      setGroupId(data.group_id);
      setError(null);
    })
    .catch((error) => {
      setError(error.message);
      setGroupId('');
    });
  }

    return(
        <>
        <input
        type="text"
        name="group_name"
        placeholder="グループ名"
        value={groupName}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="group_detail"
        placeholder="詳細情報"
        value={groupDetail}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>グループを追加</button>
      {groupId && <p>グループID: {groupId}</p>}
      {error && <p>エラー: {error}</p>}
        </>
      )
    }
    
    export default GroupAddForm