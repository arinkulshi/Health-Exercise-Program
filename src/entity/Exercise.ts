import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  import { Patient } from "./Patient";
  
  @Entity()
  export class Exercise {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "varchar", length: 255 })
    name: string;
  
    @Column({ type: "text" })
    description: string;
  
    @Column({ type: "varchar", length: 255 })
    videoURL: string;
  
    @Column({ type: "integer" })
    progressPercentage: number;
  
    @Column({ type: "integer" })
    thumbs: number;
  
    @Column({ type: "date" })
    dateExerciseCompleted: Date;
  
    @Column({ type: "integer" })
    rating: number;
  
    @Column({ type: "integer" })
    difficulty: number;
  
    @ManyToOne(() => Patient, (patient) => patient.exercises)
    @JoinColumn({ name: "patientId" })
    patient: Patient;
  
    @Column()
    patientId: number;
  }