เว็บ Linux Quest — การใช้งานทั้งหมด

หน้าที่มีในเว็บ
1. หน้าแรก (Home)

แสดงชื่อโปรเจกต์ + บรรยายสั้นๆ
ปุ่ม "เริ่มเรียน"
แสดง Rank และ XP ปัจจุบัน


2. หน้า Chapter Map

แสดง Chapter 1–10 เรียงกัน
แต่ละ Chapter มีสถานะ → 🔒 Locked / ✅ Done / ▶️ Current
กดเข้า Chapter ที่ Unlock แล้วได้


3. หน้า Learn (เรียนคำสั่ง)

อธิบายคำสั่งในบท
มี Code Block แสดงตัวอย่าง
ปุ่ม "ไปทำ Quest"


4. หน้า Quest (โจทย์)

แสดงโจทย์เป็นข้อความ
มีช่อง Input พิมพ์คำสั่ง
กด Submit → JS ตรวจคำตอบ
ถูก → ได้ XP + ขึ้น Quest ถัดไป
ผิด → แสดง Hint


5. หน้า Boss Fight

โจทย์ยากขึ้น รวมหลายคำสั่ง
พิมพ์ทีละบรรทัด
ได้ 50 XP เมื่อผ่าน


6. หน้า Profile / Progress

แสดง XP ทั้งหมด
แสดง Rank ปัจจุบัน
Progress Bar แต่ละ Chapter


Flow การใช้งาน
Home
 └─→ Chapter Map
       └─→ Learn (อ่านคำสั่ง)
             └─→ Quest (โจทย์ข้อ 1, 2, 3...)
                   └─→ Boss Fight
                         └─→ Chapter ถัดไป Unlock

ฟีเจอร์หลัก
ฟีเจอร์รายละเอียดTerminal UIกล่องพิมพ์คำสั่งสไตล์ TerminalAuto CheckJS ตรวจคำตอบทันทีXP SystemQuest = 10 / Boss = 50 XPRank Systemเลื่อน Rank ตาม XPLock/UnlockChapter ถัดไปเปิดเมื่อผ่านบทก่อนSave Progressเก็บใน localStorageHint Systemแสดง Hint เมื่อตอบผิด







linux-quest/
│
├── index.html                  ← หน้าแรก (Home)
├── chapters.html               ← หน้า Chapter Map
├── learn.html                  ← หน้าเรียนคำสั่ง
├── quest.html                  ← หน้าทำโจทย์ / Boss Fight
├── profile.html                ← หน้า Progress / Rank
│
├── css/
│   ├── global.css              ← Font, Color, Reset
│   ├── components.css          ← Button, Card, Badge
│   ├── terminal.css            ← Terminal Input UI
│   └── layout.css              ← Navbar, Grid, Spacing
│
├── js/
│   ├── app.js                  ← Init + Router หลัก
│   ├── storage.js              ← localStorage (XP, Progress)
│   ├── checker.js              ← ตรวจคำสั่งที่ผู้เรียนพิมพ์
│   ├── ui.js                   ← Update UI (XP bar, Rank, Lock)
│   └── router.js               ← เปลี่ยนหน้า + ส่ง param
│
└── data/
    ├── chapters.json           ← ข้อมูลทุก Chapter
    ├── quests.json             ← โจทย์ทุกข้อ + เฉลย
    └── ranks.json              ← เกณฑ์ XP แต่ละ Rank