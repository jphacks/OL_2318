import React, { useEffect } from "react";
import { getGroups, getLocalTodo, Group, Todo } from "@/connection/functions";
import { TodoItem } from "./todo_item";

export default function ToDoItemList() {
  const [groups, setGroups] = React.useState<Group[]>([]);
  const [todos, setTodos] = React.useState<Todo[]>([]);
  useEffect(() => {
    const groups = async () => {
      const res = await getGroups(localStorage.getItem("user_id") ?? "");
      setGroups(res);
    };
    const todos = async () => {
      const res = await getLocalTodo(localStorage.getItem("user_id") ?? "");
      setTodos(res);
    };
    groups();
    todos();
  }, []);

  return (
    <div>
      <div>
        参加しているグループ
        {groups.map((group) => {
          return (
            <div key={`group_${group.group_id}`}>
              {group.name} : {group.detail ?? ""}
            </div>
          );
        })}
      </div>
      現在のToDo
      <div className="flex flex-wrap">
        {todos.map((todo) => {
          return <TodoItem item={todo} key={todo.todo_id}></TodoItem>;
        })}
      </div>
    </div>
  );
}
