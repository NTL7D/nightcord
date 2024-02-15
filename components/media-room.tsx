"use client";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { Channel } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
}

export const MediaRoom = (props: MediaRoomProps) => {
  const { user } = useUser();
  const [token, setToken] = useState();

  useEffect(() => {
    if (!user?.firstName || !user?.lastName) return;

    const name = `${user.firstName} ${user.lastName}`;

    (async () => {
      try {
        const resp = await fetch(
          `/api/livekit?room=${props.chatId}&username=${name}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [props.chatId, user?.firstName, user?.lastName]);

  if (token === "") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center ">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVE_URL}
      token={token}
      connect={true}
      video={props.video}
      audio={props.audio}
    >
      <VideoConference />
    </LiveKitRoom>
  );
};
