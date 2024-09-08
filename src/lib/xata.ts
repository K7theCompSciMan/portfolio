// Generated by Xata Codegen 0.30.0. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "data",
    columns: [
      { name: "data", type: "json", notNull: true, defaultValue: "{}" },
      { name: "name", type: "text" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Data = InferredTypes["data"];
export type DataRecord = Data & XataRecord;

export type DatabaseSchema = {
  data: DataRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL: "https://SPARK-7cmp99.us-east-1.xata.sh/db/portfolio",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
