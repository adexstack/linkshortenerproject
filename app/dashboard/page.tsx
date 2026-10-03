import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  return (
    <div className="flex items-center justify-between p-6">
      <h1>Dashboard</h1>
      <UserButton />
    </div>
  );
}
