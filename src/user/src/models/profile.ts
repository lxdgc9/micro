import mongoose from "mongoose";

interface ProfAttrs {
  name: string;
}

type ProfDoc = ProfAttrs & mongoose.Document;

type ProfModel = mongoose.Model<ProfDoc> & {
  build(attrs: ProfAttrs): ProfDoc;
};

const profSchema = new mongoose.Schema<ProfAttrs>(
  {
    name: {
      type: String,
      required: true,
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

profSchema.statics.build = (attrs: ProfAttrs) => {
  return new Profile(attrs);
};

const Profile = mongoose.model<ProfDoc, ProfModel>("profile", profSchema);

export { Profile };
