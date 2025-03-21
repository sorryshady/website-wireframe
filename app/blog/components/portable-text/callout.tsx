interface CalloutProps {
  type: "info" | "warning" | "success" | "error";
  content: string;
}

export function Callout({ type, content }: CalloutProps) {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
  };

  return (
    <div className={`my-8 p-4 rounded-lg border ${styles[type]} font-mont`}>
      {content}
    </div>
  );
}
