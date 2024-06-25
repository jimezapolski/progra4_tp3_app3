"use client";

import { useState, useRef, useEffect } from "react";
import { Box, HStack, Text, Button } from "@chakra-ui/react";
import Editor, { OnMount } from "@monaco-editor/react";
import { saveCode, getCodeVersions } from '../utils';
import { VersionDeCodigo, VersionesDeCodigo } from "../Modelo";
import ListBox from './ListBox';
import Output from "./Output";


const CodeEditor = () => {
  const [value, setValue] = useState<string>(""); //codigo actual
  const [versions, setVersions] = useState<VersionDeCodigo[]>([]); // Estado para las versiones

  useEffect(() => {
    // Función para obtener las versiones de código al montar el componente
    const fetchVersions = async () => {
      try {
        const data = await getCodeVersions();
        setVersions(data.versiones);
      } catch (error) {
        console.error('Error fetching versions', error);
      }
    };

    fetchVersions();
  }, []);

    const handleChange = (newValue: string | undefined) => {
      if (newValue !== undefined) {
        setValue(newValue);
      } else {
        setValue(""); //para saber que no este vacio
      }
    };

    // Función que guarda el código en la API
  const handleSave = async () => {
    try {
      const message = await saveCode(value);
      alert("Guardadado con exito"); // Mostrar el mensaje de éxito del servidor

      // Actualizar las versiones después de guardar
      const data = await getCodeVersions();
      setVersions(data.versiones);
    } catch (error) {
      console.error('Error saving code', error);
      alert(`Error guardando el código`);
    }
  };

    const handleSelectVersion = (codigo:string) => {
      setValue(codigo); // Establece el código seleccionado en el estado
    };

  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <Box>
      <HStack spacing={4}>
        <Box w="50%">
          {/* <Text mb={2} fontSize="lg">
            Langueage
          </Text> */}
          <Button variant="outline" colorScheme="blue" mb={6} mr={4}>
            JavaScript
          </Button>
              {/* ListBox que muestra las versiones de código y llama a handleSelectVersion al seleccionar una */}
          <ListBox  versions={versions} onSelect={handleSelectVersion} />
          
          <Editor
            height="70vh"
            theme="vs-dark"
            defaultLanguage="javascript"
            defaultValue="// some comment"
            onMount={handleEditorDidMount}
            value={value}
            onChange={handleChange}
          />
                    {/* Botón para guardar los cambios */}
        <Button mt={3} onClick={handleSave}>Guardar cambios</Button>

        </Box>
        <Output editorRef={editorRef}  />
      </HStack>
    </Box>
  );
};

export default CodeEditor;
