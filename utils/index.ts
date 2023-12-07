export const ApiSuccessResponse = (
  data: object,
  message = 'Data retrieved successfully',
  code = 200
) => {
  return { data, message, code, success: true }
}
