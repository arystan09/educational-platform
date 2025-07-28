import { Request } from 'express';
import { User } from '../../api/users/entities/user.entity';

export interface RequestWithUser extends Request {
  user: User;
}
