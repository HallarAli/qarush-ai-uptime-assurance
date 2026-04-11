import { useLocation } from "react-router-dom";

export default function DashboardPlaceholder() {
  const location = useLocation();
  const pageName = location.pathname.split("/").pop() || "Page";
  const title = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-foreground mb-2">{title}</h1>
        <p className="text-sm text-muted-foreground">This page is coming soon.</p>
      </div>
    </div>
  );
}
