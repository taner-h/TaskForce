const formatTasksResponse = (taskIds, tasks, fields, skills, tags) => {
  const content = [];
  for (const taskId of taskIds) {
    const task = tasks.find((task) => task.task_id === taskId);
    task.fields = fields.filter((field) => field.task_id === taskId);
    task.skills = skills.filter((skill) => skill.task_id === taskId);
    task.tags = tags.filter((tag) => tag.task_id === taskId);
    content.push(task);
  }
  return content;
};

module.exports = formatTasksResponse;
