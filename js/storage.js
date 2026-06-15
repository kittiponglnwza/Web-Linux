/* js/storage.js */

// คีย์หลักที่ใช้บันทึกใน localStorage
const STORAGE_KEYS = {
    XP: 'linux_quest_xp',
    UNLOCKED_CHAPTERS: 'linux_quest_unlocked_chapters',
    COMPLETED_QUESTS: 'linux_quest_completed_quests'
};

/**
 * เริ่มต้นตั้งค่าระบบเซฟเกม (ถ้ายังไม่เคยมีข้อมูลมาก่อน)
 */
function initStorage() {
    if (localStorage.getItem(STORAGE_KEYS.XP) === null) {
        localStorage.setItem(STORAGE_KEYS.XP, '0');
    }
    if (localStorage.getItem(STORAGE_KEYS.UNLOCKED_CHAPTERS) === null) {
        // เริ่มต้นให้เปิดแค่ Chapter 1 ("ch1") เท่านั้นที่เหลือล็อกไว้ก่อน
        localStorage.setItem(STORAGE_KEYS.UNLOCKED_CHAPTERS, JSON.stringify(['ch1']));
    }
    if (localStorage.getItem(STORAGE_KEYS.COMPLETED_QUESTS) === null) {
        localStorage.setItem(STORAGE_KEYS.COMPLETED_QUESTS, JSON.stringify([]));
    }
}

/**
 * ดึงคะแนน XP ทั้งหมดปัจจุบัน
 */
function getXP() {
    return parseInt(localStorage.getItem(STORAGE_KEYS.XP)) || 0;
}

/**
 * บันทึกหรือเพิ่มคะแนน XP
 * @param {number} amount - จำนวน XP ที่ต้องการเพิ่ม
 */
function addXP(amount) {
    const currentXp = getXP();
    const newXp = currentXp + amount;
    localStorage.setItem(STORAGE_KEYS.XP, newXp.toString());
    return newXp;
}

/**
 * ดึงรายชื่อ Chapter ID ที่ปลดล็อกแล้วทั้งหมด (คืนค่าเป็น Array)
 */
function getUnlockedChapters() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.UNLOCKED_CHAPTERS)) || ['ch1'];
    } catch (e) {
        return ['ch1'];
    }
}

/**
 * สั่งปลดล็อก Chapter ใหม่
 * @param {string} chapterId - ID ของบทเรียน เช่น 'ch2'
 */
function unlockChapter(chapterId) {
    const unlocked = getUnlockedChapters();
    if (!unlocked.includes(chapterId)) {
        unlocked.push(chapterId);
        localStorage.setItem(STORAGE_KEYS.UNLOCKED_CHAPTERS, JSON.stringify(unlocked));
    }
}

/**
 * ดึงรายชื่อ Quest ID ที่ทำสำเร็จแล้วทั้งหมด
 */
function getCompletedQuests() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPLETED_QUESTS)) || [];
    } catch (e) {
        return [];
    }
}

/**
 * บันทึกว่าทำเควสนี้ผ่านแล้ว
 * @param {string} questId - ID ของโจทย์ เช่น 'q1_1'
 */
function completeQuest(questId) {
    const completed = getCompletedQuests();
    if (!completed.includes(questId)) {
        completed.push(questId);
        localStorage.setItem(STORAGE_KEYS.COMPLETED_QUESTS, JSON.stringify(completed));
    }
}

/**
 * ล้างเซฟเกมทั้งหมด (เผื่อทำปุ่ม Reset Game ในหน้า Profile)
 */
function resetGameProgress() {
    localStorage.removeItem(STORAGE_KEYS.XP);
    localStorage.removeItem(STORAGE_KEYS.UNLOCKED_CHAPTERS);
    localStorage.removeItem(STORAGE_KEYS.COMPLETED_QUESTS);
    initStorage();
}

// เรียกใช้เพื่อตรวจสอบและสร้างเซฟตั้งแต่วินาทีแรกที่โหลดไฟล์นี้เข้ามา
initStorage();