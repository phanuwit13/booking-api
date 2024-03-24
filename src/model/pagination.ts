export type pagination = {
  total_data: number;
  limit: number;
  current_page: number;
  total_page: number;
}

export type pageAble<Type> = {
  data: Array<Type>;
  pagination: pagination
}