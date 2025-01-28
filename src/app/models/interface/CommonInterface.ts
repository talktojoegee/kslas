export interface APIResponseModel{
  message: string,
  result: boolean,
  data:any
}


export interface LGAInterface{
  id: number,
  lga_name: string
}

export interface ApiResponse<T> {
  list: T[];
  total?: number;
  page?: number;
  limit?: number;
}
