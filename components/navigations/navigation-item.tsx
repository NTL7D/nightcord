"use client";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { ActionToolTip } from "@/components/action-tooltip";
import React from "react";

interface NavigationItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

export const NavigationItem = (props: NavigationItemProps) => {
  const router = useRouter();
  const params = useParams();

  const onClick = () => {
    router.push(`/server/${props.id}`);
  };

  return (
    <ActionToolTip side="right" align="center" label={props.name}>
      <button onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.serverId !== props.id && "group-hover:h-[20px]",
            params?.serverId === props.id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.serverId === props.id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image fill src={props.imageUrl} alt="Channel" />
        </div>
      </button>
    </ActionToolTip>
  );
};
