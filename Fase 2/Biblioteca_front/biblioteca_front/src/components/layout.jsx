import { Navbar } from "./navbar";
import { Outlet } from "react-router";
import { Box, Flex } from "@chakra-ui/react";

export default function Layout() {
  return (
    <Flex direction="column" minH="100vh">
      <Navbar/>
        <Box minH="60vh">
          <Outlet />
        </Box>
    </Flex>
  );
}