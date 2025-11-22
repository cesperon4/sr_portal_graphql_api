import { gql } from "apollo-server-micro";

export const arrestLogTypeDefs = gql`
  type ArrestLog {
    id: Int
    AGE: String
    ARREST_STATUS: String
    ArrestLocationAptFlr: String
    ArrestLocationCity: String
    ArrestLocationStreet: String
    ArrestLocationStreetNBR: String
    Arrest_Charge: String
    Arrest_ID: String
    Case_Number: String
    Charge_Description: String
    Charge_Sequence: String
    DATE_ARRESTED: String
    DOB: String
    Degree: String
    FIRSTNAME: String
    LASTNAME: String
    MIDDLENAME: String
    OBJECTID: Int
    OBJECTID_1: Int
    RACE: String
    SEX: String
    SUFFIX: String
    TIME_ARREST: String
    UNIQUEKEY: String
    postId: Int
    post: Post
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Query {
    arrestLogs: ApiArrestLogsResponse
    arrestLog(id: Int): ApiArrestLogResponse
  }

  input CreateArrestLogInput {
    AGE: String
    ARREST_STATUS: String
    ArrestLocationAptFlr: String
    ArrestLocationCity: String
    ArrestLocationStreet: String
    ArrestLocationStreetNBR: String
    Arrest_Charge: String
    Arrest_ID: String
    Case_Number: String
    Charge_Description: String
    Charge_Sequence: String
    DATE_ARRESTED: String
    DOB: String
    Degree: String
    FIRSTNAME: String
    LASTNAME: String
    MIDDLENAME: String
    OBJECTID: Int
    OBJECTID_1: Int
    RACE: String
    SEX: String
    SUFFIX: String
    TIME_ARREST: String
    UNIQUEKEY: String
    postId: Int
  }

  type ApiArrestLogsResponse {
    status: Int
    data: [ArrestLog]
    message: String
  }

  type ApiArrestLogResponse {
    status: Int
    data: ArrestLog
    message: String
  }

  input UpdateArrestLogInput {
    AGE: String
    ARREST_STATUS: String
    ArrestLocationAptFlr: String
    ArrestLocationCity: String
    ArrestLocationStreet: String
    ArrestLocationStreetNBR: String
    Arrest_Charge: String
    Arrest_ID: String
    Case_Number: String
    Charge_Description: String
    Charge_Sequence: String
    DATE_ARRESTED: String
    DOB: String
    Degree: String
    FIRSTNAME: String
    LASTNAME: String
    MIDDLENAME: String
    OBJECTID: Int
    OBJECTID_1: Int
    RACE: String
    SEX: String
    SUFFIX: String
    TIME_ARREST: String
    UNIQUEKEY: String
  }

  type Mutation {
    createArrestLog(data: CreateArrestLogInput): ArrestLog!
    updateArrestLog(id: Int!, data: UpdateArrestLogInput): ArrestLog!
    deleteArrestLog(id: Int!): ArrestLog!
  }
`;
