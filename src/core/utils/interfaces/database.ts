export interface DBConnectionDTO {
  db_sgbd: string;
  db_name: string;
  port: number;
  login: string;
  password: string;
}

export abstract class AbstractDatabase {
  abstract connect(dbConnection?: DBConnectionDTO);
  abstract disconnect();
  abstract getInstance();
}
