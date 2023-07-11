/**

Renders a Next.js page component that displays a grid of character avatars with links to individual character pages.
@component
@returns {JSX.Element} The rendered page component.
*/

import { Container } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { endpoint } from '@/utils/endpoint'



async function getData() {
  const res = await fetch('https://tll5qx2tb3.execute-api.us-west-1.amazonaws.com/prod/helloworld')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 
export default async function Page() {
  const data = await getData()
  // Display data

  return (

    <main className="flex items-center justify-center h-screen">
      <div>
        <h1 className="block text-blue-900 text-sm font-bold mb-2">{data}</h1>
        <Link href="/api/messages">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Send Message
          </button>
        </Link>
      </div>
      <div>
        <Image src="/aws.png" alt='aws' width={70} height={50} />
      </div>
    </main>
  )
}

