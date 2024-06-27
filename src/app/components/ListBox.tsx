import React from 'react';
import { VersionDeCodigo } from '../Modelo';

interface ListBoxProps {
  versions: VersionDeCodigo[];
  onSelect: (codigo: string, fecha: Date) => void; // Propiedad que recibe la función onSelect
}

const ListBox: React.FC<ListBoxProps> = ({ versions, onSelect }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVersion = versions.find(v => v.codigo === event.target.value);
    if (selectedVersion) {
      onSelect(selectedVersion.codigo, selectedVersion.fecha);
    }
  };

  return (
    <select onChange={handleChange}> {/* Llama a handleChange cuando se selecciona una versión */}
      <option value="" disabled selected>Selecciona una versión</option>
      {versions.map((version, index) => (
        <option key={index} value={version.codigo}>
          {`Versión ${index + 1} - ${new Date(version.fecha).toLocaleString()}`}
        </option>
      ))}
    </select>
  );
};

export default ListBox;
