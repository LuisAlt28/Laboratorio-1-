import { useEffect, useState } from 'react';
// Importamos solo lo necesario de la API de productos
import { getProductos, deleteProducto } from '../api/productos';

function ProductosList({ onEdit }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener la lista desde el servidor
  async function cargarProductos() {
    try {
      setCargando(true);
      setError(null);
      const data = await getProductos();
      setProductos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  // Se ejecuta al abrir el componente
  useEffect(() => {
    cargarProductos();
  }, []);

  // Función para borrar un producto
  async function handleDelete(id) {
    if (!confirm('¿Seguro que deseas eliminar este producto?')) return;
    try {
      await deleteProducto(id);
      // Tras borrar, volvemos a cargar la lista para que desaparezca de la tabla
      await cargarProductos();
    } catch (err) {
      alert('Error al eliminar: ' + err.message);
    }
  }

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h3> Lista de productos</h3>
      {productos.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th>Id</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>${p.precio}</td>
                <td>
                  <button onClick={() => onEdit(p)}>Editar</button>
                  <button 
                    onClick={() => handleDelete(p.id)} 
                    style={{ marginLeft: '10px', color: 'red' }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <br />
      <button onClick={cargarProductos}>🔄 Actualizar lista</button>
    </div>
  );
}

export default ProductosList;