import { useEffect, useState } from 'react';
import { createUsuario, updateUsuario } from '../api/usuarios';

const usuarioInicial = {
  nombre: '',
  correo: '',
};

function UsuarioForm({ usuarioSeleccionado, onSuccess, onCancel }) {
  const [form, setForm] = useState(usuarioInicial);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (usuarioSeleccionado) {
      setForm({
        nombre: usuarioSeleccionado.nombre ?? '',
        correo: usuarioSeleccionado.correo ?? '',
      });
    } else {
      setForm(usuarioInicial);
    }
  }, [usuarioSeleccionado]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setGuardando(true);
    setError(null);
    try {
      if (usuarioSeleccionado?.id) {
        await updateUsuario(usuarioSeleccionado.id, form);
      } else {
        await createUsuario(form);
      }
      onSuccess();
      setForm(usuarioInicial);
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div>
      <h2>{usuarioSeleccionado ? 'Editar usuario' : 'Nuevo usuario'}</h2>
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
        <div>
          <label>
            Correo:
            <input
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={guardando}>
          {guardando
            ? 'Guardando...'
            : usuarioSeleccionado
            ? 'Actualizar'
            : 'Crear'}
        </button>
        {usuarioSeleccionado && (
          <button type="button" onClick={onCancel}>
            Cancelar edición
          </button>
        )}
      </form>
    </div>
  );
}

export default UsuarioForm;