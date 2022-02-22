import mysql from 'mysql2';

const formatQuery = (q: string, params: any[]) => {
  return mysql.format(
    q
      .split('\n')
      .map((l) => l.trim())
      .join(' '),
    params,
  );
};

export default formatQuery;
