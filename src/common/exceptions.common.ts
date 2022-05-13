export class ServerError extends Error {
  public statusCode = 500;
  public name = "Internal Server Error";

  constructor(message: string = "Internal Server Error") {
    super(message);
  }
}

export class ResourceNotFoundError<T> extends Error {
  public statusCode = 404;
  public name = "Not Found Error";
  public data?: T | [] = [];

  constructor(message: string, data?: T) {
    super(message);
    if (data) this.data = data;
  }
}

export class BodyFieldError<T> extends Error {
  public statusCode = 400;
  public name = "Body Field Error";
  public data: T;

  constructor(data: T, message?: string) {
    super("Body Field Error");
    this.data = data;
  }
}

export class NotPermittedError<T> extends Error {
  public data: T;
  public statusCode = 403;

  constructor(data: T) {
    super("Not Permitted");
    this.data = data;
  }
}

export class AuthenticationError<T> extends Error {
  public statusCode = 401;
  public data: T;

  constructor(data: T) {
    super("Authentication Error");
    this.data = data;
  }
}
