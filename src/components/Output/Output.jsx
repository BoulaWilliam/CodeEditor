import { Textarea, Box } from "@chakra-ui/react";

export default function Output({ output }) {
    return (
        
        <Box width="100%" height="55vh" bg="gray.900" p={4}>
            <Textarea value={output} readOnly placeholder="Output will appear here..."
                height="100%" bg="transparent" color="white"fontFamily="monospace"/>
        </Box>
    );
}
