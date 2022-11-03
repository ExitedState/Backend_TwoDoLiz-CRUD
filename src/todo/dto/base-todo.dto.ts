/* eslint-disable prettier/prettier */

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

