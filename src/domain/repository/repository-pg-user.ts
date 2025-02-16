import { BadRequestException } from '../../common/error/bad-request-esception';
import { iUser } from '../../common/interface/entity-user';
import ModelPG from '../../infrastructure/database/postgrees';

export default class RepositoryUserPG extends ModelPG {
  static async createUser(data: iUser): Promise<iUser> {
    const sql = `insert into "user" (_id, userName, firstName, lastName, email, password) 
    values ($1, $2, $3, $4, $5, $6 ) RETURNING *`;
    const values = [
      data._id,
      data.userName,
      data.firstName,
      data.lastName,
      data.email,
      data.password,
    ];
    const modelPG = new ModelPG();
    try {
      const user: Array<iUser> = await modelPG.query(sql, values);
      return user[0];
    } finally {
      modelPG.close();
    }
  }
  static async getUserById(_id: string): Promise<iUser> {
    const sql = 'select * from "user" where _id = $1';
    const values = [_id];
    const modelPG = new ModelPG();
    try {
      const response: Array<iUser> = await modelPG.query(sql, values);
      return response[0];
    } finally {
      modelPG.close();
    }
  }
  static async getAllUsers(): Promise<Array<iUser>> {
    const sql = 'select * from "user"';
    const modelPG = new ModelPG();
    try {
      const response: Array<iUser> = await modelPG.query(sql);
      return response;
    } finally {
      modelPG.close();
    }
  }

  static async getUserByUsername(userName: string) {
    const sql = 'select * from "user" where userName = $1';
    const values = [userName];
    const modelPG = new ModelPG();
    try {
      const response: Array<iUser> = await modelPG.query(sql, values);
      return response[0];
    } finally {
      modelPG.close();
    }
  }
  static async getUserByEmail(email: string) {
    const sql = 'select * from "user" where email = $1';
    const values = [email];
    const modelPG = new ModelPG();
    try {
      const response: Array<iUser> = await modelPG.query(sql, values);
      return response[0];
    } finally {
      modelPG.close();
    }
  }
  static async deleteUser(_id: string) {
    const sql = 'delete from "user" where _id = $1';
    const values = [_id];
    const modelPG = new ModelPG();
    try {
      const response: any = await modelPG.query(sql, values);
      return response[0];
    } finally {
      modelPG.close();
    }
  }

  static async updateUser(data: iUser) {
    const objectKey = Object.keys(data) as Array<keyof iUser>;
    const filteredKeys = objectKey.filter((key) => data[key] !== undefined);
    if (filteredKeys.length === 0) {
      throw new BadRequestException('No valid fields to update.');
    }
    const setClause = filteredKeys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    const values = filteredKeys.map((key) => data[key]);
    values.push(data._id);
    const sql = `UPDATE "user" SET ${setClause} where _id = $${values.length}`;
    const modelPG = new ModelPG();
    try {
      await modelPG.query(sql, values);
      return;
    } finally {
      modelPG.close();
    }
  }
}
