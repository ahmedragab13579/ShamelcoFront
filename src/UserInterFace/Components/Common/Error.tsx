export default function Error({ text }: { text: string }) {
  return (
    <div className="p-4 bg-status-danger/10 border border-status-danger/20 text-status-danger rounded-2xl text-center font-medium">
      {text}{" "}
    </div>
  );
}
