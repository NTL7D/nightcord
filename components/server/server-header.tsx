"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/type";
import { MemberRole } from "@prisma/client";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import React from "react";

interface ServerheaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

export const Serverheader = (props: ServerheaderProps) => {
  const { onOpen } = useModal();
  const isAdmin = props.role === MemberRole.ADMIN;
  const isModerator = isAdmin || props.role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
          {props.server.name}
          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        {/* Invite people  */}
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("invite", { server: props.server })}
            className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
          >
            Invite People
            <UserPlus className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {/* Setting  */}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("editServer", { server: props.server })}
            className="px-3 py-2 text-sm cursor-pointer"
          >
            Server Setting
            <Settings className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {/* Manage member  */}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("members", { server: props.server })}
            className="px-3 py-2 text-sm cursor-pointer"
          >
            Manage Member
            <Users className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {/* Create channel  */}
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("createChannel", { server: props.server })}
            className="px-3 py-2 text-sm cursor-pointer"
          >
            Create Channel
            <PlusCircle className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {/* --------------------------- */}
        {isModerator && <DropdownMenuSeparator />}
        {/* Delete server  */}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("deleteServer", { server: props.server })}
            className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
          >
            Delete Server
            <Trash className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {/* Leave server  */}
        {!isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("leaveServer", { server: props.server })}
            className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
          >
            Leave Server
            <LogOut className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
