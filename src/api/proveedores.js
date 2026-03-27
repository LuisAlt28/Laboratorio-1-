import { API_BASE_URL } from './config';

export async function getProveedores() {
  const response = await fetch(`${API_BASE_URL}/proveedores`);
  if (!response.ok) throw new Error('Error al obtener proveedores');
  return response.json();
}

export async function createProveedor(data) {
  const response = await fetch(`${API_BASE_URL}/proveedores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al crear proveedor');
  return response.json();
}

export async function updateProveedor(id, data) {
  const response = await fetch(`${API_BASE_URL}/proveedores/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al actualizar proveedor');
  return response.json();
}

export async function deleteProveedor(id) {
  const response = await fetch(`${API_BASE_URL}/proveedores/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar proveedor');
  return response.json();
}