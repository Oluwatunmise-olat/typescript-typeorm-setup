export interface IApiResponse<G> {
  success: boolean;
  message?: string;
  data: G;
}
