import { useState } from 'react';
import ProveedoresList from '../components/ProveedoresList';
import ProveedorForm from '../components/ProveedorForm';

function ProveedoresPage() {
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
  const [recargarLista, setRecargarLista] = useState(0);

  function handleEdit(proveedor) {
    setProveedorSeleccionado(proveedor);
  }

  function handleSuccess() {
    setProveedorSeleccionado(null);
    setRecargarLista((prev) => prev + 1);
  }

  function handleCancel() {
    setProveedorSeleccionado(null);
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Módulo de Proveedores</h1>
      <hr />
      <ProveedorForm
        proveedorSeleccionado={proveedorSeleccionado}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
      <hr />
      <ProveedoresList 
        key={recargarLista} 
        onEdit={handleEdit} 
      />
    </div>
  );
}

export default ProveedoresPage;