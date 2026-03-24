"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChartBarIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import type { PollData } from "@/lib/types";

interface MobilePollWidgetProps {
  poll: PollData;
}

export default function MobilePollWidget({ poll }: MobilePollWidgetProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const totalAfterVote = poll.totalVotes + (hasVoted ? 1 : 0);

  function handleVote() {
    if (!selectedOption) return;
    setHasVoted(true);
  }

  return (
    <motion.div
      className="mx-4 rounded-2xl bg-gradient-to-br from-yellow-400 via-red-500 to-red-700 p-5 shadow-lg"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      role="region"
      aria-label="Poll widget"
    >
      <div className="flex items-center gap-2 mb-4">
        <ChartBarIcon className="w-5 h-5 text-yellow-200" />
        <h3 className="font-heading font-bold text-lg text-white">
          Ano Sa Palagay Mo?
        </h3>
      </div>
      <p className="font-semibold text-white/95 text-base mb-4">
        {poll.question}
      </p>

      <div className="space-y-2.5">
        {poll.options.map((option) => {
          const votes = option.id === selectedOption && hasVoted
            ? option.votes + 1
            : option.votes;
          const pct = hasVoted ? Math.round((votes / totalAfterVote) * 100) : 0;

          return (
            <button
              key={option.id}
              type="button"
              disabled={hasVoted}
              onClick={() => setSelectedOption(option.id)}
              className={`w-full text-left rounded-xl p-3 transition-all relative overflow-hidden ${
                hasVoted
                  ? "bg-white/25 cursor-default"
                  : selectedOption === option.id
                  ? "bg-white shadow-md shadow-yellow-500/20"
                  : "bg-white/60 hover:bg-white/80"
              }`}
            >
              {hasVoted && (
                <motion.div
                  className="absolute inset-y-0 left-0 bg-yellow-400/30"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                />
              )}
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedOption === option.id
                        ? "border-yellow-500"
                        : "border-gray-400"
                    }`}
                  >
                    {selectedOption === option.id && (
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    )}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      hasVoted ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {option.label}
                  </span>
                </div>
                {hasVoted && (
                  <span className="text-sm font-bold text-yellow-200">{pct}%</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {!hasVoted && (
        <button
          type="button"
          onClick={handleVote}
          disabled={!selectedOption}
          className={`mt-4 w-full py-3 rounded-xl font-bold text-sm transition-all ${
            selectedOption
              ? "bg-yellow-500 text-gray-900 hover:bg-yellow-400 shadow-lg shadow-yellow-500/30"
              : "bg-white/30 text-white/50 cursor-not-allowed"
          }`}
        >
          Vote Now
        </button>
      )}

      {hasVoted && (
        <motion.div
          className="mt-3 flex items-center justify-center gap-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <CheckCircleIcon className="w-5 h-5 text-yellow-300" />
          <p className="text-sm text-white/80">
            {totalAfterVote.toLocaleString()} na votes
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
