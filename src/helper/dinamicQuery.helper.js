export function buildDynamicUpdateQuery(table, data, idField, extraConditions) {

  if (!data || typeof data !== 'object') {
    throw new Error('Invalid data object');
  }

  if (!data[idField]) {
    throw new Error(`Missing identifier field: ${idField}`);
  }

  const { [idField]: idValue, ...fieldsToUpdate } = data;

  const entries = Object.entries(fieldsToUpdate).filter(
    ([_, value]) => value !== undefined && value !== null && value !== ''
  );

  if (entries.length === 0) {
    throw new Error('No fields to update');
  }

  const setClause = entries.map(([key]) => `${key} = ?`).join(', ');
  const values = entries.map(([_, value]) => value);

  let whereClause = `\`${idField}\` = ?`;
  values.push(idValue);

  for(const [key, val] of Object.entries(extraConditions)){
    whereClause += ` AND \`${key}\` = ?`;
  }


  const query = `UPDATE \`${table}\` SET ${setClause} WHERE ${whereClause}`;

  return {
    query,
    values
  };
}   
