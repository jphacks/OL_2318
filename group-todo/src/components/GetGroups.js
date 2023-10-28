// ユーザーの所属するグループを取得

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const GetGroups = () => {
  const [userID, setUserID] = useState(0); // ユーザーIDを入力
  const [userGroups, setUserGroups] = useState([]);

  const handleUserIDChange = (event) => {
    setUserID(event.target.value);
  };

  const handleGetUserGroups = async () => {
    try {
      const response = await fetch(`/groups/?user_id=${userID}`);

      if (response.ok) {
        const data = await response.json();
        setUserGroups(data); // グループIDのリストをセット
      } else {
        console.error("Failed to fetch user's groups.");
      }
    } catch (error) {
      console.error("Error while fetching user's groups:", error);
    }
  };

    return(
        <>
      <h2>グループの取得</h2>
      <input
        type="number"
        placeholder="ユーザーID"
        value={userID}
        onChange={handleUserIDChange}
      />
      <button onClick={handleGetUserGroups}>グループの取得</button>
      <div>
        <h3>グループ一覧</h3>
        <ul>
          {userGroups.map((group) => (
            <li key={group.id}>
              <Link to={`/group/${group.id}`}>グループネーム: {group.group_name}</Link>
              </li>
          ))}
        </ul>
      </div>
        </>
      )
    };
    
    export default GetGroups