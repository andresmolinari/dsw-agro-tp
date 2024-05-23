export interface Repository<T> {
  findAll(): T[] | undefined //devuelve un array T[]

}