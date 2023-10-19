const env = "local";
// const env = "production";

let data = {
  api_url: "http://localhost:3000/api/",
};

if (env === "production") {
  data = {
    api_url: "https://api.sasthobondhu.com/api/",
  };
}

export default data;
