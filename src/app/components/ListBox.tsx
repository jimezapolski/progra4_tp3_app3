import React from 'react';
import { VersionDeCodigo } from '../Modelo';

interface ListBoxProps {
  versions: VersionDeCodigo[];
  onSelect: (codigo: string) => void; // Propiedad que recibe la función onSelect
}

const ListBox: React.FC<ListBoxProps> = ({ versions, onSelect }) => {
  return (
    <select onChange={(e) => onSelect(e.target.value)}> {/* Llama a onSelect cuando se selecciona una versión */}
      {versions.map((version, index) => (
        <option key={index} value={version.codigo}>
          {`Versión ${index + 1} - ${new Date(version.fecha).toLocaleString()}`}
        </option>
      ))}
    </select>
  );
};

export default ListBox;
