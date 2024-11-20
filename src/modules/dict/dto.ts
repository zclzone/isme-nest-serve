/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:26:53
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { Exclude } from 'class-transformer';
import { Allow, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateDictDto {
  @IsNumber()
  @IsOptional()
  parentId?: number;

  @IsNotEmpty({ message: '字典编号不能为空' })
  code: string;

  @IsNotEmpty({ message: '字典名称不能为空' })
  dictValue: string;

  @IsNotEmpty({ message: '字典键值不能为空' })
  dictKey: string;

  @IsNumber()
  @IsOptional()
  sort?: number;

  @IsOptional()
  remark?: string;
}

export class GetRolesDto {
  @IsOptional()
  enable?: boolean;
}

export class UpdateRoleDto {
  @Exclude()
  code: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  @IsArray()
  permissionIds?: number[];

  @IsBoolean()
  @IsOptional()
  enable?: boolean;
}

export class AddRolePermissionsDto {
  @IsNumber()
  id: number;

  @IsArray()
  permissionIds: number[];
}

export class AddRoleUsersDto {
  @IsArray()
  userIds: number[];
}

export class AddRoleButtonsDto {
  @IsNumber()
  id: number;

  @IsNumber()
  menuId: number;

  @IsArray()
  buttons: string[];
}

export class QueryRoleDto {
  @Allow()
  pageSize?: number;

  @Allow()
  pageNo?: number;

  @Allow()
  name?: string;

  @Allow()
  enable?: boolean;
}
