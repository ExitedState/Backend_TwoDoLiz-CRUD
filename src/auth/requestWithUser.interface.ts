import { Request } from 'express';
import { UserDocument } from 'src/user/user.schema';


interface RequestWithUser extends Request {
  user: UserDocument;
}

export default RequestWithUser;