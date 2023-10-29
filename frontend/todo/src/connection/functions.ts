export type User = {
  user_id?: number;
  user_name?: string;
};

export type Group = {
  group_id?: number;
  name: string;
  detail?: string;
};

export type Todo = {
  todo_id?: number;
  group_id: number;
  name?: string;
  content?: string;
  deadline?: Date;
  is_done?: boolean;
};

export const getGroups = async (user_id: string): Promise<Group[]> => {
  const res = await fetch(`/backend/groups`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: user_id }),
  });
  const data = (await res.json()) as Group[];
  console.log(data);
  return data as Group[];
};

export const addUser = async (user_name: string): Promise<string> => {
  const res = await fetch(`/backend/user_add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_name: user_name }),
  });
  const data = await res.json();
  console.log(data);
  const ret = (data as User).user_id?.toString() ?? "";
  return ret;
};

export const createGroup = async (group_name: string, detail?: string) => {
  const res = await fetch(`/backend/group_add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ group_name: group_name, detail: detail }),
  });
  const data = await res.json();
  console.log(data);
  return (data as Group).group_id?.toString() ?? "";
};

export const joinGroup = async (user_id: string, group_id: string) => {
  const res = await fetch(`/backend/join_group`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: user_id, group_id: group_id }),
  });
  if (res.status !== 200) {
    throw new Error("Error: joinGroup");
  }
};

export const getLocalTodo = async (user_id: string): Promise<Todo[]> => {
  const res = await fetch(`/backend/get_todo_local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: user_id }),
  });
  const data = (await res.json()) as Todo[];
  console.log(data);
  return data as Todo[];
};
