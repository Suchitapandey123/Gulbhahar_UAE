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
  reviewIndex: number;
  variant?: "mobile" | "desktop";
}

export function ReplySection({ variant = "desktop" }: ReplySectionProps) {
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
    <div className={`mt-${isMobile ? "3" : "4"}`}>
      <div className={`p-${isMobile ? "3" : "4"} bg-gray-50 rounded-lg border`}>
        <div className={`flex gap-${isMobile ? "2" : "3"}`}>
          <div
            className={`w-${isMobile ? "6" : "8"} h-${isMobile ? "6" : "8"} bg-red-900 rounded-full flex items-center justify-center flex-shrink-0`}
          >
            <User
              className={`w-${isMobile ? "3" : "4"} h-${isMobile ? "3" : "4"} text-white`}
            />
          </div>
          <div className="flex-1">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply..."
              className={`w-full text-${isMobile ? "xs" : "sm"} p-${isMobile ? "2" : "3"} border border-gray-300 rounded${isMobile ? "" : "-lg"} resize-none focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent`}
              rows={3}
            />
            <div
              className={`flex justify-end gap-${isMobile ? "2" : "3"} mt-${isMobile ? "2" : "3"}`}
            >
              <button
                onClick={() => setReplyText("")}
                className={`px-${isMobile ? "3" : "4"} py-${isMobile ? "1" : "2"} text-${isMobile ? "xs" : "sm"} text-gray-600 hover:text-gray-800 transition-colors`}
              >
                Cancel
              </button>
              <button
                onClick={handleReply}
                disabled={!replyText.trim()}
                className={`px-${isMobile ? "3" : "4"} py-${isMobile ? "1" : "2"} text-${isMobile ? "xs" : "sm"} bg-red-900 text-white rounded${isMobile ? "" : "-lg"} hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-${isMobile ? "1" : "2"}`}
              >
                <Send
                  className={`w-${isMobile ? "3" : "4"} h-${isMobile ? "3" : "4"}`}
                />
                {isMobile ? "Reply" : "Post Reply"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {replies.length > 0 && (
        <div
          className={`mt-${isMobile ? "3" : "4"} space-y-${isMobile ? "2" : "3"}`}
        >
          {replies.map((reply, replyIdx) => (
            <div
              key={replyIdx}
              className={`${isMobile ? "ml-4" : "ml-6"} p-${isMobile ? "2" : "3"} bg-blue-50 rounded-lg border-l-${isMobile ? "2" : "4"} border-blue-300`}
            >
              <div
                className={`flex items-center gap-${isMobile ? "2" : "3"} mb-${isMobile ? "1" : "2"}`}
              >
                <div
                  className={`w-${isMobile ? "5" : "7"} h-${isMobile ? "5" : "7"} bg-blue-600 rounded-full flex items-center justify-center`}
                >
                  <User
                    className={`w-${isMobile ? "3" : "4"} h-${isMobile ? "3" : "4"} text-white`}
                  />
                </div>
                <span
                  className={`text-${isMobile ? "xs" : "sm"} font-medium text-gray-900`}
                >
                  {reply.user}
                </span>
                <span
                  className={`text-${isMobile ? "xs" : "sm"} text-gray-500`}
                >
                  {reply.date}
                </span>
              </div>
              <p
                className={`text-${isMobile ? "xs" : "sm"} text-gray-700 ml-${isMobile ? "7" : "10"}`}
              >
                {reply.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
