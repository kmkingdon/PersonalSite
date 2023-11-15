'use client'
import { Alert } from 'flowbite-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Home</p>
      <Alert color="info">Alert!</Alert>;
    </main>
  )
}
