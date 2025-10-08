import { Box, Flex, Link as ChakraLink, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiUser, FiBookOpen, FiUsers, FiMessageSquare } from "react-icons/fi";
import { ColorModeButton } from "./ui/color-mode";

export function Navbar() {
  return (
    <Box as="header" bg="white" shadow="md">
      <Flex
        maxW="7xl"
        mx="auto"
        px={4}
        py={3}
        align="center"
        justify="space-between"
      >
        {/* Logo + título */}
        <ChakraLink as={Link} to="/" display="flex" alignItems="center" gap={3}>
          <Image
            src="https://www.escuelaaeronautica.gob.cl/wp-content/themes/escat-theme/img/logo.png"
            alt="Logo ETA"
            h={8}
          />
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="bold"
            textTransform="uppercase"
            color="blue.700"
            letterSpacing="wide"
          >
            Biblioteca ETA
          </Text>
        </ChakraLink>

        {/* Menú navegación */}
        <Flex as="nav" align="center" gap={{ base: 3, md: 5 }}>
          <ChakraLink
            as={Link}
            to="/cuenta"
            display="flex"
            alignItems="center"
            color="black"
            _hover={{ color: "blue.500" }}
            title="Cuenta"
          >
            <FiUser size={24} />
          </ChakraLink>

          <ChakraLink
            as={Link}
            to="/alumnos"
            display="flex"
            alignItems="center"
            color="black"
            _hover={{ color: "blue.500" }}
            title="Alumnos"
          >
            <FiBookOpen size={24} />
          </ChakraLink>

          <ChakraLink
            as={Link}
            to="/docentes"
            display="flex"
            alignItems="center"
            color="black"
            _hover={{ color: "blue.500" }}
            title="Docentes"
          >
            <FiUsers size={24} />
          </ChakraLink>

          <ChakraLink
            as={Link}
            to="/consultas"
            display="flex"
            alignItems="center"
            color="black"
            _hover={{ color: "blue.500" }}
            title="Consúltanos"
          >
            <FiMessageSquare size={24} />
          </ChakraLink>
          <ColorModeButton  />
        </Flex>
      </Flex>
    </Box>
  );
}
