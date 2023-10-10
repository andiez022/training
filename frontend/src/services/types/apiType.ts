import { UserRole } from '../../common/enum';

export interface UserDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
  avatar: string;
  birthday: Date;
  sex: string;
}
