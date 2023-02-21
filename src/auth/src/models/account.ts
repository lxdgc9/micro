import mongoose from "mongoose";
import { Password } from "../helpers/password";

interface AccountAttrs {
  username: string;
  password: string;
  userId: string;
}

type AccountDoc = AccountAttrs & mongoose.Document;

type AccountModel = mongoose.Model<AccountDoc> & {
  build(attrs: AccountAttrs): AccountDoc;
};

const accountSchema = new mongoose.Schema<AccountAttrs>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
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
