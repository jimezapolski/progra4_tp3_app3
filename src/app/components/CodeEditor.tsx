"use client";

import { useState, useRef, useEffect } from "react";
import { Box, HStack, Button, useToast } from "@chakra-ui/react";
import Editor, { OnMount } from "@monaco-editor/react";
import { saveCode, getCodeVersions, updateCode } from '../utils';
import { VersionDeCodigo } from "../Modelo";
import ListBox from './ListBox';
import Output from "./Output";

const CodeEditor = () => {
  const [value, setValue] = useState<string>(""); // Código actual
  const [versions, setVersions] = useState<VersionDeCodigo[]>([]); // Estado para las versiones
  const [selectedVersion, setSelectedVersion] = useState<VersionDeCodigo | null>(null); // Versión seleccionada
  const [isUpdateButtonEnabled, setIsUpdateButtonEnabled] = useState<boolean>(false); // Estado para el botón de actualización
  const toast = useToast();
  useEffect(() => {
    // Función para obtener las versiones de código al montar el componente
    const fetchVersions = async () => {
      try {
        const data = await getCodeVersions();
        // Asegúrate de que todas las fechas sean objetos Date
        const versionesConFechasConvertidas = data.versiones.map(version => ({
          ...version,
          fecha: new Date(version.fecha),
        }));
        setVersions(versionesConFechasConvertidas);
      } catch (error) {
        console.error('Error fetching versions', error);
      }
    };

    fetchVersions();
  }, []);

  const handleChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      setValue(newValue);
      // Habilitar el botón de actualización si el código difiere de la versión seleccionada
      if (selectedVersion && newValue !== selectedVersion.codigo) {
        setIsUpdateButtonEnabled(true);
      } else {
        setIsUpdateButtonEnabled(false);
      }
    } else {
      setValue(""); // Para saber que no está vacío
    }
  };

  // Función que guarda el código en la API
  const handleSave = async () => {
    try {
      const message = await saveCode(value);
      toast({
        title: "Guardado con éxito",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Actualizar las versiones después de guardar
      const data = await getCodeVersions();
      const versionesConFechasConvertidas = data.versiones.map(version => ({
        ...version,
        fecha: new Date(version.fecha),
      }));
      setVersions(versionesConFechasConvertidas);
    } catch (error) {
      console.error('Error saving code', error);
      toast({
        title: "Error guardando el código",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSelectVersion = (codigo: string, fecha: Date) => {
    const version = versions.find(v => v.fecha.getTime() === fecha.getTime());
    if (version) {
      setSelectedVersion(version);
      setValue(codigo); // Establece el código seleccionado en el estado
      setIsUpdateButtonEnabled(false); // Deshabilitar el botón de actualización al seleccionar una versión
    }
  };

  // Función que actualiza el código en la versión seleccionada
  const handleUpdate = async () => {
    if (selectedVersion) {
      try {
        await updateCode({ fecha: selectedVersion.fecha, codigo: value });
        toast({
          title: "Código actualizado con éxito",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        // Actualizar las versiones después de la actualización
        const data = await getCodeVersions();
        const versionesConFechasConvertidas = data.versiones.map(version => ({
          ...version,
          fecha: new Date(version.fecha),
        }));
        setVersions(versionesConFechasConvertidas);
        setIsUpdateButtonEnabled(false); // Deshabilitar el botón de actualización después de actualizar
      } catch (error) {
        console.error('Error updating code', error);
        toast({
          title: "Error actualizando el código",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
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
            <Button variant="outline" colorScheme="blue" mb={6} mr={4}>
              JavaScript
            </Button>
            {/* ListBox que muestra las versiones de código y llama a handleSelectVersion al seleccionar una */}
            <ListBox versions={versions} onSelect={handleSelectVersion} />
  
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
            {/* Botón para actualizar los cambios */}
            <Button mt={3} ml={3} onClick={handleUpdate} isDisabled={!isUpdateButtonEnabled}>Actualizar código</Button>
          </Box>
        <Output editorRef={editorRef} />
      </HStack>
    </Box>
  );
};

export default CodeEditor;
