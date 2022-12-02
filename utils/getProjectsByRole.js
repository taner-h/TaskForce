const getProjectsByRole = (projects, role) => {
  switch (role) {
    case "all":
      return [
        ...projects.creator,
        ...projects.applicant,
        ...projects.invitee,
        ...projects.member,
      ];
    case "creator":
      return projects.creator;
    case "applicant":
      return projects.applicant;
    case "invitee":
      return projects.invitee;
    case "member":
      return projects.member;
    default:
      return [
        ...projects.creator,
        ...projects.applicant,
        ...projects.invitee,
        ...projects.member,
      ];
  }
};
module.exports = getProjectsByRole;
