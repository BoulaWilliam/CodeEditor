import { useRef, useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";


const CodeEditor = () => {

  const [value, setValue] = useState('')

  const editorRef = useRef()

  const onMount = (editor) => {
    editorRef.current = editor
    editor.focus()
  } 

  return (
    <>
      <Box>
        <HStack spacing={4}>
          <Box w="50%">
          <Editor height="80vh" theme="vs-dark" defaultLanguage="Javascript"
          value={value} defaultValue="//Write Your Code Here" onChange={value =>({setValue})}
          onMount={onMount} />
          </Box>
        </HStack>
      </Box></>

  );
};
export default CodeEditor;
