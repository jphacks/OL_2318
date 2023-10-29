import { useSession, signIn, signOut } from "next-auth/react";

import {
  getGroups,
  addUser,
  createGroup,
  joinGroup,
} from "@/connection/functions";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import ToDoItemList from "@/pages/todo_item_list";

export default function Home() {
  const { data: session } = useSession();

  const fetchTodoItems = async () => {
    if (session) {
      if (localStorage.getItem("user_id") == null) {
        const add_user = await addUser(session.user?.email ?? "");
        localStorage.setItem("user_id", add_user);
      }
      const user_id = localStorage.getItem("user_id") ?? "";
      const groups = await getGroups(user_id);
    }
  };

  if (session) {
    return (
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <div className="fixed top-0 left-0 ">
          Signed in as {session.user?.email} <br />
        </div>
        <button
          className="flex -left-0  bg-white rounded-md p-1 drop-shadow m-3"
          onClick={fetchTodoItems}
        >
          Update ToDo List{" "}
        </button>
        <div>
          <form>
            <input type="text" name="group_name" id="group_create_name" />
            <button
              onClick={() => {
                const group_name = (
                  document.getElementById(
                    "group_create_name"
                  ) as HTMLInputElement
                ).value;
                createGroup(group_name);
              }}
            >
              Create Group
            </button>
          </form>
        </div>
        <button
          onClick={async () => {
            joinGroup(localStorage.getItem("user_id") ?? "", "2");
          }}
        >
          グループ1にジョイン
        </button>
        <ToDoItemList />
        <button
          className="flex -left-0 bg-white rounded-md p-1 drop-shadow m-3"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </main>
    );
  }
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </main>
  );
}
