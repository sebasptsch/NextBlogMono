import { Container, Flex, StatGroup } from "@chakra-ui/react";
import { SocialProfileJsonLd } from "next-seo";
import React from "react";
import NowPlaying from "./metrics/CurrentlyPlaying";
import GitHub from "./metrics/Github";
export default function Layout(props) {
  return (
    <Flex flexDir="column" h="100vh">
      <SocialProfileJsonLd
        type="Person"
        name="Sebastian Pietschner"
        url="https://sebasptsch.dev"
        sameAs={["https://twitter.com/sebasptsch"]}
      />
      <Container maxW="container.md" as="main">
        {props.children}
      </Container>
      <Container as="footer" maxW="container.md">
        <StatGroup
          textAlign="center"
          borderRadius={"12px"}
          borderWidth={"1px"}
          p={2}
          m={1}
        >
          <GitHub followers />
          <GitHub stars />
          <GitHub repos />
          <NowPlaying />
        </StatGroup>
      </Container>
    </Flex>
  );
}
