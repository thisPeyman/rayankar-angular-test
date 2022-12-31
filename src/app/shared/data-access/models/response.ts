export interface Response<TSuccess, TFailed> {
  success: boolean;
  dataSuccess: TSuccess | null;
  errorCode: TFailed | null;
}
