import NavBar from "../components/NavBar";
import { useRouteError } from "react-router-dom";

function ErrorPage({error}) {

  return (
    <>
      <main>
        <h1>Oops! Looks like something went wrong.</h1>
        <p>Error: {error}</p>
      </main>
    </>
  );
}

export default ErrorPage;