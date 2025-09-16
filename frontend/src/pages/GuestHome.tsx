import backgroundImage from '../assets/images/guestHomeImage.jpg';
import Footer from '../components/Footer';

export const GuestHome = () => {
  return (
    <div style={{ 
      width: "100%", 
      minHeight: "100vh", // Para que el fondo cubra toda la altura de la pantalla
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "space-between", // Esto hará que el footer se coloque al final
      backgroundImage: `url(${backgroundImage})`, 
      backgroundSize: "cover" 
    }}>
      <div style={{ flex: "1" }}></div> {/* Este div ocupa el espacio restante */}
      <Footer /> {/* Footer agregado aquí */}
    </div>
  )
}
