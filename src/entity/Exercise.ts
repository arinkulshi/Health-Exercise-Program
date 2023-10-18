import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from "typeorm";

@Entity()
export class Exercise {
    @PrimaryGeneratedColumn()
    id: number;
    ExerciseID: number;

    @Column({ type: "varchar", length: 255 })
    Name: string;

    @Column({ type: "text" })
    Description: string;

    @Column({ type: "varchar", length: 255 })
    VideoURL: string;
}
