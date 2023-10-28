// ユーザーの所属するグループを取得

import { useState, useEffect } from 'react';

export const GetGroup = () => {
    const [groups, setGroup] = useState([]);
    useEffect(() => {
        fetchUserGroups();
      }, []);

    async function fetchUserGroups() {
        const url = '/groups'
        try {
          const res = await fetch(url);
          if (!res.ok) {
            throw new Error("fetchに失敗しました");
          }
  
          const data = await res.json();
          if (data.length > 0) {
            setGroup(data.groups);
          } else {
            throw new Error("json化に失敗しました");
          }
        } catch (error) {
          console.log(error);
        }
      }

    return(
        <>
      <h2>参加中のグループ一覧</h2>
        <ul>
          {groups.map(group => (
            <li key={group.group_id}>{group.group_name}</li>
          ))}
        </ul>
        </>
      )
    };
    
    export default GetGroup