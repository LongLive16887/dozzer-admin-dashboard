
const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="mt-4 text-xl text-gray-700">Page Not Found</p>
        <p className="mt-2 text-sm text-gray-500">Sorry, the page you are looking for doesn't exist.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
