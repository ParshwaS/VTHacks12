import { Heart } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-3 py-6 px-4 sm:px-6 lg:px-8 border-gray-200">
        <div className="mt-4 flex justify-center items-center text-sm text-gray-500">
          Made with <Heart className="h-4 w-4 mx-1 text-red-500" aria-hidden="true" /> by 
        </div>
    </footer>
  )
}