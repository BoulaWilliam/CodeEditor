import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Navbar from "./../Navbar/Navbar";

export default function Layout() {
    return (
        <>
            <Box minH="100vh" bg="gray.900" color="gray.500" px={6} py={8}>
                <Navbar />
                <Outlet />
            </Box>
        </>
    );
}
