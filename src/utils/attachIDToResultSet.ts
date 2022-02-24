import { ResultSetHeader } from 'mysql2';

const attachIDToResultSet = (id: string) => (res: ResultSetHeader) => {
  return {
    ...res,
    generatedId: id,
  };
};

export default attachIDToResultSet;
