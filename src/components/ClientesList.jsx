import { useEffect, useState } from 'react';
import { getClientes, deleteCliente } from '../api/clientes';

function ClienteList({ onEdit }) {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  async function cargarClientes() {
    try {
      setCargando(true);
      setError(null);
      const data = await getClientes();
      setClientes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarClientes();
  }, []);

  async function handleDelete(id) {
    if (!confirm('¿Seguro que deseas eliminar este cliente?')) return;
    try {
      await deleteCliente(id);
      await cargarClientes();
    } catch (err) {
      alert('Error al eliminar: ' + err.message);
    }
  }

  if (cargando) return <p>Cargando clientes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Lista de Clientes</h2>
      {clientes.length === 0 ? (
        <p>No hay clientes registrados.</p>
      ) : (
        <table border="1" cellPadding="4" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.nombre}</td>
                <td>{c.email}</td>
                <td>
                  <button onClick={() => onEdit(c)}>Editar</button>
                  <button onClick={() => handleDelete(c.id)} style={{ marginLeft: '5px' }}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <br />
      <button onClick={cargarClientes}>Recargar Lista</button>
    </div>
  );
}

export default ClienteList;