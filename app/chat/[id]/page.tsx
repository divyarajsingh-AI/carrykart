
"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

type Message = {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
};

type Profile = {
  id: string;
  full_name: string;
};

type Conversation = {
  id: string;
  requester_id: string;
  traveller_id: string;
};

export default function ConversationPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const bottomRef = useRef<HTMLDivElement>(null);

  const [userId, setUserId] = useState("");
  const [otherName, setOtherName] = useState("CarryKart Member");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | null = null;
    let active = true;

    async function loadConversation() {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (!active) return;

      if (authError || !user) {
        router.replace("/login");
        return;
      }

      setUserId(user.id);

      const { data: conversation, error: conversationError } =
        await supabase
          .from("chat_conversations")
          .select("id, requester_id, traveller_id")
          .eq("id", id)
          .maybeSingle();

      if (!active) return;

      if (conversationError || !conversation) {
        setError("Conversation not found or you don't have access.");
        setLoading(false);
        return;
      }

      const chat = conversation as Conversation;

      const otherUserId =
        chat.requester_id === user.id
          ? chat.traveller_id
          : chat.requester_id;

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, full_name")
        .eq("id", otherUserId)
        .maybeSingle();

      if (!active) return;

      if (!profileError && profile) {
        setOtherName((profile as Profile).full_name);
      }

      const { data, error: messageError } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("conversation_id", id)
        .order("created_at", { ascending: true });

      if (!active) return;

      if (messageError) {
        setError(messageError.message);
        setLoading(false);
        return;
      }

      setMessages(data || []);

      channel = supabase
        .channel(`chat-${id}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "chat_messages",
            filter: `conversation_id=eq.${id}`,
          },
          (payload) => {
            const incoming = payload.new as Message;

            setMessages((current) => {
              if (current.some((message) => message.id === incoming.id)) {
                return current;
              }

              return [...current, incoming];
            });
          }
        )
        .subscribe();

      setLoading(false);
    }

    loadConversation();

    return () => {
      active = false;
      if (channel) supabase.removeChannel(channel);
    };
  }, [id, router]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const content = newMessage.trim();

    if (!content || !userId || sending) return;

    setSending(true);
    setError("");

    const { error: sendError } = await supabase
      .from("chat_messages")
      .insert({
        conversation_id: id,
        sender_id: userId,
        content,
      });

    if (sendError) {
      setError(sendError.message);
    } else {
      setNewMessage("");
    }

    setSending(false);
  }

  const initials = otherName
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="flex min-h-screen flex-col overflow-hidden bg-[#0B0714] text-white">

      {/* HEADER */}
      <header className="sticky top-0 z-20 border-b border-violet-300/10 bg-[#100B1B]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-4 sm:px-6">

          <button
            onClick={() => router.push("/chat")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-300/15 bg-white/[0.04] text-xl text-violet-200 transition hover:bg-violet-500/20"
          >
            ←
          </button>

          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-violet-300/30 bg-gradient-to-br from-violet-500/30 to-[#1D1430] text-sm font-bold text-violet-100 shadow-lg shadow-violet-500/10">
            {initials || "CK"}
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="truncate font-semibold text-white">
              {otherName}
            </h1>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-violet-300/70">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              CarryKart Member
            </p>
          </div>

          <div className="hidden rounded-full border border-violet-300/15 bg-violet-500/10 px-4 py-2 text-xs font-medium text-violet-200 sm:block">
            Private Chat
          </div>
        </div>
      </header>

      {/* MESSAGES */}
      <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 sm:px-6">

        <div className="flex-1 space-y-5 py-8">

          {!loading && (
            <div className="mx-auto mb-8 flex max-w-fit items-center gap-2 rounded-full border border-violet-300/10 bg-white/[0.03] px-4 py-2 text-[11px] text-white/40">
              <span>🔒</span>
              This is your private CarryKart conversation
            </div>
          )}

          {loading ? (
            <div className="py-24 text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-violet-300/20 border-t-violet-400" />
              <p className="text-sm text-white/40">
                Loading your conversation...
              </p>
            </div>
          ) : error && messages.length === 0 ? (
            <p className="py-16 text-center text-red-300">{error}</p>
          ) : messages.length === 0 ? (
            <div className="py-24 text-center">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-violet-300/20 bg-violet-500/10 text-4xl">
                💬
              </div>

              <h2 className="text-2xl font-bold">
                Start a connection.
              </h2>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/40">
                Say hello to {otherName} and start coordinating your CarryKart journey.
              </p>
            </div>
          ) : (
            messages.map((message) => {
              const mine = message.sender_id === userId;

              return (
                <div
                  key={message.id}
                  className={`flex ${mine ? "justify-end" : "justify-start"}`}
                >
                  {!mine && (
                    <div className="mr-2 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-violet-300/20 bg-violet-500/15 text-xs font-bold text-violet-200">
                      {initials || "CK"}
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-lg sm:max-w-[70%] ${
                      mine
                        ? "rounded-br-md border border-violet-300/20 bg-gradient-to-br from-violet-600 to-violet-800 shadow-violet-900/20"
                        : "rounded-bl-md border border-violet-300/15 bg-[#1D1430] shadow-black/20"
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words text-sm leading-6">
                      {message.content}
                    </p>

                    <p className="mt-2 text-right text-[10px] text-white/50">
                      {new Date(message.created_at).toLocaleTimeString(
                        [],
                        { hour: "2-digit", minute: "2-digit" }
                      )}
                    </p>
                  </div>
                </div>
              );
            })
          )}

          <div ref={bottomRef} />
        </div>

        {/* INPUT AREA */}
        {error && messages.length > 0 && (
          <p className="mb-3 text-sm text-red-300">{error}</p>
        )}

        <div className="sticky bottom-0 border-t border-violet-300/10 bg-[#0B0714]/95 py-4 backdrop-blur-xl">
          <form onSubmit={sendMessage} className="flex items-center gap-3">

            <div className="flex min-w-0 flex-1 items-center rounded-full border border-violet-300/20 bg-[#1D1430] px-5 transition focus-within:border-violet-300/60 focus-within:shadow-lg focus-within:shadow-violet-500/10">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Write your message..."
                maxLength={2000}
                disabled={loading}
                className="min-w-0 flex-1 bg-transparent py-4 text-sm text-white outline-none placeholder:text-white/35 disabled:opacity-50"
              />

              <span className="hidden text-[10px] text-white/25 sm:block">
                {newMessage.length}/2000
              </span>
            </div>

            <button
              type="submit"
              disabled={!newMessage.trim() || sending || loading}
              className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-violet-500 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:scale-[1.03] hover:from-violet-500 hover:to-violet-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
            >
              {sending ? "Sending..." : "Send"}
              <span>➤</span>
            </button>
          </form>

          <p className="mt-3 text-center text-[10px] tracking-wide text-white/25">
            CarryKart Connect · Keep your conversations respectful and safe
          </p>
        </div>
      </section>
    </main>
  );
}
