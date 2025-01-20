"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/users");
  }, [router]);

  return (
    <div>
      <h1>Redirecting...</h1>
      <ToastContainer />
    </div>
  );
}
