import mongoose from "mongoose";

enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

interface IdCardAttrs {
  no?: string;
  doi?: Date;
  poi?: Date;
}

interface BaseInfoArrts {
  fullName: string;
  dob?: Date;
  gender?: Gender;
  phone: string;
  email: string;
  idCard?: IdCardAttrs;
}

interface ProfileAttrs {
  code: string;
  baseInfo: BaseInfoArrts;
  job?: mongoose.Types.ObjectId;
  office?: string;
  address?: string;
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
      code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      baseInfo: {
        fullName: {
          type: String,
          required: true,
          trim: true,
          uppercase: true,
        },
        dob: {
          // Date of birth
          type: Date,
        },
        gender: {
          type: String,
          trim: true,
          lowercase: true,
          enum: [Gender.male, Gender.female, Gender.other],
          default: Gender.other,
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
          no: {
            // ID
            type: String,
            trim: true,
          },
          doi: {
            // Date of issue
            type: Date,
          },
          poi: {
            // Place of issue
            type: Date,
          },
        },
      },
      job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "job",
      },
      office: {
        type: String,
        trim: true,
      },
      address: {
        type: String,
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
