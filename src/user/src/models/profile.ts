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
}

type ProfileDoc = ProfileAttrs & mongoose.Document;

type ProfModel = mongoose.Model<ProfileDoc> & {
  build(attrs: ProfileAttrs): ProfileDoc;
};

const profileSchema = new mongoose.Schema<ProfileAttrs>(
  {
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
  },
  {
    collection: "Profile",
    toJSON: {
      transform(_doc, ret, _options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// Remove Extra Spaces From a String
profileSchema.pre("save", function (next) {
  this.baseInfo.fullName = this.baseInfo.fullName.replace(/\s+/g, " ").trim();
  next();
});

profileSchema.statics.build = (attrs: ProfileAttrs) => {
  return new Profile(attrs);
};

const Profile = mongoose.model<ProfileDoc, ProfModel>("profile", profileSchema);

export { Profile };
