import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IPageInfo } from '@shared/adapters/interfaces/page-info.interface';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { User } from '../domain/entities/user.entity';
import { UserNotFoundError } from '../errors/user.errors';
import { IFindUsersQuery, IUserRepository } from './user.repository.interface';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async existsEmail(email: string): Promise<boolean> {
    const found = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (found) {
      return true;
    }
    return false;
  }

  async findOneByEmailOrThrow(email: string): Promise<User> {
    const found = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!found) {
      throw new UserNotFoundError();
    }
    return User.create(found);
  }

  async findManyPaginated(query: IFindUsersQuery): Promise<IPageInfo<User>> {
    const where: Prisma.UserWhereInput = {};
    if (query.params?.email) {
      where.email = {
        contains: query.params.email,
      };
    }
    const take = query.pagination?.take || 10;
    const skip = query.pagination?.skip || 0;
    const found = await this.prisma.user.findMany({
      where,
      take,
      skip,
    });
    const total = await this.prisma.user.count({
      where,
    });
    return {
      items: found.map((item) => User.create(item)),
      total,
    };
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        email: user.props.email,
      },
    });
  }
}
