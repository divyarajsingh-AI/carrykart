
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Conversation = {
  id: string;
  requester_id: string;
  traveller_id: string;
  created_at: string;
};

type Profile = {
  id: string;
  full_name: string;
};

export default function ChatPage() {
  const [userId, setUserId] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [profiles, setProfiles] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadChats() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      setUserId(user.id);

      const { data, error } = await supabase
        .from("chat_conversations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Chat loading error:", error.message);
        setLoading(false);
        return;
      }

      const chats = data || [];
      setConversations(chats);

      const otherUserIds = [
        ...new Set(
          chats.map((chat) =>
            chat.requester_id === user.id
              ? chat.traveller_id
              : chat.requester_id
          )
        ),
      ];

      if (otherUserIds.length > 0) {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("id, full_name")
          .in("id", otherUserIds);

        if (profileError) {
          console.error("Profile loading error:", profileError.message);
        } else {
          const profileMap: Record<string, string> = {};

          (profileData as Profile[] || []).forEach((profile) => {
            profileMap[profile.id] = profile.full_name;
          });

          setProfiles(profileMap);
        }
      }

      setLoading(false);
    }

    loadChats();
  }, []);

  return (
    <main className="min-h-screen bg-[#0B0714] px-5 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <a
          href="/dashboard"
          className="text-sm text-violet-300 hover:text-white"
        >
          ← Back to Dashboard
        </a>

        <div className="mb-10 mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
            CarryKart Connect
          </p>

          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            Your <span className="text-violet-300">Messages.</span>
          </h1>

          <p className="mt-3 text-white/50">
            Connect with travellers and requesters securely.
          </p>
        </div>

        <section className="rounded-3xl border border-violet-300/15 bg-[#151020] p-6 shadow-2xl sm:p-8">
          {loading ? (
            <p className="py-12 text-center text-white/50">
              Loading your conversations...
            </p>
          ) : conversations.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-500/10 text-3xl">
                💬
              </div>

              <h2 className="text-xl font-semibold">
                No conversations yet
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/45">
                When you connect with a matching traveller or requester,
                your conversations will appear here.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <a
                  href="/find-traveller"
                  className="rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
                >
                  Find Traveller
                </a>

                <a
                  href="/browse-requests"
                  className="rounded-full border border-violet-300/30 px-6 py-3 text-sm font-semibold text-violet-200 transition hover:bg-violet-500/10"
                >
                  Browse Requests
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {conversations.map((chat) => {
                const otherUser =
                  chat.requester_id === userId
                    ? chat.traveller_id
                    : chat.requester_id;

                const otherUserName =
                  profiles[otherUser] || "CarryKart Member";

                return (
                  <div
                    key={chat.id}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-violet-300/20 bg-violet-500/15 text-lg font-bold text-violet-200">
                        {otherUserName.charAt(0).toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-semibold">
                          {otherUserName}
                        </p>
                        <p className="mt-1 text-xs text-white/40">
                          CarryKart Member
                        </p>
                      </div>
                    </div>

                    <a
                      href={`/chat/${chat.id}`}
                      className="shrink-0 rounded-full bg-violet-500/15 px-4 py-2 text-sm font-semibold text-violet-200 transition hover:bg-violet-500/30"
                    >
                      Open Chat →
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
