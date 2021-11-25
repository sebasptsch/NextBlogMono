import { PostQuery } from "@/utils/gql/query";
import { componentBlockRenderers, renderers } from "@/utils/renderers";
import { Flex, Heading, Spacer } from "@chakra-ui/layout";
import { DocumentRenderer } from "@keystone-next/document-renderer";
import moment from "moment";
import { ArticleJsonLd, NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import Standard from "./standard";

export default function PostLayout({
  post,
  image,
}: {
  post: PostQuery["post"];
  image: {
    blurDataURL: string;
    src: string;
    height: number;
    width: number;
    type?: string;
  };
}) {
  const { title, summary, published_at, slug, author, readingtime } = post;
  return (
    <Standard>
      <NextSeo
        title={title}
        description={summary}
        titleTemplate="%s - Sebastian Pietschner"
        openGraph={{
          title: title,
          description: summary,
          type: "article",
          article: {
            publishedTime: published_at,
          },
          images: image
            ? [
                {
                  url: `${image.src}`,
                },
              ]
            : undefined,
        }}
      />
      <ArticleJsonLd
        url={`https://sebasptsch.dev/post/${slug}`}
        title={title}
        images={image ? [`${image.src}`] : undefined}
        datePublished={published_at}
        authorName={author.name}
        description={summary}
        publisherName="Seb's Blog"
        publisherLogo="https://sebasptsch.dev/logo.png"
      />
      <Heading pt="1em" mb="0.5em" as="h1">
        {title}
      </Heading>
      <Flex pb="0.5em">
        <Link href={`/author/${author.slug}`}>
          <a>{author.name}</a>
        </Link>{" "}
        / {moment(published_at).format("MMM Do YYYY")}
        <Spacer />
        {readingtime}
      </Flex>

      {post.image ? (
        <Image {...image} placeholder="blur" layout="responsive" />
      ) : null}

      <DocumentRenderer
        document={post.content.document}
        renderers={renderers}
        componentBlocks={componentBlockRenderers}
      />
    </Standard>
  );
}
