import { QueryClient, dehydrate } from "@tanstack/react-query";

const port = process.env.PORT;

export async function createPrefetchedQueryClient() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["listings"],
    queryFn: () =>
      fetch(`http://localhost:${port}/api/listings`, {
        headers: {
          Authorization: `Bearer ${process.env.VITE_PUBLIC_LISTINGS_TOKEN}`,
        },
      }).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch listings");
        return res.json();
      }),
    staleTime: 5 * 60 * 1000,
  });

  return {
    queryClient,
    dehydratedState: dehydrate(queryClient),
  };
}
