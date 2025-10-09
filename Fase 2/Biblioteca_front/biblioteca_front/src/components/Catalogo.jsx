import { useState, useEffect, useMemo } from "react";
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
  Button,
} from "@chakra-ui/react";
import { chakra } from "@chakra-ui/react";

export default function Catalogo() {
  const [fileterByCategory, setFilterByCategory] = useState([]);
  const [filterByTitle, setFilterByTitle] = useState("");
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
  const categoryCollection = useMemo(() => {
    return createListCollection({
      items: categorias.map((cat) => ({
        key: String(cat.id), // id único
        value: String(cat.nombre), // value será el id (puedes cambiar a cat.nombre si prefieres)
        label: cat.nombre, // texto visible
        disabled: false,
      })),
    });
  }, [categorias]);

  const normalizeToKeys = (payload) => {
    if (payload == null) return [];
    if (payload && "value" in payload) {
      const v = payload.value;
      if (Array.isArray(v)) return v.map(String);
      return [String(v)];
    }
    if (payload && "items" in payload && Array.isArray(payload.items)) {
      return payload.items.map((it) =>
        String(it.key ?? it.value ?? it.id ?? it)
      );
    }
    if (Array.isArray(payload)) return payload.map(String);
    if (payload instanceof Set) return Array.from(payload).map(String);
    if (payload instanceof Map) return Array.from(payload.keys()).map(String);
    if (typeof payload === "object") {
      if ("id" in payload) return [String(payload.id)];
      if (Array.isArray(payload.selectedKeys))
        return payload.selectedKeys.map(String);
      return Object.entries(payload)
        .filter(([, v]) => Boolean(v))
        .map(([k]) => String(k));
    }
    return [String(payload)];
  };
  const handleFilter = (e) => {
    const keys = normalizeToKeys(e); // siempre string[]
    setFilterByCategory(keys);
  };

  const handleFilterByTitle = (e) => {
    fetch(`http://localhost:3001/api/books?nombre=${filterByTitle}`)
      .then((res) => {
        if (!res.ok) throw new Error("error en la peticion");
        return res.json();
      })
      .then((data) => setBooks(data));
  };
  useEffect(() => {
    fetch(`http://localhost:3001/api/books?categoria=${fileterByCategory}`)
      .then((res) => {
        if (!res.ok) throw new Error("error en la peticion");
        return res.json();
      })
      .then((data) => setBooks(data));
    console.log(books);
  }, [fileterByCategory]);

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
          endElement={
            <Button variant="plain"
              onClick={handleFilterByTitle}
            >
              <FiSearch />
            </Button>
          }
        >
          <Input
            placeholder="Buscar libro por título, autor o ISBN"
            _placeholder={{ color: "gray.400" }}
            size={"sm"}
            value={filterByTitle}
            onChange={(e) => {
              setFilterByTitle(e.currentTarget.value)} 
            }
          />
        </InputGroup>
        <Select.Root
          collection={categoryCollection}
          borderRadius="sm"
          p="0.5rem"
          value={fileterByCategory.length ? fileterByCategory : []}
          onValueChange={handleFilter}
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Categoria" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {categoryCollection.items.map((categoria) => (
                  <Select.Item item={categoria} key={categoria.id}>
                    {categoria.value}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
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
