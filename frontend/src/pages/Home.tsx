import { Outlet } from "react-router-dom";
import backgroundImage from "../assets/images/homeImage.jpg";
import Footer from "../components/Footer";


interface Props {}

const Home = (props: Props) => {
  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      minHeight: "100vh", // Para cubrir toda la altura de la pantalla
      width: "100%", // Para cubrir todo el ancho de la pantalla
    }}>
      {/* Contenedor principal con la imagen de fondo */}
      <div style={{ 
        flexGrow: 1, // Ocupa el espacio restante
        width: "100%", // Asegura que el contenedor ocupe todo el ancho de la pantalla
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "16px",
      }}>
        <Outlet /> {/* Aquí se renderizan las rutas hijas */}
      </div>
      
      {/* Footer en la parte inferior */}
      <Footer />
    </div>
  );
};

export default Home;
