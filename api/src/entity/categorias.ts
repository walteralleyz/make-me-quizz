import {
    Entity,
    PrimaryGeneratedColumn,
    Column, 
    Unique
} from 'typeorm';

@Entity()
@Unique(["categoria"])
export class Categorias {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    categoria: string;
}