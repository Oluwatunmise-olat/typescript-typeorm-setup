export type getByEmailDTO = { userEmail: string };

export type createDTO = {
  title: string;

  description: string;

  publish?: boolean;

  userId: number;
};
