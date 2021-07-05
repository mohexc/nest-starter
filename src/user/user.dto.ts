import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
export class CreateUserDto {
    @ApiProperty()
    userName: string

    @ApiProperty()
    password: string

    @ApiProperty()
    email: string
}
export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    isActive: boolean
}
