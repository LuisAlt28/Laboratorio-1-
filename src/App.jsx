import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import InicioPage from './pages/InicioPage';
import UsuariosPage from './pages/UsuariosPage';
import ProductosPage from './pages/ProductosPage';
import ProveedoresPage from './pages/ProveedoresPage'; 
import ClientesPage from './pages/ClientesPage';

function App() {
  return (
    <div style={{ padding: '1rem' }}>
      <Menu />

      <Routes>
        <Route path="/" element={<InicioPage />} />
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/proveedores" element={<ProveedoresPage />} />
        <Route path="/clientes" element={<ClientesPage />} />
      </Routes>
    </div>
  );
}

export default App;

