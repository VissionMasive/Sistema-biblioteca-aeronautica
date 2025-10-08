import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  Select,
  createListCollection,
  Portal,
  Stack,
  Box,
  InputGroup,
  Input,
  Card,
  Image,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { chakra } from "@chakra-ui/react";

export default function Catalogo() {
  const [fileterByCategory, setFilterByCategory] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filterItems] = useState([
    "categoria",
    "autor",
    "anno",
    "idioma",
    "editorial",
  ]);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/api/books")
      .then((res) => {
        if (!res.ok) throw new Error("error en la peticion");
        return res.json();
      })
      .then((data) => setBooks(data));
    fetch("http://localhost:3001/api/categories")
      .then((res) => {
        if (!res.ok) throw new Error("error en la peticion");
        return res.json();
      })
      .then((data) => setCategorias(data));
  }, []);
  const categoryCollection = createListCollection({
    items: categorias.map((cat) => ({
      key: String(cat.id),
      value: cat.nombre,
      label: "categoria",
      disabled: false,
    })),
  });

  const handleFilter = (value) => {
    console.log(typeof(value))
    setFilterByCategory(value)
  }

  return (
    <Stack mt="1rem" mb="1rem">
      <h1 style={{ fontSize: "1.5rem", lineHeight: "2rem", fontWeight: "600" }}>
        Bienvenido al Himalaya
      </h1>
      <Box
        bg={"white"}
        borderRadius={"md"}
        shadow={"lg"}
        p="1rem"
        display="grid"
        md={{ gridTemplateColumns: "repeat(5, minmax(0,1fr))" }}
        gap="0.5rem"
      >
        <InputGroup
          borderRadius="sm"
          p="0.5rem"
          md={{ gridColumn: "span 2/ span 2" }}
          endElement={<FiSearch />}
        >
          <Input
            placeholder="Buscar libro por título, autor o ISBN"
            _placeholder={{ color: "gray.400" }}
            size={"sm"}
          />
        </InputGroup>
        {filterItems.map((item) => (
          <Select.Root
            collection={categoryCollection}
            borderRadius="sm"
            p="0.5rem"
            value={fileterByCategory}
            onValueChange={(e) => handleFilter(e.value)}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder={item} />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {categoryCollection.items.map((categoria) => (
                    <Select.Item item={categoria} key={categoria.value}>
                      {categoria.value}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        ))}
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(2, minmax(0,1fr))"
        md={{ gridTemplateColumns: "repeat(3, minmax(0,1fr))" }}
        lg={{ gridTemplateColumns: "repeat(4, minmax(0,1fr))" }}
        gap="1rem"
      >
        {books.map((book) => (
          <chakra.link
            as={Link}
            bg="white"
            borderRadius="md"
            shadow="sm"
            _hover={{ shadow: "lg" }}
            transition="shadow"
            transitionDuration="150ms"
            p="0.75rem"
            to={`/libro/${book.libro_id}`}
          >
            <Card.Root
              flexDirection="row"
              overflow="hidden"
              maxW="sm"
              border="none"
            >
              <Image
                objectFit="cover"
                maxW="120px"
                src="https://images.cdn3.buscalibre.com/fit-in/360x360/57/8f/578ff0d6946c68cb2bf093b48a71dece.jpg"
                alt="portada libro"
              />
              <Box p="0.5rem">
                <Card.Title fontWeight="medium" lineClamp="2">
                  {book.nombre}
                </Card.Title>
                <Card.Description lineClamp="2" p="0.5">
                  {book.autor}
                </Card.Description>
                <HStack p="0.5" spacing="2">
                  {book.categorias.map((cat) => (
                    <Badge colorPalette="cyan">{cat.nombre}</Badge>
                  ))}
                </HStack>
                <Card.Footer p="1">
                  {book.stock > 0 ? "Disponible" : "No disponible"}
                </Card.Footer>
              </Box>
            </Card.Root>
          </chakra.link>
        ))}
      </Box>
    </Stack>
  );
}
