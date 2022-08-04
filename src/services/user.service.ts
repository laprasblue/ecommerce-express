import UserModel from '../models/user.model';

export interface IUpdateUser {
  email: String;
  fullName: String;
}
export interface IResetPassword {
  email: String;
  password: String;
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
  updateUser: async ({ fullName, email }: IUpdateUser) => {
    const user = await UserModel.findOneAndUpdate(
      { email },
      {
        fullName,
      }
    );
    return user;
  },
  resetPassword: async ({ password, email }: IResetPassword) => {
    const user = await UserModel.findOne({ email });
    if (!user) return null;
    user.password = password;
    user.save();
    return user;
  },
  disableUser: async (email: String) => {
    const user = await UserModel.findOneAndUpdate(
      { email },
      { isActive: false }
    );
    return user;
  },
};

export default UserService;
