import React from 'react'
import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

export default function Layout() {
    return (
        <>
            <Box minH="100vh" className="dark" color="gray.500" px={6} py={8}>
                <Outlet />
            </Box>
        </>
    )
}
