interface Step {
  title: string
  desc: string
}

interface AppScreensProps {
  tag: string
  headline: string
  steps: Step[]
}

function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[200px]">
      <div className="relative bg-black rounded-[42px] p-[10px] shadow-[0_32px_64px_rgba(0,0,0,0.25)]">
        <div className="bg-white rounded-[34px] overflow-hidden h-[400px] relative">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[72px] h-[24px] bg-black rounded-b-[12px] z-20" />
          {/* Side buttons */}
          <div className="absolute -left-[11px] top-[76px] w-[4px] h-[28px] bg-black/60 rounded-l-full" />
          <div className="absolute -left-[11px] top-[116px] w-[4px] h-[28px] bg-black/60 rounded-l-full" />
          <div className="absolute -right-[11px] top-[94px] w-[4px] h-[44px] bg-black/60 rounded-r-full" />
          {/* Content */}
          <div className="pt-7 h-full flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Screen 1 : Create your profiles ─── */
function CreateProfileScreen() {
  return (
    <PhoneShell>
      <div className="flex justify-between items-center px-4 pb-2 text-[9px] font-bold text-black">
        <span>9:41</span>
        <div className="flex gap-1 items-center"><span>●●●</span><span>🔋</span></div>
      </div>

      <div className="px-4 pb-2">
        <p className="text-[11px] font-black text-black">Create your profile</p>
        <p className="text-[8px] text-[#6A4125]">Step 1 of 3 — About your dog</p>
      </div>

      <div className="flex justify-center mb-3">
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-black">
            <img src="/dogs/dog2.jpg" alt="Bella" className="w-full h-full object-cover object-top" />
          </div>
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#BC4AD8] rounded-full border border-black flex items-center justify-center text-[9px] text-white font-bold">
            +
          </div>
        </div>
      </div>

      <div className="px-4 flex flex-col gap-2 flex-1">
        <div>
          <p className="text-[8px] font-bold text-[#6A4125] mb-1">Dog's name</p>
          <div className="bg-white border border-black rounded-[10px] px-3 py-2 text-[9px] font-semibold text-black">
            Bella
          </div>
        </div>
        <div>
          <p className="text-[8px] font-bold text-[#6A4125] mb-1">Breed</p>
          <div className="bg-white border border-black rounded-[10px] px-3 py-2 text-[9px] font-semibold text-black">
            Border Collie
          </div>
        </div>
        <div>
          <p className="text-[8px] font-bold text-[#6A4125] mb-1">Personality</p>
          <div className="flex gap-1 flex-wrap">
            {["Energetic", "Friendly", "Playful", "Smart"].map((t) => (
              <span key={t} className="bg-[#D6A6E2] border border-black text-black text-[7px] font-bold px-1.5 py-0.5 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-auto pb-3">
          <div className="w-full bg-[#BC4AD8] text-white text-[9px] font-extrabold py-2.5 rounded-full border border-black text-center">
            Continue →
          </div>
        </div>
      </div>
    </PhoneShell>
  )
}

/* ─── Screen 2 : Swipe & discover ─── */
function SwipeScreen() {
  return (
    <PhoneShell>
      <div className="flex justify-between items-center px-4 pb-2 text-[9px] font-bold text-black">
        <span>9:41</span>
        <div className="flex gap-1 items-center"><span>●●●</span><span>🔋</span></div>
      </div>

      <div className="flex justify-between items-center px-4 pb-3">
        <p className="text-[13px] font-black text-black">RAWR<span className="text-[#BC4AD8]">.</span></p>
        <div className="flex gap-2 text-[13px]">🔔 ♡</div>
      </div>

      <div className="mx-3 rounded-[20px] overflow-hidden border border-black relative flex-1">
        <div className="h-[195px] relative overflow-hidden">
          <img src="/dogs/labrador.png" alt="Max" className="w-full h-full object-cover object-center" />
          <div className="absolute top-2.5 right-2.5 bg-[#EFCA9E] text-black text-[8px] font-extrabold px-2 py-0.5 rounded-full border border-black">
            1.2 km
          </div>
          <div className="absolute top-4 left-3 border-2 border-white text-white text-[10px] font-black px-2 py-0.5 rounded rotate-[-18deg] opacity-90">
            LIKE
          </div>
        </div>

        <div className="px-3 py-2 bg-white">
          <div className="flex justify-between items-start mb-1">
            <div>
              <p className="text-[12px] font-black text-black">Max, 3 y.o.</p>
              <p className="text-[8px] text-[#6A4125] font-semibold">Golden Retriever</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-black">Lucas, 27</p>
              <p className="text-[8px] text-[#6A4125]">Paris 11e</p>
            </div>
          </div>
          <div className="flex gap-1 flex-wrap">
            {["Playful", "Morning walks", "Parks"].map((t) => (
              <span key={t} className="bg-[#D6A6E2] border border-black text-black text-[7px] font-bold px-1.5 py-0.5 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 py-3">
        <button className="w-10 h-10 rounded-full bg-white border-2 border-black flex items-center justify-center text-[16px]">✕</button>
        <button className="w-10 h-10 rounded-full bg-[#BC4AD8] border-2 border-black flex items-center justify-center text-[16px]">🐾</button>
      </div>
    </PhoneShell>
  )
}

/* ─── Screen 3 : Match & chat ─── */
function ConversationScreen() {
  const messages = [
    { from: "them", text: "Hey! I saw Bella is a Collie 🐕" },
    { from: "me",   text: "Yes! Max would love her 😄" },
    { from: "them", text: "Want to meet at Parc Monceau?" },
    { from: "me",   text: "Sunday morning works great!" },
    { from: "them", text: "Perfect, see you at 10am 🐾" },
  ]

  return (
    <PhoneShell>
      <div className="flex justify-between items-center px-4 pb-2 text-[9px] font-bold text-black">
        <span>9:41</span>
        <div className="flex gap-1 items-center"><span>●●●</span><span>🔋</span></div>
      </div>

      <div className="mx-3 mb-2 bg-[#D6A6E2] rounded-[12px] border border-black px-3 py-1.5 flex items-center gap-2">
        <span className="text-[14px]">🎉</span>
        <div>
          <p className="text-[8px] font-black text-black">It's a match!</p>
          <p className="text-[7px] text-[#6A4125]">You & Lucas both liked each other</p>
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 pb-2 border-b border-black/10">
        <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border border-black">
          <img src="/dogs/labrador.png" alt="Max" className="w-full h-full object-cover object-center" />
        </div>
        <div>
          <p className="text-[10px] font-black text-black">Lucas & Max</p>
          <p className="text-[7px] text-[#6A4125]">Active now</p>
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-3 py-2 flex flex-col gap-1.5 bg-[#EFCA9E]/30">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] px-2.5 py-1.5 rounded-[10px] text-[8px] leading-relaxed font-medium border border-black/10 ${
              msg.from === "me"
                ? "bg-[#BC4AD8] text-white rounded-br-[3px]"
                : "bg-white text-black rounded-bl-[3px]"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 px-3 py-2 border-t border-black/10">
        <div className="flex-1 bg-white border border-black rounded-full px-3 py-1.5 text-[7px] text-black/40">
          Type a message…
        </div>
        <div className="w-6 h-6 rounded-full bg-[#BC4AD8] border border-black flex items-center justify-center text-[9px] text-white">➤</div>
      </div>
    </PhoneShell>
  )
}

/* ─── Screen 4 : Plan your walk ─── */
function MapScreen() {
  return (
    <PhoneShell>
      <div className="flex justify-between items-center px-4 pb-2 text-[9px] font-bold text-black">
        <span>9:41</span>
        <div className="flex gap-1 items-center"><span>●●●</span><span>🔋</span></div>
      </div>

      <div className="px-4 pb-2">
        <p className="text-[8px] text-[#6A4125] font-semibold">First walk planned 🐾</p>
        <p className="text-[12px] font-black text-black">Parc Monceau</p>
      </div>

      <div className="mx-3 rounded-[18px] overflow-hidden flex-1 relative border border-black">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 260" preserveAspectRatio="xMidYMid slice">
          <rect width="200" height="260" fill="#EDD9B8" />
          <ellipse cx="100" cy="120" rx="68" ry="75" fill="#C8E6B0" />
          <ellipse cx="100" cy="120" rx="55" ry="60" fill="#B8DDA0" />
          <line x1="0" y1="45"  x2="200" y2="45"  stroke="#D4B896" strokeWidth="6" />
          <line x1="0" y1="195" x2="200" y2="195" stroke="#D4B896" strokeWidth="6" />
          <line x1="28"  y1="0" x2="28"  y2="260" stroke="#D4B896" strokeWidth="6" />
          <line x1="172" y1="0" x2="172" y2="260" stroke="#D4B896" strokeWidth="6" />
          <path d="M 55 195 Q 40 160 45 120 Q 50 82 75 64 Q 100 50 128 60 Q 152 72 155 102 Q 158 135 142 158 Q 126 180 100 190 Q 80 198 55 195"
            fill="none" stroke="#BC4AD8" strokeWidth="3.5" strokeDasharray="7,4" strokeLinecap="round" />
          <circle cx="55" cy="195" r="9" fill="#000" />
          <text x="55" y="199" textAnchor="middle" fontSize="9" fill="white">🐾</text>
          <circle cx="100" cy="88" r="10" fill="#BC4AD8" stroke="#000" strokeWidth="2" />
          <text x="100" y="93" textAnchor="middle" fontSize="10">📍</text>
          <circle cx="142" cy="158" r="8" fill="#D6A6E2" stroke="#000" strokeWidth="1.5" />
          <text x="142" y="163" textAnchor="middle" fontSize="8">🏁</text>
          {([[80,98],[120,98],[70,145],[130,145],[100,158]] as [number,number][]).map(([cx,cy], i) => (
            <text key={i} x={cx} y={cy} textAnchor="middle" fontSize="11">🌳</text>
          ))}
        </svg>
      </div>

      <div className="mx-3 my-2 bg-[#6A4125] rounded-[12px] border border-black px-3 py-2 flex justify-between items-center">
        <div className="text-center">
          <p className="text-[7px] text-white/60 font-semibold">Distance</p>
          <p className="text-[10px] font-black text-[#D6A6E2]">2.4 km</p>
        </div>
        <div className="text-center">
          <p className="text-[7px] text-white/60 font-semibold">Duration</p>
          <p className="text-[10px] font-black text-[#D6A6E2]">~35 min</p>
        </div>
        <div className="text-center">
          <p className="text-[7px] text-white/60 font-semibold">Meet at</p>
          <p className="text-[10px] font-black text-[#D6A6E2]">10:00 AM</p>
        </div>
      </div>
    </PhoneShell>
  )
}

/* ─── Section principale ─── */
export function AppScreens({ tag, headline, steps }: AppScreensProps) {
  const screens = [
    <CreateProfileScreen key="1" />,
    <SwipeScreen key="2" />,
    <ConversationScreen key="3" />,
    <MapScreen key="4" />,
  ]

  return (
    <section id="how-it-works" className="px-[10%] py-20 bg-[#EFCA9E]">
      <div className="text-center mb-14">
        <div className="inline-flex items-center bg-white text-black text-[11px] font-extrabold px-[14px] py-[6px] rounded-full border border-black uppercase tracking-[0.08em] mb-4">
          {tag}
        </div>
        <h2
          className="font-black text-black tracking-[-0.04em] leading-[1.1]"
          style={{ fontSize: "clamp(28px, 4vw, 46px)" }}
        >
          {headline}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 items-end max-w-5xl mx-auto">
        {steps.map((step, i) => (
          <div key={i} className={`flex flex-col items-center gap-4 ${i === 1 || i === 2 ? "lg:-translate-y-6" : ""}`}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#BC4AD8] text-white text-[16px] font-black mb-2 border border-black">
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="text-[13px] font-extrabold text-black leading-tight">{step.title}</p>
            </div>

            {screens[i]}

            <p className="text-[12px] text-[#6A4125] leading-relaxed text-center max-w-[180px]">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
