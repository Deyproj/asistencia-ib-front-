export const msalConfig = {
  auth: {
    clientId: "9827c154-49c3-4587-834b-dc3fe2d66253",
    authority: "https://login.microsoftonline.com/common/", 
    redirectUri: "http://localhost:3000/",
    postLoginRedirectUri: "http://localhost:3000/empresas"
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  }
};

export const loginRequest = {
 scopes: ["User.Read"]
};





