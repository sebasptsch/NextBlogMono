import fetcher from "@/utils/fetcher";
import { Stack } from "@chakra-ui/react";
import useSWR from "swr";
import RepoBox from "../RepoBox";

export default function GithubRepos() {
  const { data } = useSWR("/api/repositories", fetcher);

  return (
    <Stack spacing={2}>
      {data?.map((repo) => (
        <RepoBox repo={repo} key={repo.name} />
      ))}
    </Stack>
  );
}
