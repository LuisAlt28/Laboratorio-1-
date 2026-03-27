import { useState } from 'react';
// IMPORTANTE: Aquí quitamos la "s" de ProductoList porque así se llama tu archivo
import ProductosList from '../components/ProductoList';
import ProductoForm from '../components/ProductoForm';

function ProductosPage() {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [recargarLista, setRecargarLista] = useState(0);

  // Cuando haces clic en "Editar" en la lista
  function handleEdit(producto) {
    setUsuarioSeleccionado(null); // Limpiamos por si acaso
    setProductoSeleccionado(producto);
  }

  // Cuando el formulario guarda con éxito
  function handleSuccess() {
    setProductoSeleccionado(null);
    setRecargarLista((prev) => prev + 1); // Esto refresca la lista automáticamente
  }

  // Cuando cancelas la edición
  function handleCancel() {
    setProductoSeleccionado(null);
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1> Módulo de Productos</h1>

      <hr />

      {/* Formulario para Crear o Editar */}
      <ProductoForm
        productoSeleccionado={productoSeleccionado}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />

      <hr />

      {/* Tabla con la lista de productos */}
      <ProductosList 
        key={recargarLista} 
        onEdit={handleEdit} 
      />
    </div>
  );
}

export default ProductosPage;