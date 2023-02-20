import mongoose from "mongoose";

interface UserByKeyAttrs {
  userId: mongoose.Types.ObjectId;
  key: string;
}

type UserByKeyDoc = UserByKeyAttrs & mongoose.Document;

type UserByKeyModel = mongoose.Model<UserByKeyDoc> & {
  build(attrs: UserByKeyAttrs): UserByKeyDoc;
};

const userByKeySchema = new mongoose.Schema<UserByKeyAttrs>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    key: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
  },
  {
    collection: "User By Key",
    toJSON: {
      transform(_doc, ret, _options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

userByKeySchema.statics.build = (attrs: UserByKeyAttrs) => {
  return new UserByKey(attrs);
};

const UserByKey = mongoose.model<UserByKeyDoc, UserByKeyModel>(
  "user-by-key",
  userByKeySchema
);

export { UserByKey };
