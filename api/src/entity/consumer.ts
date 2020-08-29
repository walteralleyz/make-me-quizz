import {
    Entity,
    PrimaryGeneratedColumn,
    Column, Unique,
    BeforeInsert
} from 'typeorm';

import { createHmac } from 'crypto';
import { hash } from '../config/config';

@Entity()
@Unique(["email", "phone", "nick"])
export class Consumer {
    @BeforeInsert()
    private hashPhone = () => this.phone = createHmac("sha1", hash).update(this.phone).digest("hex");

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nick: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column({ nullable: true, default: 0 })
    points?: number;

    @Column({ nullable: true, default: '0' })
    questionDoneId?: string;

    @Column()
    avatar: string;
}