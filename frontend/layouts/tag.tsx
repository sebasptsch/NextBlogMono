import BlogPost from "@/components/BlogPost";
import { TagQuery } from "@/utils/gql/query";
import { Box, Heading, Stack, Text } from "@chakra-ui/layout";
import { NextSeo } from "next-seo";
import React from "react";
import Standard from "./standard";

const TagLayout = ({ tag }: TagQuery) => {
  const { description, name, posts } = tag;
  return (
    <Standard>
      <NextSeo
        noindex
        title={name}
        titleTemplate="%s | Tag"
        description={description}
      />
      <Box textAlign="center">
        <Heading as="h1" mt={2} mb={2}>
          {name}
        </Heading>
        {description ? <Text as="h2">{description}</Text> : null}
      </Box>
      <Stack overflowY={[null, "scroll", "scroll", "scroll"]} height="100%">
        {posts.map((post) => (
          <BlogPost {...post} key={post.id} />
        ))}
      </Stack>
    </Standard>
  );
};
export default TagLayout;
