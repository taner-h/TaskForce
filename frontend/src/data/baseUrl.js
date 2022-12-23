export function getProxy() {
  console.log('base url hesaplaniyor');
  switch (process.env.NODE_ENV) {
    case 'development':
      return 'http://localhost:5000';

    case 'production':
      return '';
    default:
      return 'http://localhost:5000';
  }
}

const baseUrl = Object.freeze(getProxy());

export default baseUrl;
