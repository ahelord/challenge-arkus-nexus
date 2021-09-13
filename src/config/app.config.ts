import './dotenv.config';
const appConfig = {
  port: process.env.PORT,
  take: 10,
  skip: 0,
  superAdmin: {
    password: process.env.SUPER_ADMIN_PASSWORD,
    email: process.env.SUPER_ADMIN_EMAIL,
  },
};
export default appConfig;
