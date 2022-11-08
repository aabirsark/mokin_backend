import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users.entity";

@Entity()
export class ContactInfoEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    email : string;

    @Column({nullable : true})
    address? : string;

    @Column({ nullable : true})
    phone : string;

    @OneToOne(() => User, user => user.contactInfo)
    user : User;
}