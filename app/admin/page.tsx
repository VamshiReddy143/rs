
import { Suspense } from "react";
import AdminDashboard from "@/components/AdminDashboard";

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#191a1b] flex items-center justify-center text-white">Loading dashboard...</div>}>
      <AdminDashboard />
    </Suspense>
  );
}
