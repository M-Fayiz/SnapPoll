import "express";

declare module "express-serve-static-core" {
  interface User {
    _id?: string;
    id?: string;
    googleId?: string;
    email?: string;
    name?: string;
    avatar?: string;
  }
}
