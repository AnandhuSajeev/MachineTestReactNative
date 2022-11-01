import routes from './routes';

// Base url should set here
const env = {
  develop: {
    api: {
      user: 'https://reqres.in/api/users',
      register: 'https://dummy.restapiexample.com/api/v1',
    },
  },
};

const config = {
  routes,
  api: env.develop.api,
};

export default config;
