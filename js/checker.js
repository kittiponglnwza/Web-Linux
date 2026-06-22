/* js/checker.js */

// ตัวแปรเก็บสถานะการทำเควสในหน้าปัจจุบัน
let currentChapterQuests = [];
let currentQuestIndex = 0;
let currentQuest = null;

document.addEventListener('DOMContentLoaded', async () => {
    const chapterId = getURLParam('id'); // ดึงไอดีด่านจาก URL
    if (!chapterId) {
        window.location.href = 'chapters.html';
        return;
    }

    // 1. โหลดโจทย์ทั้งหมดและกรองเอาเฉพาะของ Chapter นี้
    await loadQuestsForChapter(chapterId);

    // 2. ตั้งค่าดักจับการกดปุ่ม Enter ในช่อง Input ของ Terminal
    const inputField = document.getElementById('terminal-input-field');
    if (inputField) {
        inputField.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                handleCommandSubmit(this.value);
            }
        });
    }
});

/**
 * ดึงข้อมูลโจทย์จาก quests.json และคัดเฉพาะข้อที่ตรงกับ Chapter ปัจจุบัน
 */
async function loadQuestsForChapter(chapterId) {
    try {
        const response = await fetch('data/quests.json');
        const allQuests = await response.json();
        
        // กรองเฉพาะเควสของบทนี้
        currentChapterQuests = allQuests.filter(q => q.chapterId === chapterId);

        if (currentChapterQuests.length === 0) {
            await showAppAlert('ไม่พบโจทย์ในบทนี้ ระบบกำลังพากลับหน้าแผนที่', {
                title: 'ไม่พบโจทย์',
                icon: '!'
            });
            window.location.href = 'chapters.html';
            return;
        }

        // ค้นหาเควสแรกที่ผู้เล่นยังทำไม่ผ่านในบทนี้
        const completedQuests = getCompletedQuests(); // ดึงมาจาก storage.js
        const firstUncompletedIndex = currentChapterQuests.findIndex(q => !completedQuests.includes(q.id));

        // ถ้าทำผ่านหมดแล้ว ให้เริ่มข้อแรกใหม่ (สำหรับกลับมาเล่นซ้ำ) หรือตั้งข้อสุดท้าย
        if (firstUncompletedIndex === -1) {
            currentQuestIndex = 0;
        } else {
            currentQuestIndex = firstUncompletedIndex;
        }

        renderQuest();
    } catch (error) {
        console.error('โหลดข้อมูลเควสล้มเหลว:', error);
    }
}

/**
 * แสดงผลข้อมูลโจทย์ปัจจุบันขึ้นบนหน้าจอฝั่งซ้าย
 */
function renderQuest() {
    currentQuest = currentChapterQuests[currentQuestIndex];
    
    const titleEl = document.getElementById('quest-title');
    const questionEl = document.getElementById('quest-question');
    const typeBadge = document.getElementById('quest-type-badge');
    const hintBox = document.getElementById('quest-hint-box');

    if (!currentQuest) return;

    titleEl.innerText = currentQuest.title;
    questionEl.innerText = currentQuest.question;
    
    // รีเซ็ตและซ่อนกล่องคำใบ้ของข้อเก่าก่อน
    hintBox.style.display = 'none';

    // เปลี่ยนสีและข้อความของป้ายตามประเภท (Quest ปกติ หรือ Boss Fight)
    if (currentQuest.type === 'boss') {
        typeBadge.innerText = '🔥 BOSS FIGHT (50 XP)';
        typeBadge.style.backgroundColor = 'rgba(239, 68, 68, 0.2)'; // สีแดงดุดัน
        typeBadge.style.color = '#f87171';
    } else {
        typeBadge.innerText = '⚔️ QUEST (10 XP)';
        typeBadge.style.backgroundColor = 'rgba(16, 185, 129, 0.15)'; // สีเขียวปกติ
        typeBadge.style.color = 'var(--primary)';
    }
}

/**
 * ประมวลผลคำสั่งที่ผู้เล่นพิมพ์ส่งเข้ามา
 */
