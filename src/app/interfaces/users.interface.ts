export interface IUser {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  role: "USER" | "ADMIN" | "SUPER";
}

export interface IUserInstanceMethods {
  passwordHash(password: string): Promise<string>;
}

export interface IUserStaticMethods {
  passwordHash(password: string): Promise<string>;
}
