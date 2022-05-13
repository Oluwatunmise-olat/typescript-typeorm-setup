import { IApiResponse } from "../interfaces/api-response.interface";
import { responseData } from "../types/api-response-data-field.type";

class APIResponse {
  response<T>(hasError: boolean, statusCode: number, data: responseData<T>) {
    if (hasError) {
      return this.errorResponse(statusCode, data);
    }

    return this.successResponse(statusCode, data);
  }

  private errorResponse<T>(
    statusCode: number,
    data: responseData<T>
  ): IApiResponse<T> {
    return { success: false, message: data.message, data: data.data };
  }

  private successResponse<T>(
    statusCode: number,
    data: responseData<T>
  ): IApiResponse<T> {
    return { success: true, message: data.message, data: data.data };
  }
}

export default new APIResponse();
