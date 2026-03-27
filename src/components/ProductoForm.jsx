import { useEffect, useState } from 'react';
// Importamos las funciones correctas de la API de productos
import { createProducto, updateProducto } from '../api/productos';

const productoInicial = {
  nombre: '',
  precio: '',
};

function ProductoForm({ productoSeleccionado, onSuccess, onCancel }) {
  const [form, setForm] = useState(productoInicial);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  // Cada vez que seleccionamos un producto para editar, rellenamos el formulario
  useEffect(() => {
    if (productoSeleccionado) {
      setForm({
        nombre: productoSeleccionado.nombre ?? '',
        precio: productoSeleccionado.precio ?? '',
      });
    } else {
      setForm(productoInicial);
    }
  }, [productoSeleccionado]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setGuardando(true);
    setError(null);
    try {
      if (productoSeleccionado?.id) {
        // Si hay ID, estamos actualizando
        await updateProducto(productoSeleccionado.id, form);
      } else {
        // Si no hay ID, estamos creando uno nuevo
        await createProducto(form);
      }
      onSuccess(); // Avisamos a App.jsx que todo salió bien
      setForm(productoInicial);
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3>{productoSeleccionado ? ' Editar producto' : ' Nuevo producto'}</h3>
      
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nombre: 
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            Precio: 
            <input
              type="number"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <br />
        
        <button type="submit" disabled={guardando}>
          {guardando
            ? 'Guardando...'
            : productoSeleccionado
            ? 'Actualizar Producto'
            : 'Crear Producto'}
        </button>

        {productoSeleccionado && (
          <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
            Cancelar edición
          </button>
        )}
      </form>
    </div>
  );
}

export default ProductoForm;