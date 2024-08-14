export type TErrorMessages = {
  path: string | number;
  message: string;
}[];

export type TGenericResponse = {
  statusCode: number;
  message: string;
  errorMessages: TErrorMessages;
};
