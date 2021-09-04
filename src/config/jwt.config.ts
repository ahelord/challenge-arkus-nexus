import './dotenv.config';
const jwtConfig = {
  jwtSecret: process.env.JWT_SECRET,
};
export default jwtConfig;
