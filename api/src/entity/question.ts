import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    Column
} from 'typeorm';

import { Consumer } from './consumer';

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pergunta: string;

    @Column('json')
    escolhas: JSON;

    @Column({
        type: 'varchar',
        length: 1
    })
    resposta: string;

    @Column()
    categoria: string;

    @ManyToMany(type => Consumer)
    @JoinTable()
    consumer: Consumer[];
}