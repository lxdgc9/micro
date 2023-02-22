import mongoose from "mongoose";

enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

interface BaseInfo {
  fullName: string;
  dob?: Date;
  gender?: Gender;
  phone: string;
  email: string;
  idCard?: string;
}

interface ProfileAttrs {
  baseInfo: BaseInfo;
  job?: mongoose.Types.ObjectId;
}

interface UserAttrs {
  profile: ProfileAttrs;
  hasAccess?: boolean;
}

type UserDoc = UserAttrs & mongoose.Document;

type UserModel = mongoose.Model<UserDoc> & {
  build(attrs: UserAttrs): UserDoc;
};

const userSchema = new mongoose.Schema<UserAttrs>(
  {
    profile: {
      baseInfo: {
        fullName: {
          type: String,
          required: true,
          trim: true,
          uppercase: true,
        },
        dob: {
          type: Date,
        },
        gender: {
          type: String,
          trim: true,
          lowercase: true,
          enum: ["male", "female", "other"],
          default: "other",
        },
        phone: {
          type: String,
          required: true,
          unique: true,
          trim: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
          trim: true,
          lowercase: true,
        },
        idCard: {
          type: String,
          trim: true,
        },
      },
      job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "job",
      },
    },
    hasAccess: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "User",
    toJSON: {
      transform(_doc, ret, _options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("user", userSchema);

export { User };
