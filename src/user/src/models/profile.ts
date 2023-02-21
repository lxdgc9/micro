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

interface ProfAttrs {
  baseInfo: BaseInfo;
}

type ProfDoc = ProfAttrs & mongoose.Document;

type ProfModel = mongoose.Model<ProfDoc> & {
  build(attrs: ProfAttrs): ProfDoc;
};

const profSchema = new mongoose.Schema<ProfAttrs>(
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
profSchema.pre("save", function (next) {
  this.baseInfo.fullName = this.baseInfo.fullName.replace(/\s+/g, " ").trim();
  next();
});

profSchema.statics.build = (attrs: ProfAttrs) => {
  return new Profile(attrs);
};

const Profile = mongoose.model<ProfDoc, ProfModel>("profile", profSchema);

export { Profile };
