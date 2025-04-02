import { paginationDTO } from './paginations';

export interface queryDTO {
  query: any;
  pagination?: paginationDTO;
}
