import { useState } from 'react';
import ClientesList from '../components/ClientesList';
import ClienteForm from '../components/ClienteForm';

function ClientesPage() {
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [recargarLista, setRecargarLista] = useState(0);

  function handleEdit(cliente) {
    setClienteSeleccionado(cliente);
  }

  function handleSuccess() {
    setClienteSeleccionado(null);
    setRecargarLista((prev) => prev + 1);
  }

  function handleCancel() {
    setClienteSeleccionado(null);
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Módulo de Clientes</h1>
      <hr />
      <ClienteForm
        clienteSeleccionado={clienteSeleccionado}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
      <hr />
      <ClientesList 
        key={recargarLista} 
        onEdit={handleEdit} 
      />
    </div>
  );
}

export default ClientesPage;