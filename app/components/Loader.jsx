import { useState, useEffect } from "react";

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return loading ? (
    <div className="fixed inset-0 bg-black flex items-center justify-center text-white text-2xl">
      Loading...
    </div>
  ) : null;
}
