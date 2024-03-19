import { githubLangList } from "../../mock/githublanguage";

export const langColorList = Object.entries(githubLangList).reduce((acc, [key, value]) => {
  //@ts-ignore
  if (value.color) {
    //@ts-ignore
    acc[key] = value.color; 
  }
  return acc;
}, []);
