import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, Heart } from 'lucide-react';
import { toast } from 'sonner';

export function LeaveMessageForm() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Implement message submission
      toast.success('Message submitted successfully!');
      setMessage('');
      router.push('/messages');
    } catch (error) {
      toast.error('Failed to submit message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border-2 border-black rounded-2xl p-6 md:p-8">
      <div className="flex flex-col items-center text-center mb-6">
        <MessageSquare className="w-8 h-8 text-purple-600 mb-2" />
        <h2 className="text-2xl md:text-3xl font-black mb-2">
          Leave a Message for BTS
        </h2>
        <p className="text-gray-600">
          Share your thoughts, wishes, or appreciation for BTS. Your message will be displayed on our message board for other ARMY to see.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Your Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows={4}
            placeholder="Write your message here..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center px-6 py-3 bg-black text-[#FFDE00] rounded-lg font-medium hover:bg-gray-900 transition-colors disabled:opacity-50"
        >
          <Heart className="w-5 h-5 mr-2" />
          {isSubmitting ? 'Submitting...' : 'Submit Message'}
        </button>
      </form>
    </div>
  );
} 