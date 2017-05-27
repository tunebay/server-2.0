import { mapKeys } from 'lodash';

export const formatForSQLInsert = (req) => {
  return mapKeys(req, (value, key) => {
    return key
      .replace(/([a-z\d])([A-Z])/g, '$1_$2')
      .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1_$2')
      .toLowerCase();
  });
};

export const formatSQLResponse = (res) => {
  return mapKeys(res, (value, key) => {
    return key
      .replace(/^[_.\- ]+/, '')
      .toLowerCase()
      .replace(/[_.\- ]+(\w|$)/g, (m, p1) => p1.toUpperCase());
  });
};

export const formatArraySQLResponse = (res) => {
  return res.map((playlist) => {
    return formatSQLResponse(playlist);
  });
};
