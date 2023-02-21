import mongoose from "mongoose";

interface UserFilterAttrs {
  userId: mongoose.Types.ObjectId;
  fullName: string;
  phone: string;
}

type UserFilterDoc = UserFilterAttrs & mongoose.Document;

type UserFilterModel = mongoose.Model<UserFilterDoc> & {
  build(attrs: UserFilterAttrs): UserFilterDoc;
};

const userFilterSchema = new mongoose.Schema<UserFilterAttrs>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      ref: "user",
      required: true,
    },
    fullName: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  {
    collection: "User Filter",
    toJSON: {
      transform(_doc, ret, _options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

userFilterSchema.statics.build = (attrs: UserFilterAttrs) => {
  return new UserFilter(attrs);
};

const UserFilter = mongoose.model<UserFilterDoc, UserFilterModel>(
  "user-filter",
  userFilterSchema
);

export { UserFilter };
