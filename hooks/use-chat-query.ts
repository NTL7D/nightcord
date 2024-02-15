import qs from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSocket } from "@/components/providers/socket-provider";

interface ChatQueryProps {
  queryKey: string;
  apiUrl: string;
  paramsKey: "channelId" | "conversationId";
  paramsValue: string;
}

export const useChatQuery = (props: ChatQueryProps) => {
  const { isConnected } = useSocket();
  const fetchMessage = async ({ pageParam }: { pageParam?: string }) => {
    const url = qs.stringifyUrl(
      {
        url: props.apiUrl,
        query: {
          cursor: pageParam,
          [props.paramsKey]: props.paramsValue,
        },
      },
      { skipNull: true }
    );
    const res = await fetch(url);
    return res.json();
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [props.queryKey],
      queryFn: fetchMessage,
      initialPageParam: "",
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      refetchInterval: isConnected ? false : 1000,
    });

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, status };
};
