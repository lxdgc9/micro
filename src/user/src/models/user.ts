import mongoose from "mongoose";

interface UserAttrs {
  profile: mongoose.Types.ObjectId;
}

type UserDoc = UserAttrs & mongoose.Document;

type UserModel = mongoose.Model<UserDoc> & {
  build(attrs: UserAttrs): UserDoc;
};

const userSchema = new mongoose.Schema<UserAttrs>(
  {
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "profile",
      required: true,
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
