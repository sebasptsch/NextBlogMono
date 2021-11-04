import PostLayout from "@/layouts/post";
import {
  PostDocument,
  PostPathsDocument,
  PostPathsQuery,
  PostQuery,
} from "@/utils/gql/query";
import request from "graphql-request";
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { getPlaiceholder } from "plaiceholder";

const Post = ({
  post,
  image,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <PostLayout post={post} image={image} />
);

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const { posts }: PostPathsQuery = await request(
    process.env.GRAPHQL_ENDPOINT,
    PostPathsDocument
  );

  const paths = posts
    .map((post) => post.slug)
    .filter((slug): slug is string => !!slug)
    .map((slug) => `/post/${slug}`);

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
  const { post }: PostQuery = await request(
    process.env.GRAPHQL_ENDPOINT,
    PostDocument,
    variables
  );
  const imagePost = async () => {
    if (post.image) {
      const { img, base64 } = await getPlaiceholder(post.image.url);
      return {
        ...img,
        blurDataURL: base64,
      };
    } else {
      return null;
    }
  };
  return {
    props: {
      post,
      image: await imagePost(),
    },
    revalidate: 10,
  };
}

export default Post;
