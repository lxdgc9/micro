import mongoose from "mongoose";

interface RelationshipAttrs {
  relationshipId: string;
  type: string;
}

type RelationshipDoc = RelationshipAttrs & mongoose.Document;

type RelationshipModel = mongoose.Model<RelationshipDoc> & {
  build(attrs: RelationshipAttrs): RelationshipDoc;
};

const relationshipSchema = new mongoose.Schema<RelationshipAttrs>(
  {
    relationshipId: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    collection: "Relationship",
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

relationshipSchema.statics.build = (attrs: RelationshipAttrs) => {
  return new Relationship(attrs);
};

const Relationship = mongoose.model<RelationshipDoc, RelationshipModel>(
  "relationship",
  relationshipSchema
);

export { Relationship };