function handleCommandSubmit(userInput) {
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;

    const historyContainer = document.getElementById('terminal-history');
    const inputField = document.getElementById('terminal-input-field');

    // 1. พิมพ์คำสั่งที่ผู้เล่นป้อนลงไปใน Terminal Log ประวัติ
    historyContainer.innerHTML += `\n<span class="prompt">guest@linuxquest:~$</span> <span style="color:#ffffff">${trimmedInput}</span>`;

    // 2. ตรวจสอบคำตอบ (ล้างช่องว่างส่วนเกินเพื่อป้องกันการพิมพ์เว้นวรรคแปลกๆ)
    // ลินุกซ์พิมพ์เล็ก-ใหญ่มีผล (Case-sensitive) ดังนั้นจะไม่แปลง lowerCase มั่วซั่ว
    const isCorrect = currentQuest.answers.includes(trimmedInput);

    if (isCorrect) {
        // --- กรณีตอบถูก ---
        const xpEarned = currentQuest.type === 'boss' ? 50 : 10;
        addXP(xpEarned); // บวกแต้มในเซฟ
        completeQuest(currentQuest.id); // บันทึกว่าผ่านข้อนี้แล้ว
        addActivityLog({
            page: 'quest',
            chapterId: currentQuest.chapterId,
            questId: currentQuest.id,
            title: currentQuest.title,
            command: trimmedInput,
            result: 'success',
            xp: xpEarned
        });
        updateGlobalStatus(); // อัปเดตตัวเลขแร็งค์บน Navbar ทันที

        historyContainer.innerHTML += `\n<span style="color: #34d399">>> ถูกต้อง! ได้รับ +${xpEarned} XP</span>\n`;

        // ตรวจสอบว่านี่คือข้อสุดท้ายของ Chapter หรือยัง
        if (currentQuestIndex + 1 < currentChapterQuests.length) {
            // ไปข้อถัดไปในบทเดิม
            currentQuestIndex++;
            setTimeout(() => {
                renderQuest();
                historyContainer.innerHTML += `\n--- เริ่ม Quest ถัดไป ---`;
                historyContainer.scrollTop = historyContainer.scrollHeight; // เลื่อน Log ลงล่างสุด
            }, 1000);
        } else {
            // เคลียร์ครบทุกข้อในบทนี้แล้ว!
            historyContainer.innerHTML += `\n<span style="color: #6366f1">🎉 ยินดีด้วย! คุณเคลียร์ Chapter นี้สำเร็จแล้ว!</span>`;
            
            // ปลดล็อกบทถัดไป (เช่น ถ้าอยู่ ch1 ให้ปลดล็อก ch2)
            const currentChNum = parseInt(currentQuest.chapterId.replace('ch', ''));
            const nextChapterId = `ch${currentChNum + 1}`;
            unlockChapter(nextChapterId); 

            setTimeout(async () => {
                await showAppAlert('ยินดีด้วย! คุณผ่านบทนี้แล้ว ระบบจะพากลับไปที่แผนที่การเดินทาง', {
                    title: 'ผ่าน Chapter แล้ว',
                    icon: '✓'
                });
                window.location.href = 'chapters.html';
            }, 2000);
        }
    } else {
        // --- กรณีตอบผิด ---
        addActivityLog({
            page: 'quest',
            chapterId: currentQuest.chapterId,
            questId: currentQuest.id,
            title: currentQuest.title,
            command: trimmedInput,
            result: 'failed',
            xp: 0
        });
        historyContainer.innerHTML += `\n<span style="color: #ef4444">>> คำสั่งไม่ถูกต้อง หรือยังไม่ตรงกับเป้าหมายโจทย์ ลองใหม่อีกครั้ง!</span>`;
        
        // แสดงกล่องคำใบ้ฝั่งซ้ายมือ
        document.getElementById('quest-hint-text').innerText = currentQuest.hint;
        document.getElementById('quest-hint-box').style.display = 'block';
    }

    // ล้างช่องกรอกข้อมูลเดิมและเลื่อนหน้าจอ Terminal ลงมาล่างสุดเสมอ
    inputField.value = '';
    historyContainer.scrollTop = historyContainer.scrollHeight;
}
