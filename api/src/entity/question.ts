import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from 'typeorm';

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
}