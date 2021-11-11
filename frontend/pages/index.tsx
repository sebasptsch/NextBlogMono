import BlogPost from "@/components/BlogPost";
import { AllPostsDocument, AllPostsQuery } from "@/utils/gql/query";
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  HStack,
  IconButton,
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
    <Container maxW="container.xl">
      <NextSeo
        title="Sebastian Pietschner - Developer and Student"
        description="My personal site that I use to develop and share new skills and projects."
        titleTemplate="%s"
      />

      <Stack direction={["column", "row", "row", "row"]} height="100vh">
        <Center w={[null, "50%", "50%", "50%"]}>
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

        <Box w={[null, "50%", "50%", "50%"]}>
          <Stack overflowY={[null, "scroll", "scroll", "scroll"]} height="100%">
            {posts.map((post) => {
              return <BlogPost {...post} key={post.id} />;
            })}
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}

export async function getStaticProps() {
  const { posts }: AllPostsQuery = await request(
    process.env.NODE_ENV === "production"
      ? "https://cms.sebasptsch.dev/api/graphql"
      : "http://localhost:3000/api/graphql",
    AllPostsDocument
  );
  return { props: { posts }, revalidate: 10 };
}
