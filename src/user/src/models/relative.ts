import mongoose from "mongoose";

enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

interface RelativeAttrs {
  userId: string;
  fullName: string;
  dob: Date;
  gender: Gender;
  phone: string;
  relationship: mongoose.Types.ObjectId;
}

type RelativeDoc = RelativeAttrs & mongoose.Document;

type RelativeModel = mongoose.Model<RelativeDoc> & {
  build(attrs: RelativeAttrs): RelativeDoc;
};

const relativeSchema = new mongoose.Schema<RelativeAttrs>(
  {
    userId: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    dob: {
      type: Date,
      required: true,
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
      trim: true,
    },
    relationship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "relationship",
      required: true,
    },
  },
  {
    collection: "Relative",
    toJSON: {
      transform(_doc, ret, _options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;

        // Calculate age
        const calculateAge = (dob: Date) => {
          const diff = Date.now() - dob.getTime();
          const ageDate = new Date(diff);
          return Math.abs(ageDate.getUTCFullYear() - 1970);
        };
        ret.age = calculateAge(ret.dob);
      },
    },
  }
);

relativeSchema.statics.build = (attrs: RelativeAttrs) => {
  return new Relative(attrs);
};

const Relative = mongoose.model<RelativeDoc, RelativeModel>(
  "relative",
  relativeSchema
);

export { Relative };
