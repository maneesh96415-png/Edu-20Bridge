import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold tracking-tight">404</h1>
        <p className="mt-2 text-muted-foreground">Oops! Page not found</p>
        <Link to="/" className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-primary-foreground">Go Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
