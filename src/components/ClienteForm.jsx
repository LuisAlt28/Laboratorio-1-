import { useEffect, useState } from 'react';
import { createCliente, updateCliente } from '../api/clientes';

const clienteInicial = {
  nombre: '',
  email: '',
};

function ClienteForm({ clienteSeleccionado, onSuccess, onCancel }) {
  const [form, setForm] = useState(clienteInicial);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (clienteSeleccionado) {
      setForm({
        nombre: clienteSeleccionado.nombre ?? '',
        email: clienteSeleccionado.email ?? '',
      });
    } else {
      setForm(clienteInicial);
    }
  }, [clienteSeleccionado]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setGuardando(true);
    setError(null);
    try {
      if (clienteSeleccionado?.id) {
        await updateCliente(clienteSeleccionado.id, form);
      } else {
        await createCliente(form);
      }
      onSuccess();
      setForm(clienteInicial);
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3>{clienteSeleccionado ? 'Editar Cliente' : 'Nuevo Cliente'}</h3>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre Completo: </label>
          <input name="nombre" value={form.nombre} onChange={handleChange} required />
        </div>
        <br />
        <div>
          <label>Email: </label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <br />
        <button type="submit" disabled={guardando}>
          {guardando ? 'Guardando...' : clienteSeleccionado ? 'Actualizar' : 'Crear'}
        </button>
        {clienteSeleccionado && (
          <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
}

export default ClienteForm;