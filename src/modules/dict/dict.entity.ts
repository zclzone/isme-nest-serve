/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:27:11
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dict {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  code: string;

  @Column({ default: 0 })
  parentId: number;

  @Column({ length: 255 })
  dictKey: string;

  @Column({ length: 255 })
  dictValue: string;

  @Column({ default: 0 })
  sort: number;

  @Column({ default: '' })
  remark: string;
}
