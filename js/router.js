/* js/router.js */

/**
 * ฟังก์ชันช่วยดึงค่า Parameter จาก URL
 * @param {string} param - ชื่อคีย์ที่ต้องการดึง เช่น 'id'
 * @returns {string|null} ค่าที่ดึงได้จาก URL
 */
function getURLParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}