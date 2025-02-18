import RepositoryUserMgdb from '../../../domain/repository/repository-mgdb-user';
import { BadRequestException } from '../../error/bad-request-esception';
import { iNote } from '../../interface/entity-note';
import { iUser } from '../../interface/entity-user';

export default async function userValidation(
  body: iUser,
  method: 'PUT' | 'POST',
) {
  switch (method) {
    case 'POST':
      if (
        !body.firstName ||
        !body.lastName ||
        !body.email ||
        !body.password
      ) {
        throw new BadRequestException(
          'Please, inform all data from user (firstName, lastName, email, password )',
        );
      }
      break;
    case 'PUT':
      if (
        !Object.keys(body).length ||
        (
          !body.firstName &&
          !body.lastName &&
          !body.email &&
          !body.password)
      ) {
        throw new BadRequestException(
          'Please, inform at least one data from user (firstName, lastName, email, password).',
        );
      }
      if (!body._id) {
        throw new BadRequestException('Please, inform the user _id.');
      }
      break;
    default:
      throw new BadRequestException('Unknown method');
  }
  
  if (body.email) {
    const isEmailValid = emailValidation(body.email.toLocaleLowerCase());
    if (!isEmailValid) {
      throw new BadRequestException(
        `Sorry, the email ${body.email} is not valid.`,
      );
    }
    const isRegisteredEmail = await RepositoryUserMgdb.getUserByEmail(
      body.email,
    );
    if (isRegisteredEmail && isRegisteredEmail._id !== body._id) {
      throw new BadRequestException(
        `Sorry, the email ${body.email} is already registered.`,
      );
    }
  }
}

export function noteValidation(note: iNote, method: 'PUT' | 'POST') {
  if (!note.title) {
    throw new BadRequestException('Please, inform a title for the note');
  }
  if (!note.content) {
    throw new BadRequestException('Please, inform a content for the note');
  }
  if (method === 'PUT') {
    if (!note._id) {
      throw new BadRequestException('Please, inform the note _id');
    }
  }
  if (method === 'POST') {
    if (!note.userId) {
      throw new BadRequestException('Please, inform the userId');
    }
  }
}

export function emailValidation(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
