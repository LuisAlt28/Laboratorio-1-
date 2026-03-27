import { API_BASE_URL } from './config';

export async function getClientes() {
  const response = await fetch(`${API_BASE_URL}/clientes`);
  if (!response.ok) throw new Error('Error al obtener clientes');
  return response.json();
}

export async function createCliente(data) {
  const response = await fetch(`${API_BASE_URL}/clientes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al crear cliente');
  return response.json();
}

export async function updateCliente(id, data) {
  const response = await fetch(`${API_BASE_URL}/clientes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al actualizar cliente');
  return response.json();
}

export async function deleteCliente(id) {
  const response = await fetch(`${API_BASE_URL}/clientes/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar cliente');
  return response.json();
}