/*Este archivo es el punto de entrada principal de tu aplicación React. Aquí es donde se
 inicializa y monta el componente raíz*/
import { StrictMode } from 'react' //Sirve para detectar errore el el código - solo en desarrollo
import { createRoot } from 'react-dom/client' //Inicia React en el DOM.
//import './index.css'; //Importación de estilos globales

import App from './App.jsx' //Componente raiz para renderizar la app

/*Desarrollo Fred Mateo*/

/*Montar la aplicacion en REACT en el HTML index.html a partir del id=root*/
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
