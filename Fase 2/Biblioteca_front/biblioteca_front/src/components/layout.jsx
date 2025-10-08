import { Navbar } from "./navbar";
import { Outlet } from "react-router";
import { Box, Flex } from "@chakra-ui/react";

export default function Layout() {
  return (
    <Flex direction="column" minH="100vh" bg={"gray.50"}>
      <Navbar />
      <Box
        maxW={"80rem"}
        mx={"auto"}
        w={"100%"}
        pl={"4"}
        py={"6"}
        gap={"6"}
        display={"grid"}
      >
        <Box minH="60vh">
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
}
