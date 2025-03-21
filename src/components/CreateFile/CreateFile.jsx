import { useContext, useState } from "react";
import axios from "axios";
import { userContext } from "../../Contexts/UserContext/User.context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CreateFile() {
    const navigate = useNavigate();
    const { token } = useContext(userContext);
    const AUTH_TOKEN = token;

    const [fileName, setFileName] = useState("");
    const [fileContent, setFileContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [fileData, setFileData] = useState(null);
    const [fileId, setFileId] = useState(null);
    const [updatedFileName, setUpdatedFileName] = useState("");
    const [updatedFileContent, setUpdatedFileContent] = useState("");
    const [generatedShareCode, setGeneratedShareCode] = useState("");

    // Create File
    const handleCreateFile = async () => {
        if (!fileName.trim() || !fileContent.trim()) {
            toast.error("File name and content are required!");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                "https://gradapi.duckdns.org/file",
                { fileName, fileContent },
                { headers: { Authorization: `Bearer ${AUTH_TOKEN}` } }
            );

            if (response.status === 200 && response.data.statusCode === 200) {
                toast.success("File created successfully!");
                setFileId(response.data.fileId);
            } else {
                toast.error(response.data.errorMessage || "Unexpected error occurred");
            }
        } catch (error) {
            toast.error(error.response?.data?.errorMessage || "Error creating file");
        } finally {
            setLoading(false);
        }
    };

    // Read File (Updated to send fileId in the request body)
    const fetchFile = async () => {
        if (!fileId) {
            toast.error("No file ID available to fetch!");
            return;
        }

        try {
            const response = await axios.get("https://gradapi.duckdns.org/file", {
                headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
                data: { fileId: Number(fileId) }, // Sending fileId in the request body
            });

            if (response.status === 200 && response.data.statusCode === 200) {
                setFileData(response.data);
                toast.success("File retrieved successfully!");
            } else {
                toast.error(response.data.errorMessage || "Unexpected error occurred");
            }
        } catch (error) {
            toast.error(error.response?.data?.errorMessage || "Error reading file");
        }
    };

    // Update File
    const updateFile = async () => {
        if (!fileId) {
            toast.error("No file ID available to update!");
            return;
        }

        try {
            const response = await axios.patch(
                "https://gradapi.duckdns.org/file",
                {
                    fileId: Number(fileId),
                    newFileName: updatedFileName.trim() || null,
                    newFileContent: updatedFileContent.trim() || null,
                },
                { headers: { Authorization: `Bearer ${AUTH_TOKEN}` } }
            );

            if (response.status === 200 && response.data.statusCode === 200) {
                setFileData(response.data);
                toast.success("File updated successfully!");
            } else {
                toast.error(response.data.errorMessage || "Unexpected error occurred");
            }
        } catch (error) {
            toast.error(error.response?.data?.errorMessage || "Error updating file");
        }
    };

    // Delete File
    const deleteFile = async () => {
        if (!fileId) {
            toast.error("No file ID available to delete!");
            return;
        }

        try {
            const response = await axios.delete("https://gradapi.duckdns.org/file", {
                headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
                data: { fileId: Number(fileId) },
            });

            if (response.status === 200 && response.data.statusCode === 200 && response.data.isDeleted) {
                toast.success("File deleted successfully!");
                setFileId(null);
                setFileData(null);
            } else {
                toast.error(response.data.errorMessage || "Unexpected error occurred");
            }
        } catch (error) {
            toast.error(error.response?.data?.errorMessage || "Error deleting file");
        }
    };

     // Share File
    const shareFile = async () => {
        if (!fileId) {
            toast.error("No file ID available to share!");
            return;
        }

        try {
            const response = await axios.post(
                "https://gradapi.duckdns.org/share",
                { fileId: Number(fileId) },
                { headers: { Authorization: `Bearer ${AUTH_TOKEN}` } }
            );

            if (response.status === 200 && response.data.statusCode === 200) {
                setGeneratedShareCode(response.data.fileShareCode);
                toast.success("File shared successfully! Share Code: " + response.data.fileShareCode);
            } else {
                toast.error(response.data.errorMessage || "Unexpected error occurred");
            }
        } catch (error) {
            toast.error(error.response?.data?.errorMessage || "Error sharing file");
        }
    }
    

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-8 w-full max-w-md text-gray-200">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-100">
                File Management
            </h2>
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="File Name"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="w-full bg-gray-800 text-white placeholder-gray-400 p-3 rounded focus:ring-2 focus:ring-blue-500"
                />
    
                <textarea
                    placeholder="File Content"
                    value={fileContent}
                    onChange={(e) => setFileContent(e.target.value)}
                    rows={5}
                    className="w-full bg-gray-800 text-white placeholder-gray-400 p-3 rounded focus:ring-2 focus:ring-blue-500"
                />
    
                <button
                    onClick={handleCreateFile}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded transition-transform transform hover:scale-105"
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create File"}
                </button>
    
                {fileId && (
                    <>
                        <button
                            onClick={fetchFile}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded mt-2 transition-transform transform hover:scale-105"
                        >
                            Read File
                        </button>
    
                        <input
                            type="text"
                            placeholder="New File Name (optional)"
                            value={updatedFileName}
                            onChange={(e) => setUpdatedFileName(e.target.value)}
                            className="w-full bg-gray-800 text-white placeholder-gray-400 p-3 rounded mt-2 focus:ring-2 focus:ring-yellow-500"
                        />
                        <textarea
                            placeholder="New File Content (optional)"
                            value={updatedFileContent}
                            onChange={(e) => setUpdatedFileContent(e.target.value)}
                            rows={3}
                            className="w-full bg-gray-800 text-white placeholder-gray-400 p-3 rounded mt-2 focus:ring-2 focus:ring-yellow-500"
                        />
                        <button
                            onClick={updateFile}
                            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded mt-2 transition-transform transform hover:scale-105"
                        >
                            Update File
                        </button>
    
                        <button
                            onClick={deleteFile}
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded mt-2 transition-transform transform hover:scale-105"
                        >
                            Delete File
                        </button>
    
                        {/* Share File Button */}
                        <button
                            onClick={shareFile}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded mt-2 transition-transform transform hover:scale-105"
                        >
                            Share File
                        </button>
    
                        {/* Display Share Code */}
                        {generatedShareCode && (
                            <div className="bg-gray-900 p-4 rounded text-white mt-4">
                                <p className="text-green-400 font-semibold">Share Code:</p>
                                <p className="text-lg font-bold">{generatedShareCode}</p>
                            </div>
                        )}
                    </>
                )}
    
                <button
                    onClick={() => navigate("/code")}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded mt-2 transition-transform transform hover:scale-105"
                >
                    Back to Code Editor
                </button>
    
                {fileData && (
                    <div className="bg-gray-900 p-4 rounded text-white mt-4">
                        <h3 className="text-lg font-semibold">{fileData.fileName}</h3>
                        <p className="text-gray-400 text-sm">Created: {fileData.fileCreationDate}</p>
                        <p className="text-gray-400 text-sm">Last Modified: {fileData.lastModifiedDate}</p>
                        <p className="text-gray-400 text-sm">Size: {fileData.fileSizeInBytes} bytes</p>
                        <pre className="whitespace-pre-wrap bg-gray-800 p-3 rounded">{fileData.fileContent}</pre>
                    </div>
                )}
            </div>
        </div>
    </div>
    
    );
}
