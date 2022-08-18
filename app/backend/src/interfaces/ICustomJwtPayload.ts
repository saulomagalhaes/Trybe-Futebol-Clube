import { JwtPayload } from 'jsonwebtoken';

interface ICustomJwtPayload extends JwtPayload {
  data: {
    role: string;
  }
}

export default ICustomJwtPayload;
