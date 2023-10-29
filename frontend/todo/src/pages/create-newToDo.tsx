import { getGroups, joinGroup, todo_add } from "@/connection/functions";
import React, { useEffect, useRef } from "react";

export default function CreateToDo() {
  const selectorRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const groups = async () => {
      const res = await getGroups(localStorage.getItem("user_id") ?? "");
      if (selectorRef.current == null) return;
      selectorRef.current.innerHTML = "";
      res.map((group) => {
        selectorRef.current?.options.add(
          new Option(group.name, group.group_id?.toString() ?? "")
        );
      });
    };
    groups();
  }, []);

  const handle = async () => {
    const todo_name = (document.getElementById("todo_name") as HTMLInputElement)
      .value;
    const todo_content = (
      document.getElementById("todo_content") as HTMLInputElement
    ).value;
    const group_id = selectorRef.current?.value ?? "";

    await todo_add(group_id, todo_name, todo_content);
  };

  return (
    <div className="m-2 p-3 bg-slate-500 rounded-lg">
      <form>
        <p className="text-white font-semibold">ToDoを新規作成</p>
        <div className="flex-col">
          <select
            name="group_selector"
            id="group_selector"
            ref={selectorRef}
            className="flex bg-white rounded-md p-1 drop-shadow m-3"
          ></select>
          <input
            type="text"
            name="todo_name"
            id="todo_name"
            placeholder={"ToDoの名前"}
            className="flex  bg-white rounded-md p-1 drop-shadow m-3 "
          />
          <input
            type="text"
            name="todo_content"
            id="todo_content"
            placeholder={"ToDoの詳細"}
            className="flex bg-white rounded-md p-1 drop-shadow m-3 w-fulls"
          />
          <button
            type="submit"
            className="bg-white drop-shadow-md rounded-lg px-3 float-right mx-3"
            onClick={handle}
          >
            作成
          </button>
        </div>
      </form>
    </div>
  );
}
