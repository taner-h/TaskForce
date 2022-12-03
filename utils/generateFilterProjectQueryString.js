const generateFilterProjectQueryString = (fields, skills, tags) => {
  const arr = [];
  const params = [];

  if (fields !== undefined && fields.length != 0) {
    arr.push(
      "SELECT DISTINCT project_id FROM project_field where field_id = ANY "
    );
    params.push(fields);
  }
  if (skills !== undefined && skills.length != 0) {
    arr.push(
      "SELECT DISTINCT project_id FROM project_skill where skill_id = ANY "
    );
    params.push(skills);
  }
  if (tags !== undefined && tags.length != 0) {
    arr.push("SELECT DISTINCT project_id FROM project_tag where tag_id = ANY ");
    params.push(tags);
  }

  let query;

  if (
    (fields === undefined || fields.length == 0) &&
    (skills === undefined || skills.length == 0) &&
    (tags === undefined || tags.length == 0)
  ) {
    query = "SELECT project_id FROM project";
  } else {
    query = `SELECT DISTINCT project_id FROM (${arr
      .map((str, i) => str + `($${i + 1})`)
      .join(" INTERSECT ")}) AS a`;
  }

  return { query, params };
};

module.exports = generateFilterProjectQueryString;
