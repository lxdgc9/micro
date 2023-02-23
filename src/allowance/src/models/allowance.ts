import mongoose from "mongoose";

interface AllowanceAttrs {
  description: string;
  amount: number;
}

type AllowanceDoc = AllowanceAttrs & mongoose.Document;

type AllowanceModel = mongoose.Model<AllowanceDoc> & {
  build(attrs: AllowanceAttrs): AllowanceDoc;
};

const allowanceSchema = new mongoose.Schema<AllowanceAttrs>(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    collection: "Allowance",
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

allowanceSchema.statics.build = (attrs: AllowanceAttrs) => {
  return new Allowance(attrs);
};

const Allowance = mongoose.model<AllowanceDoc, AllowanceModel>(
  "allowance",
  allowanceSchema
);

export { Allowance };
