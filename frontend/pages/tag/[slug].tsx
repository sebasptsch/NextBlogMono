import TagLayout from "@/layouts/tag";
import {
  TagDocument,
  TagPathsDocument,
  TagPathsQuery,
  TagQuery,
} from "@/utils/gql/query";
import { request } from "graphql-request";
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import React from "react";

const Tag = ({ tag }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <TagLayout tag={tag} />
);

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const { tags }: TagPathsQuery = await request(
    "http://cms:3002/api/graphql",
    TagPathsDocument
  );

  const paths = tags
    .map((tag) => tag.slug)
    .filter((slug): slug is string => !!slug)
    .map((slug) => `/tag/${slug}`);

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const variables = {
    where: {
      slug: params!.slug as string,
    },
  };
  const { tag }: TagQuery = await request(
    process.env.NODE_ENV === "production"
      ? "http://cms:3002/api/graphql"
      : "http://localhost:3002/api/graphql",
    TagDocument,
    variables
  );
  return {
    props: {
      tag,
    },
    revalidate: 10,
  };
}

export default Tag;
