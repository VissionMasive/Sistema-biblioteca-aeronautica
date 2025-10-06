import "../App.css";
import { NavLink } from "react-router";
import BookIcon from '@mui/icons-material/Book';
import SpeedIcon from '@mui/icons-material/Speed';
import { Accordion, Span, Stack, Text } from "@chakra-ui/react"
import { useState } from "react";
import { Link } from "react-router";
export function Sidemenu() {
    const [value, setValue] = useState(["second-item"])
    const items = [
  { value: "Cuenta", title: "Cuenta", text: "Login" },
  { value: "second-item", title: "Second Item", text: "Some value 2..." },
  { value: "third-item", title: "Third Item", text: "Some value 3..." },
]
    return (
        <div className="Sidemenu">
            <Stack gap="4">
                <Accordion.Root value={value} onValueChange={(e) => setValue(e.value)}>
                        <Accordion.Item key={1}>
                            <Accordion.ItemTrigger>
                                <Span flex="1">Cuenta</Span>
                                <Accordion.ItemIndicator />
                            </Accordion.ItemTrigger>
                            <Accordion.ItemContent>
                                <Accordion.ItemBody>
                                    <Link to="/login">Login</Link>
                                </Accordion.ItemBody>
                                <Accordion.ItemBody>
                                    <Link to="/register">Registro</Link>
                                </Accordion.ItemBody>
                            </Accordion.ItemContent>
                        </Accordion.Item>
                        <Accordion.Item>
                            <Accordion.ItemTrigger>
                                <Span flex="1">Libros</Span>
                                <Accordion.ItemIndicator />
                            </Accordion.ItemTrigger>
                            <Accordion.ItemContent>
                                <Accordion.ItemBody>Stock de libros</Accordion.ItemBody>
                                <Accordion.ItemBody>Agregar Libro</Accordion.ItemBody>
                                <Accordion.ItemBody>Eliminar Libro</Accordion.ItemBody>
                            </Accordion.ItemContent>
                        </Accordion.Item>
                </Accordion.Root>
            </Stack>
        </div>
    )
}
