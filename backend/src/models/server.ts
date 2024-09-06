import express, { Application } from "express";
import cors from "cors";
import clienteRouter from "../routes/cliente.routes";
import sequelize from "../db/connection";


 class Server {
  private app: Application;
  private port: string | undefined;

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.listen();
    this.middlewares();
    this.routes();
    this.dbConnect();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Aplicación corriendo en el puerto " + this.port);
    });
  }

  // Rutas
  routes() {
    this.app.use("/api/clientes", clienteRouter);
    
    
  }

  // Middlewares
  middlewares() {
    // parseo body
    this.app.use(express.json()); }

  // //   this.app.use((_, res) => {
  // //     return res.status(404).send({ message: 'Resource not found' })
  // //   })

  //   // Cors
  //   this.app.use(
  //     cors({
  //       origin: "http://localhost:4200", // Permite solo este origen
  //       methods: "GET,POST,PUT,DELETE", // Permite solo estos métodos
  //       allowedHeaders: "Content-Type,Authorization", // Permite solo estos encabezados
  //       credentials: true  // Permitir cookies o credenciales si es necesario
  //     })
  //   );
  // }

  // Conexión con la base de datos
  async dbConnect() {
    try {
      await sequelize.sync({ alter: true });
    } catch (error) {
      console.log("Unable to connect to the database", error);
    }
  }
}

export default Server
