const lessonDetails = {
    ch1: {
        intro: 'บทนี้คือพื้นฐานการเดินทางใน Terminal ก่อนพิมพ์คำสั่งใด ๆ เราควรรู้ก่อนว่าเราอยู่โฟลเดอร์ไหน มีไฟล์อะไรอยู่รอบตัว และจะย้ายไปตำแหน่งอื่นอย่างไร',
        commands: [
            ['pwd', 'แสดงตำแหน่งโฟลเดอร์ปัจจุบัน ย่อมาจาก print working directory'],
            ['ls', 'แสดงรายการไฟล์และโฟลเดอร์ในตำแหน่งปัจจุบัน'],
            ['ls -la', 'แสดงแบบละเอียด รวมไฟล์ที่ซ่อนอยู่ซึ่งขึ้นต้นด้วยจุด'],
            ['cd folder', 'ย้ายเข้าไปในโฟลเดอร์ที่ต้องการ'],
            ['cd ..', 'ถอยกลับไปโฟลเดอร์แม่หนึ่งชั้น']
        ],
        steps: [
            'เริ่มจากใช้ pwd เพื่อเช็กตำแหน่งก่อนเสมอ',
            'ใช้ ls เพื่อดูว่ามีโฟลเดอร์หรือไฟล์อะไรให้เลือก',
            'ใช้ cd ตามด้วยชื่อโฟลเดอร์เพื่อเดินเข้าไป และใช้ cd .. เพื่อถอยกลับ'
        ],
        tips: [
            'ชื่อไฟล์และโฟลเดอร์ใน Linux แยกตัวพิมพ์เล็ก/ใหญ่ เช่น Documents กับ documents เป็นคนละชื่อ',
            'ถ้าชื่อมีช่องว่าง ให้ครอบด้วยเครื่องหมาย quote เช่น cd "My Folder"'
        ],
        example: '$ pwd\n/home/student\n\n$ ls -la\nDocuments  Downloads  .config\n\n$ cd Documents\n$ pwd\n/home/student/Documents'
    },
    ch2: {
        intro: 'บทนี้เน้นการสร้าง คัดลอก ย้าย เปลี่ยนชื่อ และลบไฟล์ ซึ่งเป็นงานประจำเวลาจัดการโปรเจกต์หรือจัดระเบียบข้อมูลใน Linux',
        commands: [
            ['mkdir project', 'สร้างโฟลเดอร์ใหม่ชื่อ project'],
            ['touch note.txt', 'สร้างไฟล์ว่าง หรืออัปเดตเวลาแก้ไขของไฟล์'],
            ['cp a.txt b.txt', 'คัดลอกไฟล์จาก a.txt ไปเป็น b.txt'],
            ['mv old.txt new.txt', 'เปลี่ยนชื่อไฟล์ หรือย้ายไฟล์ไปตำแหน่งใหม่'],
            ['rm temp.log', 'ลบไฟล์ที่ไม่ต้องการ']
        ],
        steps: [
            'ใช้ mkdir เพื่อเตรียมโฟลเดอร์เก็บงาน',
            'ใช้ touch เพื่อสร้างไฟล์เปล่าสำหรับทดลอง',
            'ใช้ cp เมื่อต้องการสำรองไฟล์ก่อนแก้ไข',
            'ใช้ mv เมื่อต้องการย้ายหรือเปลี่ยนชื่อไฟล์',
            'ใช้ rm อย่างระวัง เพราะการลบใน Terminal มักไม่เข้า Recycle Bin'
        ],
        tips: [
            'ถ้าจะลบโฟลเดอร์พร้อมของข้างในต้องใช้ rm -r แต่ควรตรวจ path ให้ดีมาก ๆ',
            'ใช้ ls หลังคำสั่งสำคัญเพื่อเช็กผลลัพธ์ทันที'
        ],
        example: '$ mkdir workspace\n$ touch workspace/note.txt\n$ cp workspace/note.txt workspace/note.bak\n$ mv workspace/note.bak backup.txt\n$ rm backup.txt'
    },
    ch3: {
        intro: 'บทนี้สอนการอ่านและแก้ไขไฟล์ข้อความ เช่น config, log, note หรือไฟล์สคริปต์ คำสั่งกลุ่มนี้ช่วยให้ดูเนื้อหาเร็ว แก้ไฟล์ได้ และเพิ่มข้อความเข้าไฟล์ได้',
        commands: [
            ['cat file.txt', 'แสดงเนื้อหาไฟล์ทั้งหมดบนหน้าจอ'],
            ['head file.txt', 'ดู 10 บรรทัดแรกของไฟล์ เหมาะกับไฟล์ยาว'],
            ['tail file.txt', 'ดู 10 บรรทัดท้ายของไฟล์ เหมาะกับ log'],
            ['nano file.txt', 'เปิดไฟล์ด้วย text editor ใน Terminal'],
            ['echo "text" >> file.txt', 'เพิ่มข้อความต่อท้ายไฟล์โดยไม่ลบของเดิม']
        ],
        steps: [
            'ถ้าไฟล์สั้น ใช้ cat เพื่ออ่านทั้งหมด',
            'ถ้าไฟล์ยาว ใช้ head หรือ tail เพื่อตัดมาเฉพาะส่วนที่ต้องการ',
            'ถ้าต้องแก้ไฟล์ ใช้ nano แล้วบันทึกด้วย Ctrl+O และออกด้วย Ctrl+X',
            'ถ้าต้องเพิ่มบรรทัดใหม่ท้ายไฟล์ ใช้ echo ร่วมกับ >>'
        ],
        tips: [
            'เครื่องหมาย > จะเขียนทับไฟล์เดิม ส่วน >> จะต่อท้ายไฟล์เดิม',
            'tail -f system.log ใช้ติดตาม log แบบสด ๆ ได้'
        ],
        example: '$ cat note.txt\n$ head config.json\n$ tail system.log\n$ nano note.txt\n$ echo "flag{linux_master}" >> backup.txt'
    },
    ch4: {
        intro: 'Linux มีระบบสิทธิ์ไฟล์เพื่อกำหนดว่าใครอ่าน เขียน หรือรันไฟล์ได้ บทนี้ช่วยให้เข้าใจ chmod และ chown ซึ่งใช้บ่อยมากในงาน admin',
        commands: [
            ['ls -l', 'ดูสิทธิ์ เจ้าของ และกลุ่มของไฟล์'],
            ['chmod +x run.sh', 'เพิ่มสิทธิ์ execute ให้ไฟล์สคริปต์'],
            ['chmod 600 secure.txt', 'ให้เจ้าของอ่าน/เขียนได้เท่านั้น คนอื่นเข้าไม่ได้'],
            ['chmod 755 app.sh', 'เจ้าของทำได้ทุกอย่าง คนอื่นอ่านและรันได้'],
            ['chown user file.txt', 'เปลี่ยนเจ้าของไฟล์เป็น user ที่กำหนด']
        ],
        steps: [
            'ใช้ ls -l เพื่อดูสิทธิ์ปัจจุบันก่อนแก้',
            'ถ้าสคริปต์รันไม่ได้ ให้เพิ่มสิทธิ์ด้วย chmod +x',
            'ถ้าไฟล์เป็นความลับ ให้จำกัดสิทธิ์ด้วย chmod 600',
            'ถ้าเจ้าของไฟล์ผิด ให้ใช้ chown ปรับเจ้าของ'
        ],
        tips: [
            'r = read, w = write, x = execute',
            'ตัวเลข 7 คือ rwx, 6 คือ rw-, 5 คือ r-x, 4 คือ r--'
        ],
        example: '$ ls -l run.sh\n-rw-r--r-- 1 user user 120 run.sh\n\n$ chmod +x run.sh\n$ chmod 600 secure.txt\n$ sudo chown root system.log'
    },
    ch5: {
        intro: 'บทนี้คือเครื่องมือค้นหาและจัดการข้อความ ใช้มากกับ log, config และไฟล์ข้อมูลจำนวนมาก เพื่อหาบรรทัดสำคัญ นับจำนวน หรือเรียงข้อมูล',
        commands: [
            ['grep error server.log', 'ค้นหาบรรทัดที่มีคำว่า error'],
            ['grep -i error server.log', 'ค้นหาแบบไม่สนตัวพิมพ์เล็ก/ใหญ่'],
            ['find . -name flag.txt', 'ค้นหาไฟล์ชื่อ flag.txt จากโฟลเดอร์ปัจจุบันลงไป'],
            ['wc -l log.txt', 'นับจำนวนบรรทัดในไฟล์'],
            ['sort names.txt', 'เรียงข้อมูลในไฟล์ตามลำดับตัวอักษร']
        ],
        steps: [
            'เริ่มจากรู้ keyword หรือชื่อไฟล์ที่ต้องการหา',
            'ใช้ grep เมื่อค้นหาเนื้อหาในไฟล์',
            'ใช้ find เมื่อค้นหาตัวไฟล์หรือโฟลเดอร์',
            'ใช้ wc เมื่อต้องนับจำนวนบรรทัด คำ หรือ byte',
            'ใช้ sort เมื่อต้องเรียงผลลัพธ์ให้อ่านง่าย'
        ],
        tips: [
            'ใช้ grep -n เพื่อแสดงเลขบรรทัดของผลลัพธ์',
            'คำสั่งหลายตัวต่อกันด้วย pipe ได้ เช่น grep error server.log | wc -l'
        ],
        example: '$ grep -n error server.log\n$ find . -name flag.txt\n$ wc -l log.txt\n$ sort users.txt'
    },
    ch6: {
        intro: 'Package manager คือระบบติดตั้ง อัปเดต และลบโปรแกรม บน Ubuntu/Debian จะใช้ apt เป็นหลัก',
        commands: [
            ['sudo apt update', 'อัปเดตรายการแพ็กเกจล่าสุดจาก repository'],
            ['sudo apt install wget', 'ติดตั้งโปรแกรม wget'],
            ['sudo apt remove nginx', 'ลบโปรแกรม nginx แต่บาง config อาจยังอยู่'],
            ['sudo apt purge nginx', 'ลบโปรแกรมพร้อมไฟล์ config ที่เกี่ยวข้อง'],
            ['apt search package', 'ค้นหาแพ็กเกจจากชื่อหรือ keyword']
        ],
        steps: [
            'รัน sudo apt update ก่อนติดตั้ง เพื่อให้ข้อมูลแพ็กเกจสดใหม่',
            'ใช้ sudo apt install ตามด้วยชื่อโปรแกรม',
            'ถ้าไม่ใช้แล้ว ใช้ remove หรือ purge ตามความต้องการ',
            'ใช้ apt search เมื่อต้องการหาแพ็กเกจก่อนติดตั้ง'
        ],
        tips: [
            'sudo คือการรันคำสั่งด้วยสิทธิ์ admin',
            'อย่าติดตั้งหรือลบแพ็กเกจที่ไม่แน่ใจบนเครื่องงานจริง'
        ],
        example: '$ sudo apt update\n$ apt search wget\n$ sudo apt install wget\n$ sudo apt remove nginx'
    },
    ch7: {
        intro: 'Process คือโปรแกรมที่กำลังทำงานอยู่ บทนี้สอนดูรายการ process ดูการใช้ทรัพยากร และสั่งหยุดโปรแกรมที่ค้าง',
        commands: [
            ['ps aux', 'ดู process ทั้งหมดแบบละเอียด'],
            ['top', 'ดู process และ resource แบบ real-time'],
            ['pgrep nginx', 'หา PID จากชื่อ process'],
            ['kill 1234', 'ส่งสัญญาณให้ process หยุดแบบปกติ'],
            ['kill -9 1234', 'บังคับหยุด process ทันที']
        ],
        steps: [
            'ใช้ top เพื่อดูว่าเครื่องกำลังหนักเพราะอะไร',
            'ใช้ ps aux หรือ pgrep เพื่อหา PID',
            'ลอง kill แบบปกติก่อน',
            'ใช้ kill -9 เฉพาะตอน process ไม่ยอมหยุด'
        ],
        tips: [
            'ใน top กด q เพื่อออก',
            'PID คือหมายเลขประจำ process แต่ละครั้งที่รัน'
        ],
        example: '$ top\n$ ps aux\n$ pgrep bad_process\n$ kill 1234\n$ kill -9 9999'
    },
    ch8: {
        intro: 'บทนี้ใช้ตรวจข้อมูลระบบ เช่น เราเป็น user ไหน เครื่องใช้ kernel อะไร พื้นที่ดิสก์เหลือเท่าไร และ RAM เหลือเท่าไร',
        commands: [
            ['whoami', 'แสดงชื่อ user ปัจจุบัน'],
            ['uname -a', 'แสดงข้อมูล kernel และระบบแบบละเอียด'],
            ['df -h', 'ดูพื้นที่ดิสก์แบบอ่านง่าย'],
            ['free -h', 'ดู RAM และ swap แบบอ่านง่าย'],
            ['uptime', 'ดูเวลาที่เครื่องเปิดอยู่และ load เฉลี่ย']
        ],
        steps: [
            'ใช้ whoami เมื่อต้องยืนยันว่า login เป็น user ไหน',
            'ใช้ uname -a เมื่อต้องรายงานข้อมูลระบบ',
            'ใช้ df -h เมื่อตรวจว่าดิสก์เต็มหรือไม่',
            'ใช้ free -h เมื่อตรวจหน่วยความจำ'
        ],
        tips: [
            'ตัวเลือก -h มักหมายถึง human-readable ทำให้หน่วยอ่านง่าย',
            'ถ้าดิสก์เต็ม ระบบอาจเขียน log หรือบันทึกไฟล์ไม่ได้'
        ],
        example: '$ whoami\nstudent\n\n$ uname -a\n$ df -h\n$ free -h'
    },
    ch9: {
        intro: 'Network utilities ช่วยเช็กการเชื่อมต่อ ดาวน์โหลดไฟล์ และดึงข้อมูลจาก URL เหมาะกับการ debug internet, API และ server',
        commands: [
            ['ping 8.8.8.8', 'ทดสอบว่าส่ง packet ไปยังปลายทางได้หรือไม่'],
            ['curl https://api.github.com', 'ดึงข้อมูลจาก URL มาแสดงบนหน้าจอ'],
            ['wget URL', 'ดาวน์โหลดไฟล์จาก URL ลงเครื่อง'],
            ['curl -I URL', 'ดูเฉพาะ response header'],
            ['ip addr', 'ดู IP address ของเครื่อง']
        ],
        steps: [
            'ใช้ ping เช็กว่าปลายทางตอบสนองหรือไม่',
            'ใช้ curl เมื่ออยากดูข้อมูลจากเว็บหรือ API',
            'ใช้ wget เมื่ออยากดาวน์โหลดไฟล์เก็บไว้',
            'ใช้ ip addr เพื่อดู IP ของเครื่องตัวเอง'
        ],
        tips: [
            'บาง server ปิดการตอบ ping แม้เว็บยังใช้งานได้',
            'curl เหมาะกับ API ส่วน wget เหมาะกับดาวน์โหลดไฟล์'
        ],
        example: '$ ping 8.8.8.8\n$ curl https://api.github.com\n$ curl -I https://example.com\n$ wget https://example.com/game.sh'
    },
    ch10: {
        intro: 'Shell scripting คือการรวมคำสั่งหลายบรรทัดให้รันอัตโนมัติ ช่วยลดงานซ้ำ เช่น deploy, backup, ตรวจระบบ หรือจัดไฟล์',
        commands: [
            ['./deploy.sh', 'รันสคริปต์จากโฟลเดอร์ปัจจุบัน'],
            ['bash deploy.sh', 'รันไฟล์ด้วย bash โดยตรง'],
            ['echo $PATH', 'แสดงค่าตัวแปรสภาพแวดล้อม PATH'],
            ['VAR=value', 'กำหนดตัวแปรใน shell'],
            ['&&', 'เชื่อมคำสั่ง โดยคำสั่งถัดไปจะรันเมื่อคำสั่งก่อนหน้าสำเร็จ']
        ],
        steps: [
            'สร้างไฟล์ .sh แล้วเขียนคำสั่งเรียงทีละบรรทัด',
            'เพิ่มบรรทัดแรกเป็น #!/bin/bash เพื่อบอก interpreter',
            'ใช้ chmod +x เพื่อให้ไฟล์รันได้',
            'รันด้วย ./script.sh หรือ bash script.sh'
        ],
        tips: [
            'PATH คือรายการโฟลเดอร์ที่ shell ใช้ค้นหาโปรแกรม',
            'ใช้ && เมื่อต้องการให้หยุดทันทีถ้าคำสั่งก่อนหน้าล้มเหลว'
        ],
        example: '$ echo $PATH\n$ chmod +x deploy.sh\n$ ./deploy.sh\n$ mkdir backup && cp note.txt backup/ && echo "Backup Complete"'
    },
    ch11: {
        intro: 'บทนี้สอนการบีบอัดและแตกไฟล์ ใช้บ่อยเวลาสำรองข้อมูล ส่งโปรเจกต์ หรือดาวน์โหลด source code',
        commands: [
            ['tar -czvf project.tar.gz project', 'รวมและบีบอัดโฟลเดอร์ project เป็น tar.gz'],
            ['tar -xzvf backup.tar.gz', 'แตกไฟล์ tar.gz'],
            ['zip -r project.zip project', 'บีบอัดโฟลเดอร์เป็น zip'],
            ['unzip source.zip', 'แตกไฟล์ zip'],
            ['tar -tf file.tar.gz', 'ดูรายชื่อไฟล์ข้างใน archive โดยยังไม่แตก']
        ],
        steps: [
            'เลือกชนิด archive ที่ต้องการ เช่น tar.gz หรือ zip',
            'ใช้ tar -czvf เมื่อต้องการสร้างไฟล์ .tar.gz',
            'ใช้ tar -xzvf เมื่อต้องการแตกไฟล์ .tar.gz',
            'ใช้ zip/unzip เมื่อต้องทำงานกับไฟล์ .zip'
        ],
        tips: [
            'c = create, x = extract, z = gzip, v = verbose, f = file',
            'ตรวจรายชื่อไฟล์ก่อนแตกได้ด้วย tar -tf'
        ],
        example: '$ tar -czvf project.tar.gz project\n$ tar -tf project.tar.gz\n$ tar -xzvf backup.tar.gz\n$ unzip source.zip'
    },
    ch12: {
        intro: 'บทสุดท้ายรวมเครื่องมือ admin ที่ใช้กับเครื่องจริง เช่น SSH เข้า server ตั้ง cron job และควบคุม service ด้วย systemctl',
        commands: [
            ['ssh admin@192.168.1.50', 'เชื่อมต่อเครื่องปลายทางผ่าน SSH'],
            ['crontab -e', 'แก้ตารางงานอัตโนมัติของ user ปัจจุบัน'],
            ['systemctl status nginx', 'ดูสถานะ service nginx'],
            ['sudo systemctl start nginx', 'เริ่มการทำงานของ service'],
            ['sudo systemctl stop nginx', 'หยุดการทำงานของ service']
        ],
        steps: [
            'ใช้ ssh เมื่อต้องเข้าไปทำงานบน server ระยะไกล',
            'ใช้ systemctl status เพื่อตรวจ service ก่อน start/stop',
            'ใช้ systemctl start/stop/restart เพื่อควบคุม service',
            'ใช้ crontab -e เมื่อต้องตั้งงานให้รันตามเวลา'
        ],
        tips: [
            'ก่อน restart service สำคัญ ควรดู status และ log ก่อน',
            'cron format เรียงเป็น minute hour day month weekday command'
        ],
        example: '$ ssh admin@192.168.1.50\n$ sudo systemctl status nginx\n$ sudo systemctl start nginx\n$ crontab -e'
    }
};

