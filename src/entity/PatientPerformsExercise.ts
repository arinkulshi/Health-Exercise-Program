import {
    Entity,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn
} from "typeorm";
import { Patient } from "./Patient";
import { Exercise } from "./Exercise";

@Entity()
export class PatientPerformsExercise {
    @PrimaryColumn()
    PatientID: number;


    @ManyToOne(() => Patient)
    @JoinColumn({ name: "PatientID" })
    Patient: Patient;

    @ManyToOne(() => Exercise)
    @JoinColumn({ name: "ExerciseID" })
    Exercise: Exercise;

    @CreateDateColumn()
    PerformedDate: Date;
}


