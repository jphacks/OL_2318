import { createGroup, joinGroup } from "@/connection/functions";
import React from "react";

export default function CreateGroup() {
  const handler = async () => {
    console.log("create group");
    const group_name = (
      document.getElementById("group_create_name") as HTMLInputElement
    ).value;
    const detail = (document.getElementById("group_detail") as HTMLInputElement)
      .value;
    const groupId = await createGroup(group_name, detail);
    console.log(groupId);
    joinGroup(localStorage.getItem("user_id") ?? "", groupId);
  };

  return (
    <div className="m-2 bg-slate-500 rounded-lg ">
      <p className="m-2 p-1 text-gray-50 font-semibold">グループを新規作成</p>
      <form>
        <div className="">
          <input
            type="text"
            name="group_name"
            id="group_create_name"
            placeholder={"グループ名"}
            className="flex -left-0  bg-white rounded-md p-1 drop-shadow m-3"
          />
          <input
            type="text"
            name="group_detail"
            id="group_detail"
            placeholder={"グループの説明"}
            className="flex -left-0  bg-white rounded-md p-1 drop-shadow m-3"
          />
        </div>
        <button
          className="flex bg-white rounded-md p-1 drop-shadow m-3 float-right text-gray-700"
          type="button"
          onClick={async () => {
            await handler();
          }}
        >
          グループを作成
        </button>
      </form>
    </div>
  );
}
