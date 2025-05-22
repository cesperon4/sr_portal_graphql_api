import { gql } from "apollo-server-micro";

export const arrestLogTypeDefs = gql`
  type ArrestLog {
    id: ID
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
    postId: ID
    post: Post
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Query {
    arrestLogs: [ArrestLog!]!
    arrestLog(id: ID!): ArrestLog!
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
    postId: ID
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
    updateArrestLog(id: ID!, data: UpdateArrestLogInput): ArrestLog!
    deleteArrestLog(id: ID!): ArrestLog!
  }
`;
