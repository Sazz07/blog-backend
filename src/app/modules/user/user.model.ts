import mongoose, { model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import { UserRole } from './user.constant';
import { USER_ROLE } from './user.utils';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new mongoose.Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      required: true,
      enum: UserRole,
      default: USER_ROLE.user,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
    },
  },
);

// hashed password
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// check if the user user is exist
userSchema.statics.isUserExists = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

// check if the password is matched or not
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
