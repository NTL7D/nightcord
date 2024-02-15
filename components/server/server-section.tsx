"use client";

import { ActionToolTip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/type";
import { ChannelType, MemberRole } from "@prisma/client";
import { Plus, Settings } from "lucide-react";
import React from "react";

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
}

export const ServerSection = (props: ServerSectionProps) => {
  const { onOpen } = useModal();

  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {props.label}
      </p>
      {props.role !== MemberRole.GUEST && props.sectionType === "channels" && (
        <ActionToolTip label="Create Channel" side="top">
          <button
            onClick={() =>
              onOpen("createChannel", { channelType: props.channelType })
            }
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Plus className="w-4 h-4" />
          </button>
        </ActionToolTip>
      )}
      {props.role === MemberRole.ADMIN && props.sectionType === "members" && (
        <ActionToolTip label="Manage Members" side="top">
          <button
            onClick={() => onOpen("members", { server: props.server })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Settings className="w-4 h-4" />
          </button>
        </ActionToolTip>
      )}
    </div>
  );
};
