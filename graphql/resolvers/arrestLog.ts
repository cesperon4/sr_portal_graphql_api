import { GraphQLResolveInfo } from "graphql";
import { type ArrestLog } from "../../generated/prisma/client";
import { requireArguments, requireAuth } from "../../helpers/auth";
import { sendResponse } from "../../lib/apiResponse";
import { HttpMessages, HttpStatus } from "../../lib/constants/http";
import { prisma } from "../../lib/prisma";
import {
  getJSON,
  invalidateByPrefix,
  makeCacheKey,
} from "../../services/cache";
import { type UpdateArrestLogArgs } from "../types/arrestLogs";
import { type ContextObject } from "../types/context";
import { type ApiResponse } from "../types/response";
import { scheduleInvalidateByPrefix } from "../../services/jobs/invalidate-cache";
// const prisma = new PrismaClient();

const POSTS_TTL_MS = 60 * 60 * 1000; // 1 hour

export const arrestLogResolvers = {
  Query: {
    arrestLogs: async (
      _parent: unknown,
      _args: unknown,
      context: ContextObject,
      info: GraphQLResolveInfo,
    ): Promise<ApiResponse<ArrestLog[]>> => {
      try {
        const authenticated = requireAuth(context); // ⛔ block if not authenticated

        if (!authenticated)
          return sendResponse(
            [],
            HttpStatus.UNAUTHORIZED,
            HttpMessages.UNAUTHORIZED,
          );

        const key = `gql:${makeCacheKey(info.fieldName, null)}`;
        const cachedData = await getJSON<ArrestLog[]>(key);

        if (cachedData) return sendResponse(cachedData);

        const arrest_logs = await prisma.arrestLog.findMany();
        return sendResponse(arrest_logs);
      } catch (err) {
        console.log("server error arrestLogs in arrestLogs query");
        return sendResponse(
          [],
          HttpStatus.INTERNAL_SERVER_ERROR,
          HttpMessages.INTERNAL_SERVER_ERROR,
        );
      }
    },

    arrestLog: async (
      _parent: unknown,
      args: { id: number },
      context: ContextObject,
    ): Promise<ApiResponse<ArrestLog | null>> => {
      try {
        // requireAuth(context); // ⛔ block if not authenticated
        const authenticated = requireAuth(context); // ⛔ block if not authenticated

        if (!authenticated)
          return sendResponse(
            null,
            HttpStatus.UNAUTHORIZED,
            HttpMessages.UNAUTHORIZED,
          );

        if (!requireArguments(args))
          return sendResponse(
            null,
            HttpStatus.INTERNAL_SERVER_ERROR,
            HttpMessages.INTERNAL_SERVER_ERROR,
          );

        const arrest_log = await prisma.arrestLog.findUnique({
          where: {
            id: args.id,
          },
        });

        return sendResponse(
          arrest_log,
          arrest_log ? HttpStatus.OK : HttpStatus.NOT_FOUND,
          arrest_log ? HttpMessages.OK : HttpMessages.NOT_FOUND,
        );
      } catch (err) {
        console.log("server error in arrestLog query");
        return sendResponse(
          null,
          HttpStatus.INTERNAL_SERVER_ERROR,
          HttpMessages.INTERNAL_SERVER_ERROR,
        );
      }
    },
  },

  Mutation: {
    createArrestLog: async (
      _parent: unknown,
      args: { data: Partial<ArrestLog> },
      context: ContextObject,
    ): Promise<ApiResponse<ArrestLog | null>> => {
      try {
        const authenticated = requireAuth(context); // ⛔ block if not authenticated

        if (!authenticated)
          return sendResponse(
            null,
            HttpStatus.UNAUTHORIZED,
            HttpMessages.UNAUTHORIZED,
          );

        if (!requireArguments(args))
          return sendResponse(
            null,
            HttpStatus.INTERNAL_SERVER_ERROR,
            HttpMessages.INTERNAL_SERVER_ERROR,
          );

        const arrest_log = await prisma.arrestLog.create({
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

        // invalidateByPrefix("gql:arrestLogs");
        void scheduleInvalidateByPrefix("gql:arrestLogs");

        return sendResponse(arrest_log);
      } catch (err) {
        return sendResponse(
          null,
          HttpStatus.INTERNAL_SERVER_ERROR,
          HttpMessages.INTERNAL_SERVER_ERROR,
        );
      }
    },
    updateArrestLog: (
      _parent: unknown,
      args: UpdateArrestLogArgs,
      context: any,
    ) => {
      // requireAuth(context); // ⛔ block if not authenticated
      // invalidateByPrefix("gql:arrestLogs");
      void scheduleInvalidateByPrefix("gql:arrestLogs");
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
      // invalidateByPrefix("gql:arrestLogs");
      void scheduleInvalidateByPrefix("gql:arrestLogs");

      return prisma.arrestLog.delete({
        where: {
          id: Number(args.id),
        },
      });
    },
  },
};
