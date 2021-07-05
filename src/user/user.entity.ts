import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userName: string

    @Column()
    password: string

    @Column()
    email: string

    @Column({ default: false })
    isActive: boolean

}
