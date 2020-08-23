import {
    Entity,
    PrimaryGeneratedColumn,
    Column, 
    Unique
} from 'typeorm';

@Entity()
@Unique(["categoria"])
export class Categories {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    categoria: string;
}