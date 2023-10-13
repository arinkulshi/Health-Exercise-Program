

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    ManyToMany,
    JoinTable
} from "typeorm";
import { Patient } from "./Patient";
import { Provider } from "./Provider";
import { Exercise } from "./Exercise";

@Entity()
export class Program {
    @PrimaryGeneratedColumn()
    ProgramID: number;

    @ManyToOne(() => Patient)
    @JoinColumn({ name: "AssignedPatient" })
    AssignedPatient: Patient;

    @ManyToOne(() => Provider)
    @JoinColumn({ name: "AssignedProvider" })
    AssignedProvider: Provider;

    @CreateDateColumn()
    CreatedDate: Date;

    @ManyToMany(() => Exercise)
    @JoinTable({
        name: "ProgramExercise",
        joinColumn: {
            name: "ProgramID",
            referencedColumnName: "ProgramID"
        },
        inverseJoinColumn: {
            name: "ExerciseID",
            referencedColumnName: "ExerciseID"
        }
    })
    Exercises: Exercise[];
}
