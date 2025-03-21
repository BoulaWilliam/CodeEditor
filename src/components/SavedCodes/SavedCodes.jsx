import { useState, useEffect } from "react";
import { Trash2, Eye, Share2, Edit } from "lucide-react";

export default function SavedCodes() {
    const [savedCodes, setSavedCodes] = useState([]);
    const [selectedCode, setSelectedCode] = useState(null);

    useEffect(() => {
        const storedCodes = JSON.parse(localStorage.getItem("savedCodes")) || [];
        setSavedCodes(storedCodes);
    }, []);

    const handleDelete = (id) => {
        const updatedCodes = savedCodes.filter((snippet) => snippet.id !== id);
        localStorage.setItem("savedCodes", JSON.stringify(updatedCodes));
        setSavedCodes(updatedCodes);
    };

    const handleRead = (code) => {
        setSelectedCode(code);
    };

    const handleShare = (code) => {
        navigator.clipboard.writeText(code);
        alert("Code copied to clipboard!");
    };

    const handleUpdate = (id) => {
        const snippet = savedCodes.find((s) => s.id === id);
        if (!snippet) return;

        const newCode = prompt("Edit your code:", snippet.code);
        if (newCode !== null) {
            const updatedCodes = savedCodes.map((snippet) =>
                snippet.id === id ? { ...snippet, code: newCode } : snippet
            );
            localStorage.setItem("savedCodes", JSON.stringify(updatedCodes));
            setSavedCodes(updatedCodes);
        }
    };

    return (
        <div className="p-4 pt-8 mt-10 min-h-screen bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-6 text-center">Saved Codes</h1>
            {savedCodes.length === 0 ? (
                <p className="text-gray-400 text-center">No saved code snippets yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {savedCodes.map((snippet) => (
                        <div
                            key={snippet.id}
                            className="relative bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl hover:bg-gray-700 transition duration-300"
                        >
                            {/* Folder Shape */}
                            <div className="bg-yellow-400 h-6 w-3/4 rounded-t-lg"></div>
                            <div className="p-4 bg-gray-900 rounded-lg">
                                <h2 className="text-lg font-semibold text-yellow-400 mb-2">
                                    {snippet.language.toUpperCase()} File
                                </h2>

                                {/* Buttons */}
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => handleDelete(snippet.id)}
                                        className="p-2 bg-red-500 rounded hover:bg-red-600 transition duration-300"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleRead(snippet.code)}
                                        className="p-2 bg-blue-500 rounded hover:bg-blue-600 transition duration-300"
                                    >
                                        <Eye size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleShare(snippet.code)}
                                        className="p-2 bg-green-500 rounded hover:bg-green-600 transition duration-300"
                                    >
                                        <Share2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleUpdate(snippet.id)}
                                        className="p-2 bg-yellow-500 rounded hover:bg-yellow-600 transition duration-300"
                                    >
                                        <Edit size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Read Code Modal */}
            {selectedCode && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-3/4 max-w-xl">
                        <h2 className="text-lg font-bold text-yellow-400 mb-4">Code Preview</h2>
                        <pre className="bg-gray-800 text-white p-4 rounded-md">{selectedCode}</pre>
                        <button
                            onClick={() => setSelectedCode(null)}
                            className="mt-4 px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition duration-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
