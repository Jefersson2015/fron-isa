import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// INTERCEPTOR: Adjunta el token JWT a cada petición
api.interceptors.request.use(
  (config) => {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const userParsed = JSON.parse(usuario);
      // Enviar el token JWT en el header Authorization
      if (userParsed.token) {
        config.headers.Authorization = `Bearer ${userParsed.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//====== SERVICIOS =============

export const productoService = {
  listarTodos: () => api.get('/productos'),
  obtenerPorId: (id) => api.get(`/productos/${id}`),
  crear: (producto) => api.post('/productos', producto),
  actualizar: (id, producto) => api.put(`/productos/${id}`, producto),
  eliminar: (id) => api.delete(`/productos/${id}`),
};

export const usuarioService = {
  registrar: (usuario) => api.post('/usuarios', usuario),
  login: (credentials) => api.post('/usuarios/login', credentials),
};

export const pedidoService = {
  crear: (pedido) => api.post('/pedidos', pedido),
  listarTodos: () => api.get('/pedidos'),
  buscarPorId: (id) => api.get(`/pedidos/${id}`),
  cambiarEstado: (id, estado) => api.put(`/pedidos/${id}/estado`, { estado }),
};

export default api;