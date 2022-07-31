import UserModel from '../models/user.model';

export interface IUpdateUser {
  email: String;
  password: String;
  fullName: String;
}

export interface IUser {
  phoneNumber: String;
  email: String;
  password: String;
  fullName: String;
}

const UserService = {
  findOneUser: async (email: String) => {
    const user = await UserModel.findOne({ email });
    return user;
  },
  createUser: async (User: IUser) => {
    const user = await UserModel.create(User);
    return user;
  },
  updateUser: async ({ email, password, fullName }: IUpdateUser) => {
    const user = await UserModel.findOneAndUpdate(
      { email },
      { password, fullName }
    );
    return user;
  },
  disableUser: async (email: String) => {
    const user = await UserModel.findOneAndUpdate(
      { email },
      { isActive: true }
    );
    return user;
  },
};

export default UserService;
