import './dotenv.config';
const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: 3600,
  defaultStrategy: 'jwt',
};
export default jwtConfig;
