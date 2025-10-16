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
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const favoriteStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/posts/favorite/${creator}/${post}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const message = await response.json();
        setLiked(message.status);
      } catch (e) {
        console.error("Failed to fetch favorite status:", e);
        // Could add user-facing error handling here
      } finally {
        setIsLoading(false);
      }
    };
    favoriteStatus();
  }, [creator, post]); // Added missing dependencies

  // useOptimistic takes the source state and an updater
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(
    liked,
    (state, newValue: boolean) => newValue
  );

  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    const next = !liked;

    // update UI optimistically

    // start async transition (API call or actual state update)
    startTransition(async () => {
      setOptimisticLiked(next);
      try {
        const response = await fetch(`http://localhost:8000/posts/favorite`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ creator, post }),
        });
        const message = await response.json();
        console.log(message.status);
        setLiked(next); // commit real state
      } catch (error) {
        console.error("Failed to toggle favorite:", error);
        // rollback optimistic update
        setOptimisticLiked(liked);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="cursor-not-allowed">
        <FaRegStar className="w-8 h-8 text-gray-300" />
      </div>
    );
  }

  return (
    <div onClick={handleToggle} className="cursor-pointer">
      {optimisticLiked ? (
        <FaStar className="w-8 h-8 text-yellow-500" />
      ) : (
        <FaRegStar className="w-8 h-8 text-yellow-500" />
      )}
    </div>
  );
};
