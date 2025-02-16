import { iUser } from '../../interface/entity-user';

export default function dataFormatting(data: iUser): iUser {
  const user: iUser = {};
  user.userName = data.userName?.toLocaleLowerCase();
  user.firstName = data.firstName?.toLocaleLowerCase();
  user.lastName = data.lastName?.toLocaleLowerCase();
  user.email = data.email?.toLocaleLowerCase();
  user.password = data.password;

  return user;
}
