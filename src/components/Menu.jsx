import { NavLink } from 'react-router-dom';

function Menu() {
  const linkStyle = ({ isActive }) => ({
    display: 'inline-block',
    marginRight: '1rem',
    padding: '0.5rem 0.75rem',
    textDecoration: 'none',
    borderRadius: '6px',
    color: isActive ? '#ffffff' : '#333333',
    backgroundColor: isActive ? '#2563eb' : '#e5e7eb',
    fontWeight: 'bold',
  });

  return (
    <nav style={{ marginBottom: '1.5rem' }}>
      <NavLink to="/" style={linkStyle} end>
        Inicio
      </NavLink>

      <NavLink to="/usuarios" style={linkStyle}>
        Usuarios
      </NavLink>

      <NavLink to="/productos" style={linkStyle}>
        Productos
      </NavLink>

      <NavLink to="/proveedores" style={linkStyle}>
        Proveedores
      </NavLink>

      <NavLink to="/clientes" style={linkStyle}>
        Clientes X
      </NavLink>
    </nav>
  ); 
}

export default Menu;