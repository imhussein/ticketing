import Axios from "axios";

const IndexPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Index Page 2</h1>;
};

IndexPage.getInitialProps = async ({ req }) => {
  if (typeof window === "undefined") {
    const { data } = await Axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: req.headers,
      }
    );
    return data;
  } else {
    const { data } = await Axios.get("/api/users/currentuser");
    return data;
  }
};

export default IndexPage;
