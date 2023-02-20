import mongoose from "mongoose";
import { Password } from "../helpers/password";

interface AccountAttrs {
  username: string;
  password: string;
  userId: mongoose.Types.ObjectId;
}

type AccountDoc = AccountAttrs & mongoose.Document;

type AccountModel = mongoose.Model<AccountDoc> & {
  build(attrs: AccountAttrs): AccountDoc;
};

const accountSchema = new mongoose.Schema<AccountAttrs>(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, "Yêu cầu tên đăng nhập"],
    },
    password: {
      type: String,
      required: [true, "Yêu cầu mật khẩu"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Yêu cầu ID người dùng"],
    },
  },
  {
    collection: "Account",
    toJSON: {
      transform(_doc, ret, _options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

accountSchema.pre("save", async function (fn) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  fn();
});

accountSchema.statics.build = (attrs: AccountAttrs) => {
  return new Account(attrs);
};

const Account = mongoose.model<AccountDoc, AccountModel>(
  "account",
  accountSchema
);

export { Account };