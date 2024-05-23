export interface Repository<T> {
  findAll(): T[] | undefined; //devuelve un array T[]
  findOne(item: { nroCliente: string }): T | undefined; // devuelve un elemento T y recibe un id
  add(item: T): T | undefined;
  update(item: T): T | undefined;
  delete(item: { nroCliente: string }): T | undefined;
}
