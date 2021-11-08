import BlogPost from "@/components/BlogPost";
import { AllPostsDocument, AllPostsQuery } from "@/utils/gql/query";
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { request } from "graphql-request";
import { InferGetStaticPropsType } from "next";
import { NextSeo } from "next-seo";
import React, { useState } from "react";
import { FaGithub, FaMoon, FaSun, FaTwitter } from "react-icons/fa";

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [search, setSearch] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <NextSeo
        title="Sebastian Pietschner - Developer and Student"
        description="My personal site that I use to develop and share new skills and projects."
        titleTemplate="%s"
      />

      <Stack direction={["column", "row"]} height="100vh">
        <Center p={4} w={[null, "50%"]}>
          <Box textAlign="center">
            <Heading as="h1" mt={2} mb={2}>
              Sebastian Pietschner - Developer and Student
            </Heading>
            <Heading as="h2" size="md" fontWeight="normal">
              My personal site that I use to develop and share new skills and
              projects.
            </Heading>
            <br />
            <HStack spacing={6} justify="center" m={5}>
              <Button
                aria-label="twitter"
                rightIcon={<FaTwitter />}
                href={"https://twitter.com/sebasptsch"}
                as="a"
              >
                Twitter
              </Button>
              <IconButton
                icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
                aria-label="toggle theme"
                m={4}
                onClick={toggleColorMode}
              />
              <Button
                aria-label="github"
                rightIcon={<FaGithub />}
                as="a"
                href={"https://github.com/sebasptsch/"}
              >
                Github
              </Button>
            </HStack>
          </Box>
        </Center>

        <Box p={4} w={[null, "50%"]} overflowY={[null, "scroll"]}>
          <Center mt={10} mb={10}>
            <Heading size="lg">Recent Posts</Heading>
          </Center>

          <InputGroup>
            <Input
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              variant="filled"
              size="lg"
            />
          </InputGroup>
          <Stack>
            {posts
              .filter((post) =>
                post.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((post) => {
                return <BlogPost {...post} key={post.id} />;
              })}
          </Stack>
        </Box>
      </Stack>
    </>
  );
}

export async function getStaticProps() {
  const { posts }: AllPostsQuery = await request(
    process.env.GRAPHQL_ENDPOINT,
    AllPostsDocument
  );
  return { props: { posts }, revalidate: 10 };
}
