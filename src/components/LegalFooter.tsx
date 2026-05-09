interface LegalFooterProps {
  copyright?: string
}

export function LegalFooter({ copyright = "© 2026 RAWR — The dating app for dog owners." }: LegalFooterProps) {
  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
        <p className="text-xs text-gray-600 text-center">
          {copyright}
        </p>
        <div className="mt-4 flex gap-4 justify-center text-xs">
          <a href="#" className="text-gray-500 hover:text-gray-700 underline">
            Privacy
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700 underline">
            Terms
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700 underline">
            Contact
          </a>
        </div>
      </div>
    </div>
  )
}
