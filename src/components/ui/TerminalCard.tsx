"use client";

import { faTerminal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export type TerminalLine = {
  text: string;
  muted?: boolean;
};

type TerminalCardProps = {
  path: string;
  command: string;
  output: TerminalLine[];
};

const TYPE_MS = 45;
const LINE_MS = 140;

export default function TerminalCard({
  path,
  command,
  output,
}: TerminalCardProps) {
  const [typed, setTyped] = useState(0);
  const [lines, setLines] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      setTyped(command.length);
      setLines(output.length);
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    let chars = 0;
    let shown = 0;

    const revealLine = () => {
      shown += 1;
      setLines(shown);
      if (shown < output.length) timer = setTimeout(revealLine, LINE_MS);
    };

    const typeChar = () => {
      chars += 1;
      setTyped(chars);
      if (chars < command.length) timer = setTimeout(typeChar, TYPE_MS);
      else timer = setTimeout(revealLine, 300);
    };

    timer = setTimeout(typeChar, 500);
    return () => clearTimeout(timer);
  }, [command, output.length]);

  const done = typed >= command.length && lines >= output.length;

  return (
    <div className="w-full border border-white/10 bg-[#060910]/90 font-mono text-[13px] shadow-2xl shadow-black/40 backdrop-blur">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </div>
        <span className="truncate px-3 text-xs text-gray-500">{path}</span>
        <FontAwesomeIcon
          icon={faTerminal}
          className="text-xs text-gray-600"
          aria-hidden
        />
      </div>

      <div className="min-h-56 px-4 py-5 leading-7" aria-label={command}>
        <div className="flex gap-2">
          <span className="text-cyan-300">$</span>
          <span className="break-all text-gray-100">
            {command.slice(0, typed)}
            {typed < command.length && (
              <span className="caret-blink ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-gray-300" />
            )}
          </span>
        </div>

        {output.slice(0, lines).map((line, index) => (
          <div
            key={`${index}-${line.text}`}
            className={`truncate ${line.muted ? "text-gray-600" : "text-gray-400"}`}
          >
            {line.text}
          </div>
        ))}

        {done && (
          <div className="flex gap-2">
            <span className="text-cyan-300">$</span>
            <span className="caret-blink mt-1.5 inline-block h-4 w-2 bg-gray-300" />
          </div>
        )}
      </div>
    </div>
  );
}
