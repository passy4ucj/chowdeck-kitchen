import { Role, Customer } from "@prisma/client";

// enum UserTypes {
//   Seller,
//   Buyer
// }

export interface UserPayload {
  id: string;
  email: string;
  firstName: string;
  LastName: string;
  role: Role;
}

declare global {
  namespace Express {
    interface Users extends Customer {}
  }
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}