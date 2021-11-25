import { Button, IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { Box, Center, Heading, HStack, Stack } from "@chakra-ui/layout";
import React from "react";
import { FaGithub, FaMoon, FaSun, FaTwitter } from "react-icons/fa";

const Standard = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    //   <Container maxW="container.xl">
    <>
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
        <Box
          w={[null, "50%", "50%", "50%"]}
          overflowY={[null, "scroll", "scroll", "scroll"]}
          height="100%"
          p={2}
        >
          {children}
        </Box>
      </Stack>
    </>
  );
};

export default Standard;
