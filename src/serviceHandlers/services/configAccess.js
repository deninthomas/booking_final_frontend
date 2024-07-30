import { Get } from "../authHttpClient";

const baseName = "/main";

const getConfigurationUrl = `${baseName}/appconfig`;

export const getConfiguration = () => {
  return Get(getConfigurationUrl);
  
};
