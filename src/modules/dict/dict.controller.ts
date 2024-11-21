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
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { DictService } from './dict.service';
import { JwtGuard, PreviewGuard } from '@/common/guards';
import { Roles } from '@/common/decorators/roles.decorator';
import { CreateDictDto } from './dto';

@Controller('dict')
@UseGuards(JwtGuard)
export class DictController {
  constructor(private readonly dictService: DictService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('tree')
  findDictTree() {
    return this.dictService.findDictTree();
  }

  @Post()
  @Roles('SUPER_ADMIN')
  @UseGuards(PreviewGuard)
  addUser(@Body() dict: CreateDictDto) {
    return this.dictService.create(dict);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @UseGuards(PreviewGuard)
  updateUser(@Param('id') id: number, @Body() dict: CreateDictDto) {
    return this.dictService.update(id, dict);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @UseGuards(PreviewGuard)
  removeUser(@Param('id') id: number) {
    return this.dictService.remove(id);
  }
}
