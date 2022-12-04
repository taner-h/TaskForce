const getTasksByType = (tasks, type) => {
  switch (type) {
    case "all":
      return [...tasks.created, ...tasks.answered, ...tasks.committed];
    case "created":
      return tasks.created;
    case "answered":
      return tasks.answered;
    case "committed":
      return tasks.committed;
    default:
      return [...tasks.created, ...tasks.answered, ...tasks.committed];
  }
};
module.exports = getTasksByType;
