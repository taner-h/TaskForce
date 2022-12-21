export default function getProxy() {
  switch (process.env.NODE_ENV) {
    case 'development':
      return 'http://localhost:5000';

    case 'production':
      return '';
    default:
      return 'http://localhost:5000';
  }
}
