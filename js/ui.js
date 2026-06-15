/* js/ui.js */

// ฟังก์ชันดึงข้อมูลจากไฟล์ JSON (Helper Function)
async function fetchData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(`ไม่สามารถโหลดข้อมูลจาก ${url} ได้:`, error);
        return null;
    }
}

/**
 * อัปเดตข้อมูล Rank และ XP ทั่วทั้งหน้าเว็บ (Navbar + Home Dashboard)
 */
async function updateGlobalStatus() {
    const currentXp = getXP(); // ดึงมาจาก storage.js
    const ranks = await fetchData('data/ranks.json');
    
    if (!ranks) return;

    // หา Rank ปัจจุบันของผู้เล่นตามเกณฑ์ XP
    let currentRank = ranks[0];
    let nextRank = null;

    for (let i = 0; i < ranks.length; i++) {
        if (currentXp >= ranks[i].minXp) {
            currentRank = ranks[i];
            nextRank = ranks[i + 1] || null; // Rank ถัดไป (ถ้ามี)
        }
    }

    // 1. อัปเดตข้อมูลบน Navbar (ถ้ามี Element นั้นอยู่ในหน้าปัจจุบัน)
    const navRank = document.getElementById('nav-rank');
    const navXp = document.getElementById('nav-xp');
    if (navRank) navRank.innerText = currentRank.name;
    if (navXp) navXp.innerText = `${currentXp} XP`;

    // 2. อัปเดตข้อมูลบนหน้าแรก Index.html (ถ้ามี Element)
    const homeRank = document.getElementById('home-rank');
    const homeXp = document.getElementById('home-xp');
    if (homeRank) homeRank.innerText = currentRank.name;
    if (homeXp) homeXp.innerText = currentXp;

    // 3. คำนวณและอัปเดตหลอด Progress Bar ไปยัง Rank ถัดไป
    const progressBar = document.getElementById('rank-progress');
    if (progressBar) {
        if (nextRank) {
            const xpInCurrentLevel = currentXp - currentRank.minXp;
            const xpRequiredForNextLevel = nextRank.minXp - currentRank.minXp;
            const progressPercent = Math.min((xpInCurrentLevel / xpRequiredForNextLevel) * 100, 100);
            progressBar.style.width = `${progressPercent}%`;
        } else {
            // ถ้าตันแร็งค์สูงสุดแล้ว ให้หลอดเต็ม 100%
            progressBar.style.width = '100%';
        }
    }
}

/**
 * ดึงข้อมูลด่านทั้งหมดมาร้อยเรียงแสดงผลในหน้า chapters.html
 */
async function renderChapterMap() {
    const container = document.getElementById('chapters-container');
    if (!container) return; // ถ้าไม่ได้อยู่หน้า chapters.html ให้ข้ามฟังก์ชันนี้ไป

    const chapters = await fetchData('data/chapters.json');
    const unlockedChapters = getUnlockedChapters(); // ดึง Array ด่านที่ปลดล็อกแล้วจาก storage.js
    
    if (!chapters) return;

    container.innerHTML = ''; // ล้าง Loading text หรือข้อมูลเก่าออกก่อน

    chapters.forEach((ch) => {
        let statusClass = 'locked';
        let badgeText = '🔒 Locked';
        let isCurrent = false;

        // เช็กสถานะของด่านปัจจุบัน
        if (unlockedChapters.includes(ch.id)) {
            // ถ้าเป็นด่านล่าสุดที่ปลดล็อก (ตัวสุดท้ายใน Array ที่ปลดล็อก)
            if (unlockedChapters[unlockedChapters.length - 1] === ch.id) {
                statusClass = 'current';
                badgeText = '▶   Current';
                isCurrent = true;
            } else {
                statusClass = 'done';
                badgeText = '✔  Done';
            }
        }

        // สร้างการ์ด HTML ของแต่ละ Chapter
        const card = document.createElement('div');
        card.className = `card chapter-card ${statusClass}`;
        
        // กำหนดปุ่มและลิงก์ตามสถานะ
        let actionBtn = '';
        if (statusClass === 'locked') {
            actionBtn = `<button class="btn btn-secondary" style="width: 100%; cursor: not-allowed;" disabled>ยังไม่ปลดล็อก</button>`;
        } else if (isCurrent) {
            actionBtn = `<a href="learn.html?id=${ch.id}" class="btn btn-primary" style="width: 100%;">ลุยเลย</a>`;
        } else {
            actionBtn = `<a href="learn.html?id=${ch.id}" class="btn btn-secondary" style="width: 100%;">ทบทวนบทเรียน</a>`;
        }

        card.innerHTML = `
            <span class="badge chapter-badge">${badgeText}</span>
            <p style="color: var(--primary); font-size: 0.85rem; font-weight: bold;">CHAPTER ${ch.number}</p>
            <h4 style="margin-top: 0.25rem; margin-bottom: 0.5rem;">${ch.title}</h4>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">${ch.description}</p>
            ${actionBtn}
        `;

        container.appendChild(card);
    });
}

// สั่งให้ระบบทำงานทันทีเมื่อ DOM โหลดเสร็จเรียบร้อย
document.addEventListener('DOMContentLoaded', () => {
    updateGlobalStatus();
    renderChapterMap();
});