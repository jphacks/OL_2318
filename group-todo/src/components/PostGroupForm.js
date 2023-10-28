//グループ追加

import React from 'react';
import { useState } from 'react';

export const PostGroupForm = () => {
    const [groupName, setGroupName] = useState("");
    const [groupDetail, setGroupDetail] = useState("");
  
    const handleGroupNameChange = (event) => {
      setGroupName(event.target.value);
    };
  
    const handleGroupDetailChange = (event) => {
      setGroupDetail(event.target.value);
    };
  
    const handleGroupAdd = async () => {
      try {
        const response = await fetch("/group_add/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ group_name: groupName, detail: groupDetail }),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("グループのid:", data.group_id);
        } else {
          console.error("グループ作成に失敗");
        }
      } catch (error) {
        console.error("グループ作成に失敗:", error);
      }
    };

    return(
        <>
        <h2>新規グループ追加</h2>
      <input
        type="text"
        placeholder="グループネーム"
        value={groupName}
        onChange={handleGroupNameChange}
      />
      <input
        type="text"
        placeholder="グループ概要"
        value={groupDetail}
        onChange={handleGroupDetailChange}
      />
      <button onClick={handleGroupAdd}>グループを追加</button>
        </>
      )
    }
    
    export default PostGroupForm