import bcrypt, { compare } from 'bcrypt';
import createHttpError from 'http-errors';
import { model, Model, Schema } from 'mongoose';
import ERole from '../constants/enums/ERole';

interface IUser {
  phoneNumber: String;
  email: String;
  password: String;
  fullName: String;
  isActive: Boolean;
  role: Number;
}

interface IUserMethods {
  isCheckPassword(password: String): Boolean;
}

type TUserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, TUserModel, IUserMethods>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },
    fullName: {
      type: String,
    },
    role: {
      type: Number,
      default: ERole.BUYER,
    },
  },
  {
    timestamps: true,
    collection: 'users',
  }
);

// eslint-disable-next-line consistent-return
UserSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password.toString(), salt);
    this.password = hashPassword;
    return next();
  } catch (error) {
    console.log(`error::: ${error}`);
    next(createHttpError(500, 'Something went wrong...'));
  }
});

UserSchema.method('isCheckPassword', async function (password) {
  const isCompare = await compare(password, this.password);
  return isCompare;
});

const UserModel = model<IUser, TUserModel>('users', UserSchema);
export default UserModel;
