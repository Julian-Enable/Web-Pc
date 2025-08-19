# 🖥️ BIZ COMPUTERS - Tienda de Tecnología

![BIZ COMPUTERS](assets/logoEmpresa.jpg)

## 📋 Descripción

**BIZ COMPUTERS** es una tienda web moderna y responsiva especializada en productos de tecnología y gaming. La plataforma ofrece una experiencia de compra intuitiva con un diseño atractivo y funcionalidades completas de e-commerce.

**🌐 Sitio Web:** [https://webpcshop.netlify.app/](https://webpcshop.netlify.app/)

## ✨ Características Principales

### 🛍️ **Funcionalidades de E-commerce**
- **Catálogo de Productos**: Amplia variedad de productos tecnológicos
- **Carrito de Compras**: Gestión completa con persistencia en localStorage
- **Sistema de Pagos**: Simulación de proceso de pago seguro
- **Gestión de Stock**: Validación de disponibilidad en tiempo real
- **Resumen de Pedidos**: Cálculo automático de subtotales, envío e IVA

### 👤 **Sistema de Usuarios**
- **Registro de Usuarios**: Formulario con validación en tiempo real
- **Inicio de Sesión**: Autenticación con diseño moderno
- **Validación de Contraseñas**: Verificación de requisitos de seguridad
- **Recuperación de Contraseña**: Enlaces para restablecer credenciales

### 🎨 **Diseño y UX**
- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **Tema Oscuro**: Interfaz moderna con paleta de colores púrpura
- **Efectos Visuales**: Animaciones suaves y transiciones elegantes
- **Glassmorphism**: Efectos de cristal para elementos modernos
- **Iconografía**: Iconos Font Awesome para mejor experiencia visual

### 📱 **Páginas Principales**
- **Inicio**: Banner dinámico y productos destacados
- **Productos**: Catálogo completo con filtros
- **Blog**: Contenido informativo sobre tecnología
- **Sobre Nosotros**: Información de la empresa
- **Contacto**: Formulario de contacto y ubicación
- **Políticas**: Términos y condiciones, política de privacidad

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modernos con variables CSS y flexbox/grid
- **JavaScript (ES6+)**: Funcionalidad interactiva y dinámica
- **Bootstrap 4.5.2**: Framework CSS para diseño responsivo
- **Font Awesome 5.15.1**: Iconografía profesional

### **Características CSS**
- **CSS Variables**: Sistema de temas personalizable
- **Flexbox & Grid**: Layouts modernos y responsivos
- **Backdrop Filter**: Efectos de cristal (glassmorphism)
- **Linear Gradients**: Fondos y elementos atractivos
- **Animaciones CSS**: Transiciones suaves y efectos hover

### **Almacenamiento**
- **localStorage**: Persistencia de datos del carrito y preferencias
- **Session Management**: Gestión de sesiones de usuario

## 📁 Estructura del Proyecto

```
Web-Pc/
├── assets/                 # Imágenes y recursos
│   ├── banner1.png        # Banners principales
│   ├── banner2.png
│   ├── banner3.png
│   ├── logoEmpresa.jpg    # Logo de la empresa
│   ├── productos/         # Imágenes de productos
│   └── icons/            # Iconos sociales
├── css/
│   └── style.css         # Estilos principales
├── js/
│   ├── main.js           # Funcionalidad general
│   ├── cart.js           # Lógica del carrito
│   ├── payment.js        # Procesamiento de pagos
│   ├── login.js          # Autenticación
│   └── register.js       # Registro de usuarios
├── index.html            # Página principal
├── productos.html        # Catálogo de productos
├── cart.html            # Carrito de compras
├── pago.html            # Proceso de pago
├── confirmacion.html    # Confirmación de pedido
├── login.html           # Inicio de sesión
├── registro.html        # Registro de usuario
├── blog.html            # Blog de tecnología
├── sobre_nosotros.html  # Información de la empresa
├── contacto.html        # Página de contacto
├── politica_privacidad.html
├── terminos_condiciones.html
└── README.md            # Este archivo
```

## 🚀 Instalación y Uso

### **Requisitos Previos**
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional para desarrollo)

### **Instalación Local**

1. **Clonar o descargar el proyecto**
   ```bash
   git clone [URL-del-repositorio]
   cd Web-Pc
   ```

2. **Abrir en el navegador**
   - Abrir `index.html` directamente en el navegador
   - O usar un servidor local:
   ```bash
   # Con Python
   python -m http.server 8000
   
   # Con Node.js (http-server)
   npx http-server
   
   # Con PHP
   php -S localhost:8000
   ```

3. **Acceder al sitio**
   - URL local: `http://localhost:8000`
   - URL de producción: `https://webpcshop.netlify.app/`

## 🎯 Funcionalidades Detalladas

### **Sistema de Carrito**
- ✅ Agregar productos al carrito
- ✅ Modificar cantidades
- ✅ Eliminar productos
- ✅ Validación de stock
- ✅ Cálculo automático de totales
- ✅ Persistencia de datos

### **Proceso de Compra**
- ✅ Resumen del pedido
- ✅ Información de envío
- ✅ Métodos de pago
- ✅ Validación de formularios
- ✅ Confirmación de pedido

### **Autenticación**
- ✅ Registro de usuarios
- ✅ Inicio de sesión
- ✅ Validación de contraseñas
- ✅ Recuperación de cuenta
- ✅ Opciones sociales (Google, Facebook)

## 🎨 Personalización

### **Colores del Tema**
El sitio utiliza una paleta de colores púrpura definida en variables CSS:

```css
:root {
  --accent-primary: #511573;
  --accent-secondary: #7b2cbf;
  --bg-primary: #0a0a0a;
  --bg-secondary: #1a1a1a;
  --text-primary: #ffffff;
  --text-secondary: #b0b0b0;
}
```

### **Modo Oscuro/Claro**
El sitio incluye soporte para temas personalizables mediante CSS variables.

## 📱 Responsividad

El sitio está optimizado para:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🔧 Mantenimiento

### **Actualización de Productos**
Los productos se gestionan desde `js/products.js` con la siguiente estructura:

```javascript
{
  id: 1,
  nombre: "Nombre del Producto",
  precio: 999999,
  imagen: "assets/producto.jpg",
  stock: 10,
  categoria: "gaming"
}
```

### **Modificación de Estilos**
Los estilos principales se encuentran en `css/style.css` organizados por secciones:
- Variables CSS
- Estilos generales
- Componentes específicos
- Media queries

## 🌐 Despliegue

### **Netlify (Actual)**
- **URL**: https://webpcshop.netlify.app/
- **Configuración**: Despliegue automático desde repositorio

### **Otros Servicios**
El proyecto es compatible con:
- **GitHub Pages**
- **Vercel**
- **Firebase Hosting**
- **Cualquier servidor web estático**

## 🤝 Contribución

Para contribuir al proyecto:

1. Fork el repositorio
2. Crear una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

- **Empresa**: BIZ COMPUTERS
- **Sitio Web**: [https://webpcshop.netlify.app/](https://webpcshop.netlify.app/)
- **Email**: contacto@bizcomputers.com

## 🙏 Agradecimientos

- **Bootstrap** por el framework CSS
- **Font Awesome** por los iconos
- **Netlify** por el hosting gratuito
- **Comunidad de desarrolladores** por el soporte

---

**Desarrollado con ❤️ para BIZ COMPUTERS**

*Última actualización: Agosto 2025*
