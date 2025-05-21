export default function ChatLayout({
  chatView,
  pdfView,
}: {
  chatView: React.ReactNode;
  pdfView: React.ReactNode;
}) {
  return (
    <div className="flex justify-center h-screen">
      <div className="w-10/12 lg:w-1/2">{chatView}</div>
      <div className="hidden lg:block w-1/2">{pdfView}</div>
    </div>
  );
}
