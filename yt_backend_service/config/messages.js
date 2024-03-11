export const AUTHENTICATION_FAILED = {
  code: 400,
  message: "Authentication failed. Please login with valid credentials.",
  success: false,
};
export const SUCCESSFUL_LOGIN = {
  code: 200,
  message: "Successfully logged in",
  success: true,
};
export const INTERNAL_SERVER_ERROR = {
  code: 500,
  message: "Something unexpected happened",
  success: false,
};
export const UNAUTHORIZED = {
  code: 401,
  message: "Your session has expired. Please login again",
  success: false,
};
export const SUCCESSFUL_DELETE = {
  code: 200,
  message: "Successfully deleted",
  success: true,
};
export const SUCCESSFUL_UPDATE = {
  code: 200,
  message: "Updated successfully",
  success: true,
};
export const SUCCESSFUL = {
  code: 200,
  success: true,
  message: "Successfully completed",
};
export const NOT_FOUND = {
  code: 404,
  success: true,
  message: "Requested API not found",
};
export const ALREADY_EXIST = {
  code: 200,
  success: true,
  message: "Already exists",
};
export const FORBIDDEN = {
  code: 403,
  message: "You are not authorized to complete this action",
  success: false,
};
export const BAD_REQUEST = {
  code: 400,
  message: "Bad request. Please try again with valid parameters",
  success: false,
};
export const IN_COMPLETE_REQUEST = {
  code: 422,
  message: "Required parameter missing",
  success: false,
};
