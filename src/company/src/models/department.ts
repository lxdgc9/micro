import mongoose from "mongoose";

interface DepartmentAttrs {
  companyId: string;
  name: string;
  jobs?: mongoose.Types.ObjectId[];
}

type DepartmentDoc = DepartmentAttrs & mongoose.Document;

type DepartmentModel = mongoose.Model<DepartmentDoc> & {
  build(attrs: DepartmentAttrs): DepartmentDoc;
};

const departmentSchema = new mongoose.Schema<DepartmentAttrs>(
  {
    companyId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    jobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "job",
        required: true,
      },
    ],
  },
  {
    collection: "Department",
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

departmentSchema.statics.build = (attrs: DepartmentAttrs) => {
  return new Department(attrs);
};

const Department = mongoose.model<DepartmentDoc, DepartmentModel>(
  "department",
  departmentSchema
);

export { Department };
