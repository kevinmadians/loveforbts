"use client"

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { MessageDetail } from '@/app/components/features/message-detail'
import { useMessages } from '@/app/lib/message-context'
import { type Message } from '@/app/lib/message-context'
import { getMessageByMessageId } from '@/app/lib/supabase-service'

export default function MessageDetailPage() {
  const params = useParams()
  const message_id = params?.id as string
  const router = useRouter()
  const { messages } = useMessages()
  const [message, setMessage] = useState<Message | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    async function findMessage() {
      let foundMessage = messages.find(m => m.message_id === message_id);
      if (foundMessage) {
        setMessage(foundMessage);
        setIsLoading(false);
        return;
      }
      // Fetch from Supabase if not found in context
      const dbMessage = await getMessageByMessageId(message_id);
      if (dbMessage) {
        setMessage({
          id: dbMessage.id,
          message_id: dbMessage.message_id,
          name: dbMessage.name,
          country: dbMessage.country,
          message: dbMessage.message,
          date: new Date(dbMessage.created_at).toISOString().split('T')[0],
          like_count: dbMessage.like_count || 0,
          is_featured: dbMessage.is_featured || false
        });
        setIsLoading(false);
      } else {
        setError('Message not found');
        setIsLoading(false);
      }
    }
    findMessage();
  }, [message_id, messages])
  
  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 pt-0 md:pt-4">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-2">Loading message...</p>
        </div>
      </div>
    )
  }
  
  // Error state
  if (error || !message) {
    return (
      <div className="container mx-auto px-4 pt-0 md:pt-4">
        <div className="bg-white rounded-2xl border-2 border-black p-6 shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4 black-han-sans">Message Not Found</h1>
          <p className="mb-6 text-gray-600">{error || 'This message could not be found.'}</p>
          <button
            onClick={() => router.push('/messages')}
                          className="inline-flex items-center px-5 py-3 bg-black text-bts-accent rounded-lg transition-colors hover:bg-purple-900 black-han-sans"
          >
            Back to Messages
          </button>
        </div>
      </div>
    )
  }
  
  // Render message detail
  return (
    <div className="container mx-auto px-4 pt-0 md:pt-4">
      <MessageDetail message={message} />
    </div>
  )
} 