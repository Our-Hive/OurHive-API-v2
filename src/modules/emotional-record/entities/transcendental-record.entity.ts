import { User } from '../../user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
@Entity()
export class TranscendentalRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  emotion: string;

  @Column({ length: 30, nullable: false })
  title: string;

  @Column({ length: 255, nullable: false })
  description: string;

  @Column({ length: 30, nullable: false })
  location: string;

  @Column({ length: 255, nullable: false })
  activity: string;

  @Column({ length: 30, nullable: false })
  companion: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => User, (user) => user.transcendentalRecords)
  user_id: User;
}
