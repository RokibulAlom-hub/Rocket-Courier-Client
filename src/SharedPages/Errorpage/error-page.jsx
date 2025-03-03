import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="flex flex-col items-center justify-center space-y-3 min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-6xl font-bold text-red-500 ">Oops!</h1>
      <p className="text-xl">Sorry, an unexpected error has occurred.</p>
      <p className="text-lg italic">
        {error.statusText || error.message}
      </p>
      <Link to="/" className="p-2 text-bgcolor bg-accent rounded-md">Back To  Home </Link>
    </div>
  );
}
