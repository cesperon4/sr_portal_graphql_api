import { PrismaClient } from "../../generated/prisma/client";
import { requireAuth } from "helpers/auth";

const prisma = new PrismaClient();

interface CreateArrestLogArgs {
  AGE: string;
  ARREST_STATUS: string;
  ArrestLocationAptFlr: string;
  ArrestLocationCity: string;
  ArrestLocationStreet: string;
  ArrestLocationStreetNBR: string;
  Arrest_Charge: string;
  Arrest_ID: string;
  Case_Number: string;
  Charge_Description: string;
  Charge_Sequence: string;
  DATE_ARRESTED: string;
  DOB: string;
  Degree: string;
  FIRSTNAME: string;
  LASTNAME: string;
  MIDDLENAME: string;
  OBJECTID: number;
  OBJECTID_1: number;
  RACE: string;
  SEX: string;
  SUFFIX: string;
  TIME_ARREST: string;
  UNIQUEKEY: string;
  postId: number;
}

export const arrestLogResolvers = {
  Query: {
    arrestLogs: async (_parent: unknown, args: {}, context: any) => {
      return prisma.arrestLog.findMany();
    },
    arrestLog: async (_parent: unknown, args: { id: number }, context: any) => {
      // requireAuth(context); // ⛔ block if not authenticated

      return prisma.arrestLog.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  Mutation: {
    createArrestLog: async (
      _parent: unknown,
      args: { data: CreateArrestLogArgs },
      context: any
    ) => {
      // requireAuth(context); // ⛔ block if not authenticated

      return prisma.arrestLog.create({
        data: {
          AGE: args.data.AGE,
          ARREST_STATUS: args.data.ARREST_STATUS,
          ArrestLocationAptFlr: args.data.ArrestLocationAptFlr,
          ArrestLocationCity: args.data.ArrestLocationCity,
          ArrestLocationStreet: args.data.ArrestLocationStreet,
          ArrestLocationStreetNBR: args.data.ArrestLocationStreetNBR,
          Arrest_Charge: args.data.Arrest_Charge,
          Arrest_ID: args.data.Arrest_ID,
          Case_Number: args.data.Case_Number,
          Charge_Description: args.data.Charge_Description,
          Charge_Sequence: args.data.Charge_Sequence,
          DATE_ARRESTED: args.data.DATE_ARRESTED,
          DOB: args.data.DOB,
          Degree: args.data.Degree,
          FIRSTNAME: args.data.FIRSTNAME,
          LASTNAME: args.data.LASTNAME,
          MIDDLENAME: args.data.MIDDLENAME,
          OBJECTID: args.data.OBJECTID,
          OBJECTID_1: args.data.OBJECTID_1,
          RACE: args.data.RACE,
          SEX: args.data.SEX,
          SUFFIX: args.data.SUFFIX,
          TIME_ARREST: args.data.TIME_ARREST,
          UNIQUEKEY: args.data.UNIQUEKEY,
          postId: Number(args.data.postId),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    },
    updateArrestLog: (
      _parent: unknown,
      args: { id: number; data: Partial<CreateArrestLogArgs> },
      context: any
    ) => {
      // requireAuth(context); // ⛔ block if not authenticated

      return prisma.arrestLog.update({
        where: {
          id: Number(args.id),
        },
        data: {
          ...args.data,
        },
      });
    },
    deleteArrestLog: (_parent: unknown, args: { id: number }) => {
      return prisma.arrestLog.delete({
        where: {
          id: Number(args.id),
        },
      });
    },
  },
};
