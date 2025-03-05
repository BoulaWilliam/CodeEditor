import { useState, useContext } from "react";
import axios from "axios";
import { Button, Input, VStack, Box } from "@chakra-ui/react";
import { userContext } from "../../Contexts/UserContext/User.context";
import FileDetails from "./FileDetails";

const API_URL = "https://colleagues-break-army-judge.trycloudflare.com/file";

export default function ReadFile() {
    let { token } = useContext(userContext);
    const AUTH_TOKEN = token;

    const [fileId, setFileId] = useState("");
    const [fileData, setFileData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFetchFile = async () => {
        if (!fileId) return;
        setLoading(true);
        setError("");
        setFileData(null);
        try {
            const response = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
                data: { fileId: Number(fileId) },
            });
            setFileData(response.data);
        } catch (error) {
            setError(error.response?.data?.error || "Error fetching file");
        }
        setLoading(false);
    };

    return (
        <VStack spacing={4} p={4}>
            <Input
                placeholder="Enter File ID"
                value={fileId}
                onChange={(e) => setFileId(e.target.value)}
                type="number"
            />
            <Button onClick={handleFetchFile} isLoading={loading} colorScheme="blue">
                Read File
            </Button>
            {error && <Box color="red.500">{error}</Box>}
            {fileData && <FileDetails file={fileData} />}
        </VStack>
    );
}
