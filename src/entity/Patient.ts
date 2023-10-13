
import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from "typeorm";


@Entity()
export class Patient {
    @PrimaryGeneratedColumn()
    PatientID: number;

    @Column({ type: "varchar", length: 255 })
    Name: string;

    @Column({ type: "varchar", length: 255 })
    InjuryType: string;
}




