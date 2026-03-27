import { useEffect, useState } from 'react';
import { createProveedor, updateProveedor } from '../api/proveedores';

const proveedorInicial = {
  nombre: '',
  contacto: '', // Ejemplo: nombre de la persona de contacto o teléfono
};

function ProveedorForm({ proveedorSeleccionado, onSuccess, onCancel }) {
  const [form, setForm] = useState(proveedorInicial);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (proveedorSeleccionado) {
      setForm({
        nombre: proveedorSeleccionado.nombre ?? '',
        contacto: proveedorSeleccionado.contacto ?? '',
      });
    } else {
      setForm(proveedorInicial);
    }
  }, [proveedorSeleccionado]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setGuardando(true);
    setError(null);
    try {
      if (proveedorSeleccionado?.id) {
        await updateProveedor(proveedorSeleccionado.id, form);
      } else {
        await createProveedor(form);
      }
      onSuccess();
      setForm(proveedorInicial);
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3>{proveedorSeleccionado ? 'Editar Proveedor' : 'Nuevo Proveedor'}</h3>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre Proveedor: </label>
          <input name="nombre" value={form.nombre} onChange={handleChange} required />
        </div>
        <br />
        <div>
          <label>Contacto/Tel: </label>
          <input name="contacto" value={form.contacto} onChange={handleChange} required />
        </div>
        <br />
        <button type="submit" disabled={guardando}>
          {guardando ? 'Guardando...' : proveedorSeleccionado ? 'Actualizar' : 'Crear'}
        </button>
        {proveedorSeleccionado && (
          <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
}

export default ProveedorForm;