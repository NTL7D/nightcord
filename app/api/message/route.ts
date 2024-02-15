import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Message } from "@prisma/client";
import { NextResponse } from "next/server";

const MESSAGE_BATCH = 10;

export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);

    const channelId = searchParams.get("channelId");
    const cursor = searchParams.get("cursor");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!channelId) {
      return new NextResponse("Missing channel ID", { status: 400 });
    }

    let message: Message[] = [];

    if (cursor) {
      message = await db.message.findMany({
        take: MESSAGE_BATCH,
        cursor: {
          id: cursor,
        },
        where: {
          channelId: channelId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    } else {
      message = await db.message.findMany({
        take: MESSAGE_BATCH,
        where: {
          channelId: channelId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    let nextCursor = null;

    if (message.length === MESSAGE_BATCH) {
      nextCursor = message[MESSAGE_BATCH - 1].id;
    }

    return NextResponse.json({
      items: message,
      nextCursor,
    });
  } catch (err) {
    console.log("[MESSAGE_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
