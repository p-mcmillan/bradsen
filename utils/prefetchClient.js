import { QueryClient, dehydrate } from "@tanstack/react-query";
export async function createPrefetchedQueryClient() {
  console.log("⚡️ createPrefetchedQueryClient() called on server");

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["listings"],
    queryFn: () =>
      fetch("http://localhost:3003/api/listings").then((res) => res.json()),
    staleTime: 5 * 60 * 1000,
  });

  return {
    queryClient,
    dehydratedState: dehydrate(queryClient),
  };
}
