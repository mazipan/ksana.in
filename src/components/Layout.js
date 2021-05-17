import { Container } from "./Container";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = ({ children }) => {
  return (
    <Container height="100vh">
      <Header />
      {children}
      <Footer />
    </Container>
  );
};
