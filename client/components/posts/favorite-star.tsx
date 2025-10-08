"use client";
import React, { useOptimistic, useTransition } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

interface FavoriteProps {
  creator: string;
  post: string;
}
export const Favorite = ({ creator, post }: FavoriteProps) => {
  // initial state
  const [liked, setLiked] = React.useState(false);

  // useOptimistic takes the source state and an updater
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(
    liked,
    (state, newValue: boolean) => newValue
  );

  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    const next = !liked;

    // update UI optimistically
    setOptimisticLiked(next);

    // start async transition (API call or actual state update)
    startTransition(async () => {
      try {
        const response = await fetch(`http://localhost:8000/posts/favorite`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ creator, post }),
        });
        setLiked(next); // commit real state
      } catch {
        // rollback if needed
        setOptimisticLiked(liked);
      }
    });
  };

  return (
    <div onClick={handleToggle} className="cursor-pointer">
      {optimisticLiked ? (
        <FaStar className="w-8 h-8 text-yellow-500" />
      ) : (
        <FaRegStar className="w-8 h-8 text-yellow-500" />
      )}
      {isPending && <span className="ml-2 text-gray-400 text-sm">Saving…</span>}
    </div>
  );
};
