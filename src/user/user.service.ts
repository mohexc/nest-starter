import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto): Promise<any> {
    const createUser = await this.userRepository.create(createUserDto)
    const { password, ...rest } = await this.userRepository.save(createUser)
    return rest
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async findOne(id: number) {
    const foundUser = await this.userRepository.findOne(id)
    if (!foundUser) throw new NotFoundException()

    return foundUser
  }

  async update(_id: number, updateUserDto: UpdateUserDto): Promise<any> {
    const foundUser = await this.userRepository.findOne(_id)
    const { email, password, userName, isActive } = updateUserDto
    if (!foundUser) throw new NotFoundException()
    foundUser.userName = userName ? userName : foundUser.userName
    foundUser.password = password ? password : foundUser.password
    foundUser.email = email ? email : foundUser.email
    foundUser.isActive = isActive ? isActive : foundUser.isActive
    const { password: _password, ...rest } = await this.userRepository.save(foundUser)

    return rest
  }

  async remove(id: number) {
    const foundUser = await this.userRepository.findOne(id)
    if (!foundUser) throw new NotFoundException()

    return await this.userRepository.delete(foundUser)
  }
}
