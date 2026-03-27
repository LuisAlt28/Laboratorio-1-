import { API_BASE_URL } from './config';

export async function getProductos() {
  const response = await fetch(`${API_BASE_URL}/productos`);
  if (!response.ok) throw new Error('Error al obtener productos');
  return response.json();
}

export async function createProducto(data) {
  const response = await fetch(`${API_BASE_URL}/productos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al crear producto');
  return response.json();
}

export async function updateProducto(id, data) {
  const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al actualizar producto');
  return response.json();
}

export async function deleteProducto(id) {
  const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar producto');
  return response.json();
}

