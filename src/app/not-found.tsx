export default function NotFound() {
    return (
      <div className="bg-white text-black flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Page Not Found</h1>
          <p className="mt-4">Sorry, the page you are looking for does not exist.</p>
          <a href="/" className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded">
            Go back to Home
          </a>
        </div>
      </div>
    );
  }
