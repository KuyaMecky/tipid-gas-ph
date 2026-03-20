import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl font-extrabold text-orange-500 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Hindi Mahanap ang Pahina</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        Ang pahina na hinahanap mo ay hindi namin mahanap.
        Subukan ang paghahanap o bumalik sa homepage.
      </p>
      <div className="flex gap-4">
        <Button href="/" variant="primary" size="lg">
          Uwi sa Home
        </Button>
        <Button href="/gasolina" variant="outline" size="lg">
          Presyo ng Gas
        </Button>
      </div>
    </div>
  );
}
