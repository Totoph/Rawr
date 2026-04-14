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
      <div className="relative bg-[#3D2314] rounded-[42px] p-[10px] shadow-[0_32px_64px_rgba(61,35,20,0.30)]">
        <div className="bg-[#FDF6EC] rounded-[34px] overflow-hidden h-[400px] relative">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[72px] h-[24px] bg-[#3D2314] rounded-b-[12px] z-20" />
          {/* Side buttons */}
          <div className="absolute -left-[11px] top-[76px] w-[4px] h-[28px] bg-[#5C3020] rounded-l-full" />
          <div className="absolute -left-[11px] top-[116px] w-[4px] h-[28px] bg-[#5C3020] rounded-l-full" />
          <div className="absolute -right-[11px] top-[94px] w-[4px] h-[44px] bg-[#5C3020] rounded-r-full" />
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
      {/* Status bar */}
      <div className="flex justify-between items-center px-4 pb-2 text-[9px] font-bold text-[#3D2314]">
        <span>9:41</span>
        <div className="flex gap-1 items-center"><span>●●●</span><span>🔋</span></div>
      </div>

      {/* Header */}
      <div className="px-4 pb-2">
        <p className="text-[11px] font-black text-[#3D2314]">Create your profile</p>
        <p className="text-[8px] text-[#7A4528]">Step 1 of 3 — About your dog</p>
      </div>

      {/* Avatar upload */}
      <div className="flex justify-center mb-3">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#F5C842] to-[#E8B83A] flex items-center justify-center text-[36px]">
            🐶
          </div>
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#3D2314] rounded-full flex items-center justify-center text-[9px] text-white">
            +
          </div>
        </div>
      </div>

      {/* Form fields */}
      <div className="px-4 flex flex-col gap-2 flex-1">
        <div>
          <p className="text-[8px] font-bold text-[#7A4528] mb-1">Dog's name</p>
          <div className="bg-white border border-[#F0DFC8] rounded-[10px] px-3 py-2 text-[9px] font-semibold text-[#3D2314]">
            Bella
          </div>
        </div>
        <div>
          <p className="text-[8px] font-bold text-[#7A4528] mb-1">Breed</p>
          <div className="bg-white border border-[#F0DFC8] rounded-[10px] px-3 py-2 text-[9px] font-semibold text-[#3D2314]">
            Border Collie
          </div>
        </div>
        <div>
          <p className="text-[8px] font-bold text-[#7A4528] mb-1">Personality</p>
          <div className="flex gap-1 flex-wrap">
            {["Energetic", "Friendly", "Playful", "Smart"].map((t) => (
              <span
                key={t}
                className="bg-[#FFF3C4] border border-[#F5C842] text-[#3D2314] text-[7px] font-bold px-1.5 py-0.5 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-auto pb-3">
          <div className="w-full bg-[#F5C842] text-[#3D2314] text-[9px] font-extrabold py-2.5 rounded-full text-center">
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
      {/* Status bar */}
      <div className="flex justify-between items-center px-4 pb-2 text-[9px] font-bold text-[#3D2314]">
        <span>9:41</span>
        <div className="flex gap-1 items-center"><span>●●●</span><span>🔋</span></div>
      </div>

      {/* App header */}
      <div className="flex justify-between items-center px-4 pb-3">
        <p className="text-[13px] font-black text-[#3D2314]">RAWR<span className="text-[#E8B83A]">.</span></p>
        <div className="flex gap-2 text-[13px]">🔔 ♡</div>
      </div>

      {/* Swipe card */}
      <div className="mx-3 rounded-[20px] overflow-hidden bg-[#F0DFC8] relative flex-1">
        {/* Dog photo */}
        <div className="h-[195px] bg-gradient-to-b from-[#C8A96E] to-[#F0DFC8] flex items-center justify-center relative">
          <span className="text-[80px] leading-none">🐕</span>
          <div className="absolute top-2.5 right-2.5 bg-[#F5C842] text-[#3D2314] text-[8px] font-extrabold px-2 py-0.5 rounded-full">
            1.2 km
          </div>
          {/* Like hint */}
          <div className="absolute top-4 left-3 border-2 border-[#F5C842] text-[#F5C842] text-[10px] font-black px-2 py-0.5 rounded rotate-[-18deg] opacity-80">
            LIKE
          </div>
        </div>

        {/* Info */}
        <div className="px-3 py-2">
          <div className="flex justify-between items-start mb-1">
            <div>
              <p className="text-[12px] font-black text-[#3D2314]">Max, 3 y.o.</p>
              <p className="text-[8px] text-[#7A4528] font-semibold">Golden Retriever</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-[#3D2314]">Lucas, 27</p>
              <p className="text-[8px] text-[#7A4528]">Paris 11e</p>
            </div>
          </div>
          <div className="flex gap-1 flex-wrap">
            {["Playful", "Morning walks", "Parks"].map((t) => (
              <span key={t} className="bg-[#FFF3C4] text-[#7A4528] text-[7px] font-bold px-1.5 py-0.5 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-center gap-4 py-3">
        <button className="w-10 h-10 rounded-full bg-white border-2 border-[#F0DFC8] flex items-center justify-center text-[16px] shadow-sm">✕</button>
        <button className="w-10 h-10 rounded-full bg-[#F5C842] flex items-center justify-center text-[16px] shadow-sm">🐾</button>
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
      {/* Status bar */}
      <div className="flex justify-between items-center px-4 pb-2 text-[9px] font-bold text-[#3D2314]">
        <span>9:41</span>
        <div className="flex gap-1 items-center"><span>●●●</span><span>🔋</span></div>
      </div>

      {/* Match banner */}
      <div className="mx-3 mb-2 bg-[#F5C842] rounded-[12px] px-3 py-1.5 flex items-center gap-2">
        <span className="text-[14px]">🎉</span>
        <div>
          <p className="text-[8px] font-black text-[#3D2314]">It's a match!</p>
          <p className="text-[7px] text-[#7A4528]">You & Lucas both liked each other</p>
        </div>
      </div>

      {/* Chat header */}
      <div className="flex items-center gap-2 px-4 pb-2 border-b border-[#F0DFC8]">
        <div className="w-7 h-7 rounded-full bg-[#F5C842] flex items-center justify-center text-[13px]">🐕</div>
        <div>
          <p className="text-[10px] font-black text-[#3D2314]">Lucas & Max</p>
          <p className="text-[7px] text-[#7A4528]">Active now</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden px-3 py-2 flex flex-col gap-1.5">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] px-2.5 py-1.5 rounded-[10px] text-[8px] leading-relaxed font-medium ${
              msg.from === "me"
                ? "bg-[#F5C842] text-[#3D2314] rounded-br-[3px]"
                : "bg-white text-[#3D2314] rounded-bl-[3px] shadow-sm"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-3 py-2 border-t border-[#F0DFC8]">
        <div className="flex-1 bg-white border border-[#F0DFC8] rounded-full px-3 py-1.5 text-[7px] text-[#C4845A]">
          Type a message…
        </div>
        <div className="w-6 h-6 rounded-full bg-[#F5C842] flex items-center justify-center text-[9px]">➤</div>
      </div>
    </PhoneShell>
  )
}

/* ─── Screen 4 : Plan your walk ─── */
function MapScreen() {
  return (
    <PhoneShell>
      {/* Status bar */}
      <div className="flex justify-between items-center px-4 pb-2 text-[9px] font-bold text-[#3D2314]">
        <span>9:41</span>
        <div className="flex gap-1 items-center"><span>●●●</span><span>🔋</span></div>
      </div>

      {/* Header */}
      <div className="px-4 pb-2">
        <p className="text-[8px] text-[#7A4528] font-semibold">First walk planned 🐾</p>
        <p className="text-[12px] font-black text-[#3D2314]">Parc Monceau</p>
      </div>

      {/* Map */}
      <div className="mx-3 rounded-[18px] overflow-hidden flex-1 relative">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 260" preserveAspectRatio="xMidYMid slice">
          <rect width="200" height="260" fill="#EDD9B8" />
          <ellipse cx="100" cy="120" rx="68" ry="75" fill="#C8E6B0" />
          <ellipse cx="100" cy="120" rx="55" ry="60" fill="#B8DDA0" />
          <line x1="0" y1="45"  x2="200" y2="45"  stroke="#D4B896" strokeWidth="6" />
          <line x1="0" y1="195" x2="200" y2="195" stroke="#D4B896" strokeWidth="6" />
          <line x1="28"  y1="0" x2="28"  y2="260" stroke="#D4B896" strokeWidth="6" />
          <line x1="172" y1="0" x2="172" y2="260" stroke="#D4B896" strokeWidth="6" />
          <path
            d="M 55 195 Q 40 160 45 120 Q 50 82 75 64 Q 100 50 128 60 Q 152 72 155 102 Q 158 135 142 158 Q 126 180 100 190 Q 80 198 55 195"
            fill="none" stroke="#F5C842" strokeWidth="3.5" strokeDasharray="7,4" strokeLinecap="round"
          />
          <circle cx="55" cy="195" r="9" fill="#3D2314" />
          <text x="55" y="199" textAnchor="middle" fontSize="9" fill="white">🐾</text>
          <circle cx="100" cy="88" r="10" fill="#F5C842" stroke="#3D2314" strokeWidth="2" />
          <text x="100" y="93" textAnchor="middle" fontSize="10">📍</text>
          <circle cx="142" cy="158" r="8" fill="#E8B83A" stroke="#3D2314" strokeWidth="1.5" />
          <text x="142" y="163" textAnchor="middle" fontSize="8">🏁</text>
          {([[80,98],[120,98],[70,145],[130,145],[100,158]] as [number,number][]).map(([cx,cy], i) => (
            <text key={i} x={cx} y={cy} textAnchor="middle" fontSize="11">🌳</text>
          ))}
        </svg>
      </div>

      {/* Walk info */}
      <div className="mx-3 my-2 bg-[#3D2314] rounded-[12px] px-3 py-2 flex justify-between items-center">
        <div className="text-center">
          <p className="text-[7px] text-[rgba(253,246,236,0.6)] font-semibold">Distance</p>
          <p className="text-[10px] font-black text-[#F5C842]">2.4 km</p>
        </div>
        <div className="text-center">
          <p className="text-[7px] text-[rgba(253,246,236,0.6)] font-semibold">Duration</p>
          <p className="text-[10px] font-black text-[#F5C842]">~35 min</p>
        </div>
        <div className="text-center">
          <p className="text-[7px] text-[rgba(253,246,236,0.6)] font-semibold">Meet at</p>
          <p className="text-[10px] font-black text-[#F5C842]">10:00 AM</p>
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
    <section id="how-it-works" className="px-[10%] py-20">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center bg-[#FFF3C4] text-[#7A4528] text-[11px] font-extrabold px-[14px] py-[6px] rounded-full uppercase tracking-[0.08em] mb-4">
          {tag}
        </div>
        <h2
          className="font-black text-[#3D2314] tracking-[-0.04em] leading-[1.1]"
          style={{ fontSize: "clamp(28px, 4vw, 46px)" }}
        >
          {headline}
        </h2>
      </div>

      {/* 4 phones grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 items-end max-w-5xl mx-auto">
        {steps.map((step, i) => (
          <div key={i} className={`flex flex-col items-center gap-4 ${i === 1 || i === 2 ? "lg:-translate-y-6" : ""}`}>
            {/* Step number + title above phone */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#F5C842] text-[#3D2314] text-[16px] font-black mb-2">
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="text-[13px] font-extrabold text-[#3D2314] leading-tight">{step.title}</p>
            </div>

            {/* Phone */}
            {screens[i]}

            {/* Description below phone */}
            <p className="text-[12px] text-[#7A4528] leading-relaxed text-center max-w-[180px]">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
