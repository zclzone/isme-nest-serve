/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:28:20
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { Injectable } from '@nestjs/common';
import { CreateDictDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dict } from './dict.entity';
import { SharedService } from '@/shared/shared.service';
import { CustomException, ErrorCode } from '@/common/exceptions/custom.exception';

@Injectable()
export class DictService {
  constructor(
    private readonly sharedService: SharedService,
    @InjectRepository(Dict)
    private dictRepo: Repository<Dict>,
  ) {}

  async findDictTree() {
    const dicts = await this.dictRepo.find();

    return this.sharedService.handleTree(dicts);
  }

  async create(dict: CreateDictDto) {
    const { code } = dict;
    const existDict = await this.dictRepo.findOne({
      where: { code: code },
    });

    if (existDict && dict.parentId == 0)
      throw new CustomException(ErrorCode.ERR_11006, '字典编号已存在，不可重复添加');

    const newUser = this.dictRepo.create(dict);
    await this.dictRepo.save(newUser);

    return true;
  }

  async update(id: number, dict: CreateDictDto) {
    const dictInfo = await this.dictRepo.findOne({ where: { id } });
    if (!dictInfo) throw new CustomException(ErrorCode.ERR_11006, '字典不存在');
    const newDict = this.dictRepo.merge(dictInfo, dict);
    await this.dictRepo.save(newDict);
    return true;
  }

  async remove(id: number) {
    const dictInfo = await this.dictRepo.findOne({ where: { id } });
    if (!dictInfo) throw new CustomException(ErrorCode.ERR_11006, '字典不存在');
    await this.dictRepo.delete(id);
    return true;
  }
}
