import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Spacer, Button, Heading, IconButton, VStack, Collapse } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { userContext } from './../../Contexts/UserContext/User.context';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { token, logOut } = useContext(userContext);
    
    return (
        <Box bg="gray.800" color="gray.500" px={6} py={4}
            boxShadow="md" position="fixed" top={0}
            left={0} right={0} width="100%" zIndex={1000}>
            <Flex align="center">
                <Heading size="md" color="white">MyApp</Heading>
                <Spacer />
                
                {/* Toggle button for mobile */}
                <IconButton 
                    display={{ base: "block", md: "none" }} 
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} 
                    onClick={() => setIsOpen(!isOpen)} 
                    variant="outline" 
                    color="white"
                    aria-label="Toggle Navigation"
                />

                {/* Desktop Menu */}
                <Flex gap={4} display={{ base: "none", md: "flex" }}>
                    {!token ? (
                        <>
                            <Button as={Link} to="/login" colorScheme="teal" variant="outline">Login</Button>
                            <Button as={Link} to="/register" colorScheme="teal" variant="outline">Register</Button>
                        </>
                    ) : (
                        <Button onClick={logOut} colorScheme="red" variant="outline">Logout</Button>
                    )}
                    <Button as={Link} to="/code-editor" colorScheme="teal" variant="solid">Code Editor</Button>
                </Flex>
            </Flex>

            {/* Mobile Menu */}
            <Collapse in={isOpen} animateOpacity> 
                <VStack my={4} display={{ md: "none" }}>
                    {!token ? (
                        <>
                            <Button my={2} as={Link} to="/login" colorScheme="teal" variant="outline" w="full">Login</Button>
                            <Button my={2} as={Link} to="/register" colorScheme="teal" variant="outline" w="full">Register</Button>
                        </>
                    ) : (
                        <Button my={2} as={Link} to={"/login"} onClick={logOut} colorScheme="red" variant="outline" w="full">Logout</Button>
                    )}
                    <Button my={2} as={Link} to="/code-editor" colorScheme="teal" variant="solid" w="full">Code Editor</Button>
                </VStack>
            </Collapse>
        </Box>
    );
}
