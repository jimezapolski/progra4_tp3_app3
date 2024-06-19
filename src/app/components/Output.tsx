import { Box, Button, Text } from "@chakra-ui/react";
import { EditorDeCodigo } from '../Modelo'

interface OutputProps {
  editorRefProps: {
    codigo: EditorDeCodigo;
  };
}

const Output = ({ editorRefProps }: OutputProps) => {

  const runCode = async () => {
    const sourceCode = editorRefProps.codigo;
    if (!sourceCode) return;
    try {
      // Lógica para ejecutar el código
    } catch (error) {
      console.error('Error running code:', error);
    }
  };

  return (
    <Box w='50%'>
      <Text mb={2} fontSize='lg'>Output</Text>
      <Button
        variant='outline'
        colorScheme="green"
        mb={4}
        onClick={runCode}
      >
        Run Code
      </Button>
      <Box
        height='75vh'
        p={2}
        border='1px solid'
        borderColor='#333'
      >
        Test
      </Box>
    </Box>
  );
};

export default Output;

