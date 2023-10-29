import React from "react";
import { useSession } from "next-auth/react";
import { Todo } from "@/connection/functions";

type Props = {
  item: Todo;
};

export const TodoItem: React.FC<Props> = ({ item }) => {
  const { data: session } = useSession();
  if (session) {
    if (item.is_done == true) {
      return <></>;
    }
    return (
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {item.name}
        </h5>
        <p>{item.content}</p>
        {item.deadline != null ? (
          <p>{new Date(item.deadline).toISOString()}</p>
        ) : (
          <></>
        )}
        <button>完了にする</button>
      </div>
    );
  } else {
    return <></>;
  }
};
