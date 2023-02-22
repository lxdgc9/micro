import mongoose from "mongoose";

interface JobAttrs {
  departmentId: string;
  name: string;
}

type JobDoc = JobAttrs & mongoose.Document;

type JobModel = mongoose.Model<JobDoc> & {
  build(attrs: JobAttrs): JobDoc;
};

const jobSchema = new mongoose.Schema<JobAttrs>(
  {
    departmentId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
  },
  {
    collection: "Job",
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

jobSchema.statics.build = (attrs: JobAttrs) => {
  return new Job(attrs);
};

const Job = mongoose.model<JobDoc, JobModel>("job", jobSchema);

export { Job };
