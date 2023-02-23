import mongoose from "mongoose";

interface CompanyAttrs {
  name: string;
  sign: string;
  doe?: Date;
  avatar?: string;
  departments?: mongoose.Types.ObjectId[];
}

type CompanyDoc = CompanyAttrs & mongoose.Document;

type CompanyModel = mongoose.Model<CompanyDoc> & {
  build(attrs: CompanyAttrs): CompanyDoc;
};

const companySchema = new mongoose.Schema<CompanyAttrs>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    sign: {
      type: String,
      required: true,
      maxlength: 4,
      trim: true,
      uppercase: true,
    },
    doe: {
      type: Date,
    },
    avatar: {
      type: String,
    },
    departments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "department",
        required: true,
      },
    ],
  },
  {
    collection: "Company",
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

// Remove Extra Spaces From a String
companySchema.pre("save", function (next) {
  this.name = this.name.replace(/\s+/g, " ").trim();
  next();
});

companySchema.statics.build = (attrs: CompanyAttrs) => {
  return new Company(attrs);
};

const Company = mongoose.model<CompanyDoc, CompanyModel>(
  "company",
  companySchema
);

export { Company };
