import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from 'typeorm';

@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role: string;
}