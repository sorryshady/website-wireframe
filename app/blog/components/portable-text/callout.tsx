interface CalloutProps {
  type: "info" | "warning" | "success" | "error";
  content: string;
}

export function Callout({ type, content }: CalloutProps) {
  const styles = {
    info: "bg-blue-500/10 border-blue-500/20 text-blue-200",
    warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-200",
    success: "bg-green-500/10 border-green-500/20 text-green-200",
    error: "bg-red-500/10 border-red-500/20 text-red-200",
  };

  return (
    <div className={`my-8 p-4 rounded-lg border ${styles[type]} font-mont`}>
      {content}
    </div>
  );
}
