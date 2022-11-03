/* eslint-disable prettier/prettier */

import { Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { User } from "src/user/schemas/user.schema";

export class BaseTodoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  detail: string;

  is_finished: boolean;


}

export default BaseTodoDto;

