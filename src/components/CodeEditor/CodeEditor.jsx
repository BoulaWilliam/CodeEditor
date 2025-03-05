import { useContext, useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { Button, Select, Box, VStack, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { userContext } from "../../Contexts/UserContext/User.context";
import Output from "../Output/Output";

const API_URL = "https://colleagues-break-army-judge.trycloudflare.com/compile";

export default function CodeEditor() {
  let { token } = useContext(userContext);
  const AUTH_TOKEN = token;

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    setOutput("Running...");
    try {
      const response = await axios.post(
        API_URL,
        { language, codeToRun: code },
        { headers: { Authorization: `Bearer ${AUTH_TOKEN}` } }
      );
      setOutput(response.data.output);
    } catch (error) {
      setOutput(error.response?.data?.error || "Error executing code");
    }
    setLoading(false);
  };

  return (
    <HStack spacing={12} align="flex-start" className="p-4 pt-8 mt-10">
      {/* Code Editor Section */}
      <VStack align="stretch" flex={2} spacing={4}>
        <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </Select>
        <Editor
          height="50vh"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
        />
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button onClick={handleRun} isLoading={loading} colorScheme="blue">
            Run Code
          </Button>
        </motion.div>
      </VStack>
      
      {/* Output Section */}
      <Box flex={1}>
        <Output output={output} />
      </Box>
    </HStack>
  );
}
