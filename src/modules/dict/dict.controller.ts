/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:27:04
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { DictService } from './dict.service';
import { JwtGuard } from '@/common/guards';
import { Roles } from '@/common/decorators/roles.decorator';
import { CreateDictDto } from './dto';

@Controller('dict')
@UseGuards(JwtGuard)
export class DictController {
  constructor(private readonly dictService: DictService) {}

  @Get('tree')
  findDictTree(@Request() req: any) {
    return this.dictService.findDictTree();
  }

  @Post()
  @Roles('SUPER_ADMIN')
  addUser(@Body() dict: CreateDictDto) {
    return this.dictService.create(dict);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  updateUser(@Param('id') id: number, @Body() dict: CreateDictDto) {
    return this.dictService.update(id, dict);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  removeUser(@Param('id') id: number) {
    return this.dictService.remove(id);
  }
}
