import mongoose from "mongoose";
import { app } from "./app";
import { CreateAccountFailureListener } from "./events/listeners/create-account-failure-listener";
import { CreateAllowanceSuccessListener } from "./events/listeners/create-allowance-success-listener";
import { CreateCompanySuccessListener } from "./events/listeners/create-company-success-listener";
import { CreateDepartmentSuccessListener } from "./events/listeners/create-department-success-listener";
import { CreateJobSuccessListener } from "./events/listeners/create-job-success-listener";
import { CreateRelationshipSuccessListener } from "./events/listeners/create-relationship-success-listener";
import { UpdateAllowanceSuccessListener } from "./events/listeners/update-allowance-success-listener";
import { UpdateCompanySuccessListener } from "./events/listeners/update-company-success-listener";
import { UpdateDepartmentSuccessListener } from "./events/listeners/update-department-success-listener";
import { UpdateJobSuccessListener } from "./events/listeners/update-job-success-listener";
import { UpdateRelationshipSuccessListener } from "./events/listeners/update-relationship-success-listener";
import { natsWrapper } from "./nats-wrapper";

async function main() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defined");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new CreateAccountFailureListener(natsWrapper.client).listen();
    new CreateCompanySuccessListener(natsWrapper.client).listen();
    new UpdateCompanySuccessListener(natsWrapper.client).listen();
    new CreateDepartmentSuccessListener(natsWrapper.client).listen();
    new UpdateDepartmentSuccessListener(natsWrapper.client).listen();
    new CreateJobSuccessListener(natsWrapper.client).listen();
    new UpdateJobSuccessListener(natsWrapper.client).listen();
    new CreateAllowanceSuccessListener(natsWrapper.client).listen();
    new UpdateAllowanceSuccessListener(natsWrapper.client).listen();
    new CreateRelationshipSuccessListener(natsWrapper.client).listen();
    new UpdateRelationshipSuccessListener(natsWrapper.client).listen();

    mongoose.set("strictQuery", true);

    mongoose.connect(process.env.MONGO_URI, {});
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!");
  });
}

main();
