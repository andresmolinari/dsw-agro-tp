import express, { Application } from "express";
import cors from "cors";
import { defineAssociations } from "./associations";
import clienteRouter from "../routes/cliente.routes";
import sequelize from "../db/connection";
import campoRouter from "../routes/campo.routes";
import usuarioRouter from "../routes/usuario.routes";
import { Cliente } from "./cliente";
import { Campo } from "./campo";
import { Usuario } from "./usuario";

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
    this.app.use("/api/campos", campoRouter);
    this.app.use("/api/usuarios", usuarioRouter);
  }

  // Middlewares
  middlewares() {
    // parseo body
    this.app.use(express.json());
  }

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
     
    
  
      defineAssociations();

      //await sequelize.sync({ force: true }); //borra las creadas y las vuelve a crear
      await sequelize.sync({ alter: true }); // chequea si hay cambios y los hace
      console.log("Tablas sincronizadas");
    } catch (error) {
      // Capturar cualquier error durante la sincronización o conexión
      console.error("Error al conectar o sincronizar la base de datos:", error);
    }
  }
}

export default Server;
