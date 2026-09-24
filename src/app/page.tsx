import ImageForm from "@/components/ImageForm";

export default function Home() {
  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Image Manager</h1>
          <p className="text-text-secondary text-base md:text-lg max-w-xl">
            Create new Image resources for your kube-workspaces. Fill in the form below with the required information.
          </p>
        </header>

        {/* Form Card */}
        <div className="bg-surface rounded-lg shadow-elevation p-6 md:p-8">
          <ImageForm />
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-text-muted text-sm">
          <p>Kube Workspaces Image Manager &copy; 2026</p>
        </footer>
      </div>
    </main>
  );
}
