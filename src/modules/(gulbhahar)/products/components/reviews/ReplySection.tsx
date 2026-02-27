"use client";
import { Send, User } from "lucide-react";
import { useState } from "react";

interface Reply {
  user: string;
  text: string;
  date: string;
  timestamp: string;
}

interface ReplySectionProps {
  reviewId: string;
  variant?: "mobile" | "desktop";
}

export function ReplySection({ reviewId, variant = "desktop" }: ReplySectionProps) {
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState<Reply[]>([]);

  const isMobile = variant === "mobile";

  const handleReply = () => {
    if (replyText.trim()) {
      const newReply: Reply = {
        user: "You",
        text: replyText.trim(),
        date: "just now",
        timestamp: new Date().toISOString(),
      };

      setReplies((prev) => [...prev, newReply]);
      setReplyText("");
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      {/* Existing Replies List - Show First */}
      {replies.length > 0 && (
        <div className="mb-3 sm:mb-4 space-y-2 sm:space-y-3">
          {replies.map((reply, replyIdx) => (
            <div
              key={replyIdx}
              className="ml-4 sm:ml-6 p-2 sm:p-3 bg-blue-50 rounded-lg border-l-2 sm:border-l-4 border-blue-300"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                <div className="w-5 h-5 sm:w-7 sm:h-7 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-900">
                  {reply.user}
                </span>
                <span className="text-xs sm:text-sm text-gray-500">
                  {reply.date}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 ml-7 sm:ml-10">
                {reply.text}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Reply Form - Show at Bottom */}
      <div className="p-3 sm:p-4 bg-gray-50 rounded-lg border">
        <div className="flex gap-2 sm:gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-900 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </div>
          <div className="flex-1">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply..."
              className="w-full text-xs sm:text-sm p-2 sm:p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
              rows={3}
            />
            <div className="flex justify-end gap-2 sm:gap-3 mt-2 sm:mt-3">
              <button
                onClick={() => setReplyText("")}
                className="px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={handleReply}
                disabled={!replyText.trim()}
                className="px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 sm:gap-2"
              >
                <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                {isMobile ? "Reply" : "Post Reply"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
