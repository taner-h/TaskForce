export default function getNotificationText(notification) {
  switch (notification.type) {
    case 'member':
      if (notification.action === 'insert') {
        return `${notification.causer_name} ${notification.causer_surname} added you to the project ${notification.object_name}`;
      } else if (notification.action === 'delete') {
        return `${notification.causer_name} ${notification.causer_surname} removed you from the project ${notification.object_name}`;
      }
      break;
    case 'application':
      return `${notification.causer_name} ${notification.causer_surname} applied to the project ${notification.object_name}`;
    case 'commit':
      return `${notification.causer_name} ${notification.causer_surname} committed to your task`;
    case 'answer':
      return `${notification.causer_name} ${notification.causer_surname} answered to your task`;
    default:
      break;
  }
}
