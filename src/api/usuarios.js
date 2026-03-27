import { API_BASE_URL } from './config';

export async function getUsuarios() {
  const response = await fetch(`${API_BASE_URL}/usuarios`);
  if (!response.ok) {
    throw new Error('Error al obtener usuarios');
  }
  return response.json();
}

export async function createUsuario(data) {
  const response = await fetch(`${API_BASE_URL}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Error al crear usuario');
  }
  return response.json();
}

export async function updateUsuario(id, data) {
  const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Error al actualizar usuario');
  }
  return response.json();
}

export async function deleteUsuario(id) {
  const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error al eliminar usuario');
  }
  return response.json();
}