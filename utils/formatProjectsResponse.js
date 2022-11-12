const formatProjectsResponse = (projectIds, projects, fields, skills, tags) => {
  const content = [];
  for (const projectId of projectIds) {
    const project = projects.find(
      (project) => project.project_id === projectId
    );
    project.fields = fields.filter((field) => field.project_id === projectId);
    project.skills = skills.filter((skill) => skill.project_id === projectId);
    project.tags = tags.filter((tag) => tag.project_id === projectId);
    content.push(project);
  }
  return content;
};

module.exports = formatProjectsResponse;
