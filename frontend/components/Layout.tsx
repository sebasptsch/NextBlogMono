import { Container } from "@chakra-ui/react";
const Layout = ({ children }) => (
  <Container maxW="container.md" as="main">
    {children}
  </Container>
);

export default Layout;
