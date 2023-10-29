import { createGroup, joinGroup } from "@/connection/functions";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function CreateGroup() {
  const searchParams = useSearchParams();
  const id = searchParams.get("group_id");
  useEffect(() => {
    const func = async () => {
      if (id) {
        try {
          await joinGroup(localStorage.getItem("user_id") ?? "", id);
        } catch (e) {
          console.log(e);
        }
      }
    };
    func();
  });
  return (
    <>
      <div>{id}へ参加しました。</div>
      <button
        className="flex -left-0 bg-white rounded-md p-1 drop-shadow m-3"
        onClick={() => (window.location.href = "/")}
      >
        戻る
      </button>
    </>
  );
}
