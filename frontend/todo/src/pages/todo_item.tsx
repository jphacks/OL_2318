import React from "react";
import { useSession } from "next-auth/react";
import { Todo, update_todo_local } from "@/connection/functions";
import Router, { useRouter } from "next/router";

type Props = {
  item: Todo;
  user_id: string;
};

export const TodoItem: React.FC<Props> = ({ item, user_id }) => {
  const router = useRouter();
  const todo_id = item.todo_id;
  const updateStatus = async () => {
    if (todo_id == null) {
      return;
    }
    const res = update_todo_local(todo_id.toString(), user_id, true);
    item.is_done = true;
  };
  const { data: session } = useSession();
  if (session) {
    if (item.is_done == true) {
      return <></>;
    }
    return (
      <div className="block max-w-sm m-3 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {item.name}
        </h5>
        <p>{item.content}</p>
        {item.deadline != null ? (
          <p>{new Date(item.deadline).toISOString()}</p>
        ) : (
          <></>
        )}
        <button
          type="submit"
          onClick={async () => {
            const result = confirm("完了にしますか？");
            if (result) {
              await updateStatus();
            }
            router.reload();
          }}
        >
          完了にする
        </button>
      </div>
    );
  } else {
    return <></>;
  }
};