function addLessonList(parent, title, items) {
    const section = document.createElement('section');
    section.className = 'lesson-section';

    const heading = document.createElement('h3');
    heading.innerText = title;

    const list = document.createElement('ul');
    list.className = 'lesson-list';

    items.forEach(item => {
        const li = document.createElement('li');
        li.innerText = item;
        list.appendChild(li);
    });

    section.appendChild(heading);
    section.appendChild(list);
    parent.appendChild(section);
}

function renderLessonContent(chapterId, fallbackDescription) {
    const content = document.getElementById('learn-content');
    const detail = lessonDetails[chapterId];
    content.innerHTML = '';

    if (!detail) {
        content.innerText = fallbackDescription;
        return fallbackDescription;
    }

    content.className = 'lesson-body';

    const intro = document.createElement('p');
    intro.className = 'lesson-intro';
    intro.innerText = detail.intro;
    content.appendChild(intro);

    const commandSection = document.createElement('section');
    commandSection.className = 'lesson-section';

    const commandHeading = document.createElement('h3');
    commandHeading.innerText = 'คำสั่งที่ต้องรู้';

    const commandGrid = document.createElement('div');
    commandGrid.className = 'command-grid';

    detail.commands.forEach(([command, explanation]) => {
        const card = document.createElement('div');
        card.className = 'command-card';

        const code = document.createElement('code');
        code.innerText = command;

        const text = document.createElement('p');
        text.innerText = explanation;

        card.appendChild(code);
        card.appendChild(text);
        commandGrid.appendChild(card);
    });

    commandSection.appendChild(commandHeading);
    commandSection.appendChild(commandGrid);
    content.appendChild(commandSection);

    addLessonList(content, 'วิธีคิดตอนทำโจทย์', detail.steps);
    addLessonList(content, 'จุดที่ควรจำ', detail.tips);

    return detail.example;
}
