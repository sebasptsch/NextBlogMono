import BlogPost from "@/components/BlogPost";
import Standard from "@/layouts/standard";
import { AllPostsDocument, AllPostsQuery } from "@/utils/gql/query";
import { Stack } from "@chakra-ui/react";
import { request } from "graphql-request";
import { InferGetStaticPropsType } from "next";
import { NextSeo } from "next-seo";
import React from "react";

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Standard>
      <NextSeo
        title="Sebastian Pietschner - Developer and Student"
        description="My personal site that I use to develop and share new skills and projects."
        titleTemplate="%s"
      />
      <Stack>
        {posts.map((post) => {
          return <BlogPost {...post} key={post.id} />;
        })}
      </Stack>
    </Standard>
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
