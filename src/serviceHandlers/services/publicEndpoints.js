import { Post } from "../publicHttpClient";

const baseName = "/public";

const loginUrl = `${baseName}/login`;

export const loginApi = (req) => {
  return Post(loginUrl, req);
};

const signupUrl = `${baseName}/signup`;
export const signUpApi =(req) => {
  return Post(signupUrl,req);
}