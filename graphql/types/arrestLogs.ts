export type CreateArrestLogArgs = {
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
};

export type UpdateArrestLogArgs = {
  id: number;
  data: Partial<CreateArrestLogArgs>;
};
