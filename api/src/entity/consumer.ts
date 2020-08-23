import {
    Entity,
    PrimaryGeneratedColumn,
    Column, Unique, 
    OneToOne,
    JoinColumn,
} from 'typeorm';

import { Roles } from './roles';

@Entity()
@Unique(["email", "phone"])
export class Consumer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column({
        length: 14
    })
    phone: string;

    @OneToOne(type => Roles)
    @JoinColumn()
    roles: Roles;
}