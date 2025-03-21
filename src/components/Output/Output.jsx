// import { Textarea, Box } from "@chakra-ui/react";

export default function Output({ output }) {
    return (
        
        <div className="w-full h-[60vh] bg-gray-900 p-4">
        <textarea 
            value={output} 
            readOnly 
            placeholder="Output will appear here..." 
            className="w-full h-full bg-transparent text-white font-mono border-none resize-none outline-none"
        />
    </div>
    );
}
