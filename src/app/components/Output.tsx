// src/components/Output.tsx
import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode, VerCodigoRespuesta } from "../utils";

interface OutputProps {
  editorRef: React.RefObject<any>;
}

const Output = ({ editorRef }: OutputProps) => {
  const toast = useToast();
  const [output, setOutput] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current?.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      console.log(sourceCode);
      const result: VerCodigoRespuesta = await executeCode({ codigo: sourceCode });
      console.log("API:", result);
      setOutput(result.resultado);
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error: any) {
      console.error(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      <Box
        height="75vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output
          ? output.split("\n").map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
};

export default Output;
