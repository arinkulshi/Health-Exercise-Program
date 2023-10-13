

import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from "typeorm";

@Entity()
export class Provider {
    @PrimaryGeneratedColumn()
    ProviderID: number;

    @Column({ type: "varchar", length: 255 })
    Name: string;

    @Column({ type: "varchar", length: 255 })
    Specialization: string;
}



