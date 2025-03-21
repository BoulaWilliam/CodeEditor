import { useContext, useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { motion } from "framer-motion";
import { userContext } from "../../Contexts/UserContext/User.context";
import Output from "../Output/Output";
import { useNavigate } from "react-router-dom";

const API_URL = "https://gradapi.duckdns.org/compile";

export default function CodeEditor() {
  const navigate = useNavigate();
  let { token } = useContext(userContext);
  const AUTH_TOKEN = token;

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [loadingRun, setLoadingRun] = useState(false);

  const handleRun = async () => {
    setLoadingRun(true);
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
    setLoadingRun(false);
  };

  return (
    <div className="container mt-10 pt-10">
      <div className="flex p-4 pt-8 mt-10 gap-12">
        {/* Code Editor Section */}
        <div className="flex flex-col flex-2 gap-4 w-2/3">
          <select
            className="p-2 border rounded bg-gray-800 text-white"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
          <Editor
            height="50vh"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || "")}
          />
          <div className="flex gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleRun}
              className="px-4 py-2  bg-green-500 text-white rounded shadow hover:bg-green-600"
              disabled={loadingRun}
            >
              {loadingRun ? "Running..." : "Run Code"}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/CreateFile")}
              className="px-4 py-2  bg-blue-500 text-white rounded shadow hover:bg-blue-600"
            >
              Create File
            </motion.button>
          </div>
        </div>

        {/* Output Section */}
        <div className="flex-1 w-1/3">
          <Output output={output} />
        </div>
      </div>
    </div>
  );
}
