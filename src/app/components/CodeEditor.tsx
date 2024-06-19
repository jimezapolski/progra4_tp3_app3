"use client";

import { useState, useRef } from "react";
import { Box, HStack, Text, Button } from "@chakra-ui/react";
import Editor, { OnMount } from "@monaco-editor/react";
import Output from "./Output";

const CodeEditor = () => {
  const [value, setValue] = useState<string>("");

  const handleChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      setValue(newValue);
    } else {
      setValue(""); //para saber que no este vacio
    }
  };

  /*
    Uso de useRef:
    useRef<OnMount>(): Utilizamos useRef para mantener una referencia al editor una vez que se monta. OnMount es un tipo proporcionado por @monaco-editor/react que representa la función de montaje del editor.
    Función onMount:
    onMount: OnMount: Definimos onMount como una función que toma dos argumentos: editor (el editor de código) y monaco (el objeto de la instancia de Monaco Editor).
    Interacción con el Editor:
    editorRef.current = editor;: Guardamos la referencia al editor en editorRef.current para poder interactuar con él de manera imperativa más adelante si es necesario.
    editor.focus();: Llamamos al método focus() del editor para asegurarnos de que esté enfocado una vez que se monte. */

  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <Box>
      <HStack spacing={4}>
        <Box w="50%">
          <Text mb={2} fontSize="lg">
            Langueage
          </Text>
          <Button variant="outline" colorScheme="blue" mb={4}>
            JavaScript
          </Button>
          <Editor
            height="75vh"
            theme="vs-dark"
            defaultLanguage="javascript"
            defaultValue="// some comment"
            onMount={handleEditorDidMount}
            value={value}
            onChange={handleChange}
          />
        </Box>
        <Output editorRefProps={editorRef.current} />
      </HStack>
    </Box>
  );
};

export default CodeEditor;
