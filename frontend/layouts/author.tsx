import BlogPost from "@/components/BlogPost";
import { AuthorQuery } from "@/utils/gql/query";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { title } from "process";
import React from "react";
import Standard from "./standard";

export default function AuthorLayout({ user }: AuthorQuery) {
  const { bio, name, posts } = user;
  return (
    <Standard>
      <NextSeo noindex title={name} titleTemplate="%s | Author" />
      <Box textAlign="center">
        <Heading as="h1" mt={2} mb={2}>
          {title}
        </Heading>
        {bio ? <Text as="h2">{bio}</Text> : null}
      </Box>
      <Stack overflowY={[null, "scroll", "scroll", "scroll"]} height="100%">
        {posts.map((post) => (
          <BlogPost {...post} key={post.id} />
        ))}
      </Stack>
    </Standard>
  );
}
