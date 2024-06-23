import { EditorDeCodigo } from "./Modelo";

// utils.ts - aca nos copiariamos nuestra API
export default async function api<T>(url: string): Promise<T> {
    const urlCompleta = `${process.env.NEXT_PUBLIC_URL_API}${url}`;
    console.log(urlCompleta);
    const response = await fetch(urlCompleta);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await (response.json() as Promise<T>);
}

export interface VerCodigoParams {
  codigo: string;
}

export interface VerCodigoRespuesta {
  resultado: string;
  stderr?: string;
}

export async function executeCode(params: VerCodigoParams): Promise<VerCodigoRespuesta> {
  const urlCompleta = `${process.env.NEXT_PUBLIC_URL_API}/api/ejecutar`;

  try {
    const response = await fetch(urlCompleta, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Error mostrando el código: ${body}`);
    }

    const result = await response.json();
    console.log("Fetched result:", result); // Debug: log fetched result
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Fetch error: ${error.message}`);
    } else {
      throw new Error('Unknown fetch error');
    }
  }
}