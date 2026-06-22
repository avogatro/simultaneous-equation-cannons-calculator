import fs from 'fs';
import path from 'path';

const dict = {
  ko: {
    nav: { help: "도움말", about: "정보", install: "오프라인 앱 설치" },
    deck: { extra_title: "엑스트라 덱 몬스터", banished_title: "제외된 몬스터", space: "엑스트라 덱 공간:", done: "완료", share: "엑스트라 덱 설정 공유", copied: "복사됨!", reset: "제외 초기화", xyz_sel: "엑시즈 몬스터 랭크 선택", fusion_sel: "융합 몬스터 레벨 선택" },
    home: { total_cards: "총 카드 수", opp_hand: "상대 패", opp_field: "상대 필드", my_hand: "내 패", my_field: "내 필드", opp_level: "상대 몬스터 레벨", total_banish: "제외할 총 카드 수", targets: "제외 대상", reset: "제외 초기화" },
    help: { tut: "튜토리얼", usage: "사용법", h2: "카드 수 계산:", h3: "상대의 패에 있는", h4: "상대 필드에 있는", h5: "내 패에 있는", h6: "내 필드에 있는", h7: "이 숫자들을 모두 더합니다. 이것이 총 카드 수입니다.", h9: "이 앱의 메인 화면 각 행에서 다음을 볼 수 있습니다:", h10: "일치해야 할 몬스터 레벨", h11: "그 뒤를 잇는 총 카드 수 목록", h13: "일치하는 레벨을 가진 몬스터가 아직 필드에 있고,", h14: "현재 총 카드 수가 일치해야 할 몬스터 레벨의 오른쪽에 있다면,", h15: "상대 필드 전체를 제외할 수 있습니다.", h16: "총 카드 버튼을 클릭하면 제외 존으로 보낼 카드와 되돌릴 카드를 정확히 볼 수 있습니다." },
    about: { title: "정보", desc: "이 앱은 오픈 소스 프로젝트입니다.", github: "GitHub에서 코드 확인 및 기여하기:" }
  },
  nl: {
    nav: { help: "Help", about: "Over", install: "Installeer Offline App" },
    deck: { extra_title: "Extra Deck Monsters", banished_title: "Verbannen Monsters", space: "Extra Deck Ruimte:", done: "Klaar", share: "Deel Extra Deck Setup", copied: "Gekopieerd!", reset: "Reset Verbannen", xyz_sel: "Xyz Monster Rang Selectie", fusion_sel: "Fusie Monster Niveau Selectie" },
    home: { total_cards: "Totaal Kaarten", opp_hand: "Hand tegenstander", opp_field: "Veld tegenstander", my_hand: "Mijn hand", my_field: "Mijn veld", opp_level: "Niveau Monster Tegenstander", total_banish: "Totaal Te Verbannen Kaarten", targets: "Verbannen Doelen", reset: "Reset Verbannen" },
    help: { tut: "Tutorials", usage: "Gebruik", h2: "Tel het aantal kaarten:", h3: "in de hand van je tegenstander", h4: "aan de kant van je tegenstander", h5: "in je hand", h6: "aan jouw kant van het veld", h7: "Tel deze getallen bij elkaar op. Dit is het totaal aantal kaarten.", h9: "Op het hoofdscherm van deze app kun je in elke rij zien:", h10: "monster niveau om overeen te komen", h11: "gevolgd door een lijst met het totaal aantal kaarten", h13: "Een monster met een overeenkomend niveau staat nog op het veld en", h14: "het huidige totaal aantal kaarten staat nog steeds aan de rechterkant van dat monster niveau om overeen te komen", h15: "dan mag je het volledige veld van je tegenstander verbannen.", h16: "Als je op de knop 'Totaal Kaarten' klikt, zie je precies wat je naar de verbannen zone moet sturen en wat je moet terugsturen." },
    about: { title: "Over", desc: "Deze app is een open-source project.", github: "Bekijk de code of draag bij op GitHub:" }
  },
  pl: {
    nav: { help: "Pomoc", about: "O aplikacji", install: "Zainstaluj Aplikację Offline" },
    deck: { extra_title: "Potwory Extra Deck", banished_title: "Wygnane Potwory", space: "Miejsce w Extra Deck:", done: "Gotowe", share: "Udostępnij Konfigurację Extra Deck", copied: "Skopiowano!", reset: "Zresetuj Wygnane", xyz_sel: "Wybór Rangi Potwora Xyz", fusion_sel: "Wybór Poziomu Potwora Fuzji" },
    home: { total_cards: "Suma Kart", opp_hand: "Ręka przeciwnika", opp_field: "Pole przeciwnika", my_hand: "Moja ręka", my_field: "Moje pole", opp_level: "Poziom Potwora Przeciwnika", total_banish: "Suma Kart do Wygnania", targets: "Cele Wygnania", reset: "Zresetuj Wygnane" },
    help: { tut: "Samouczki", usage: "Użycie", h2: "Policz liczbę kart:", h3: "w ręce przeciwnika", h4: "po stronie pola przeciwnika", h5: "w twojej ręce", h6: "po twojej stronie pola", h7: "Dodaj te liczby. To jest całkowita liczba kart.", h9: "Na ekranie głównym tej aplikacji w każdym rzędzie zobaczysz:", h10: "poziom potwora do dopasowania", h11: "następnie listę całkowitych liczb kart", h13: "Potwór o pasującym poziomie wciąż jest na polu, a", h14: "obecna całkowita liczba kart znajduje się po prawej stronie tego poziomu potwora do dopasowania", h15: "wtedy możesz wygnać całe pole przeciwnika.", h16: "Jeśli klikniesz przycisk całkowitej liczby kart, zobaczysz dokładnie, co wysłać i co zwrócić ze strefy wygnania." },
    about: { title: "O aplikacji", desc: "Ta aplikacja to projekt open-source.", github: "Sprawdź kod lub pomóż w rozwoju na GitHub:" }
  },
  it: {
    nav: { help: "Aiuto", about: "Informazioni", install: "Installa App Offline" },
    deck: { extra_title: "Mostri Extra Deck", banished_title: "Mostri Banditi", space: "Spazio Extra Deck:", done: "Fatto", share: "Condividi Setup Extra Deck", copied: "Copiato!", reset: "Resetta Banditi", xyz_sel: "Selezione Rango Mostro Xyz", fusion_sel: "Selezione Livello Mostro Fusione" },
    home: { total_cards: "Carte Totali", opp_hand: "Mano avversario", opp_field: "Terreno avversario", my_hand: "Mia mano", my_field: "Mio terreno", opp_level: "Livello Mostro Avversario", total_banish: "Carte Totali da Bandire", targets: "Bersagli da Bandire", reset: "Resetta Banditi" },
    help: { tut: "Tutorial", usage: "Uso", h2: "Conta il numero di carte:", h3: "nella mano del tuo avversario", h4: "sul lato del terreno del tuo avversario", h5: "nella tua mano", h6: "sul tuo lato del terreno", h7: "Somma questi numeri. Questo è il totale delle carte.", h9: "Nella schermata principale di questa app, puoi vedere in ogni riga:", h10: "livello del mostro da far corrispondere", h11: "seguito da una lista di carte totali", h13: "Un mostro con il livello corrispondente è ancora sul campo e", h14: "il totale attuale delle carte è ancora sul lato destro di quel livello del mostro da far corrispondere", h15: "allora puoi bandire l'intero terreno del tuo avversario.", h16: "Se clicchi sul pulsante del totale delle carte, vedrai esattamente cosa inviare e cosa far tornare dalla zona bandita." },
    about: { title: "Informazioni", desc: "Questa app è un progetto open-source.", github: "Controlla il codice o contribuisci su GitHub:" }
  },
  id: {
    nav: { help: "Bantuan", about: "Tentang", install: "Instal Aplikasi Offline" },
    deck: { extra_title: "Monster Extra Deck", banished_title: "Monster Banish", space: "Ruang Extra Deck:", done: "Selesai", share: "Bagikan Pengaturan Extra Deck", copied: "Disalin!", reset: "Reset Banish", xyz_sel: "Pemilihan Rank Monster Xyz", fusion_sel: "Pemilihan Level Monster Fusion" },
    home: { total_cards: "Total Kartu", opp_hand: "Tangan lawan", opp_field: "Area lawan", my_hand: "Tangan saya", my_field: "Area saya", opp_level: "Level Monster Lawan", total_banish: "Total Kartu untuk Dibanish", targets: "Target Banish", reset: "Reset Banish" },
    help: { tut: "Tutorial", usage: "Penggunaan", h2: "Hitung jumlah kartu:", h3: "di tangan lawanmu", h4: "di area lapangan lawanmu", h5: "di tanganmu", h6: "di area lapanganmu", h7: "Jumlahkan angka-angka tersebut. Ini adalah total kartu.", h9: "Di layar utama aplikasi ini, Anda dapat melihat di setiap baris:", h10: "level monster yang dicocokkan", h11: "diikuti oleh daftar total kartu", h13: "Monster dengan level yang cocok masih ada di lapangan dan", h14: "total kartu saat ini masih berada di sebelah kanan level monster yang dicocokkan tersebut", h15: "maka Anda dapat membanish seluruh lapangan lawan Anda.", h16: "Jika Anda mengklik tombol total kartu, Anda akan melihat persis apa yang harus dikirim dan apa yang harus dikembalikan dari zona banish." },
    about: { title: "Tentang", desc: "Aplikasi ini adalah proyek open-source.", github: "Lihat kode atau berkontribusi di GitHub:" }
  },
  ar: {
    nav: { help: "مساعدة", about: "حول", install: "تثبيت تطبيق غير متصل" },
    deck: { extra_title: "وحوش Extra Deck", banished_title: "وحوش مستبعدة", space: "مساحة Extra Deck:", done: "تم", share: "مشاركة إعداد Extra Deck", copied: "تم النسخ!", reset: "إعادة ضبط المستبعد", xyz_sel: "تحديد رتبة وحش Xyz", fusion_sel: "تحديد مستوى وحش Fusion" },
    home: { total_cards: "إجمالي البطاقات", opp_hand: "يد الخصم", opp_field: "ملعب الخصم", my_hand: "يدي", my_field: "ملعبي", opp_level: "مستوى وحش الخصم", total_banish: "إجمالي البطاقات للاستبعاد", targets: "أهداف الاستبعاد", reset: "إعادة ضبط المستبعد" },
    help: { tut: "دروس تعليمية", usage: "الاستخدام", h2: "عد عدد البطاقات:", h3: "في يد خصمك", h4: "في جانب ملعب خصمك", h5: "في يدك", h6: "في جانب ملعبك", h7: "اجمع هذه الأرقام معًا. هذا هو إجمالي البطاقات.", h9: "في الشاشة الرئيسية لهذا التطبيق، يمكنك رؤية في كل صف:", h10: "مستوى الوحش المطلوب مطابقته", h11: "متبوعًا بقائمة بإجمالي البطاقات", h13: "وحش بمستوى مطابق لا يزال في الملعب و", h14: "إجمالي البطاقات الحالي لا يزال على الجانب الأيمن من مستوى ذلك الوحش المطلوب مطابقته", h15: "ثم يمكنك استبعاد ملعب خصمك بالكامل.", h16: "إذا نقرت على زر إجمالي البطاقات، سترى بالضبط ما يجب إرساله وما يجب إعادته من منطقة الاستبعاد." },
    about: { title: "حول", desc: "هذا التطبيق هو مشروع مفتوح المصدر.", github: "تحقق من الكود أو ساهم على GitHub:" }
  },
  ur: {
    nav: { help: "مدد", about: "کے بارے میں", install: "آف لائن ایپ انسٹال کریں" },
    deck: { extra_title: "ایکسٹرا ڈیک مونسٹرز", banished_title: "نکالے گئے مونسٹرز", space: "ایکسٹرا ڈیک جگہ:", done: "ہو گیا", share: "ایکسٹرا ڈیک سیٹ اپ شیئر کریں", copied: "کاپی ہو گیا!", reset: "نکالے گئے ری سیٹ کریں", xyz_sel: "ایکس وائی زیڈ مونسٹر رینک کا انتخاب", fusion_sel: "فیوژن مونسٹر لیول کا انتخاب" },
    home: { total_cards: "کل کارڈز", opp_hand: "مخالف کا ہاتھ", opp_field: "مخالف کا فیلڈ", my_hand: "میرا ہاتھ", my_field: "میرا فیلڈ", opp_level: "مخالف مونسٹر کا لیول", total_banish: "نکالنے کے لیے کل کارڈز", targets: "نکالنے کے اہداف", reset: "نکالے گئے ری سیٹ کریں" },
    help: { tut: "ٹیوٹوریلز", usage: "استعمال", h2: "کارڈز کی تعداد گنیں:", h3: "اپنے مخالف کے ہاتھ میں", h4: "اپنے مخالف کے فیلڈ کی طرف", h5: "اپنے ہاتھ میں", h6: "اپنے فیلڈ کی طرف", h7: "ان نمبروں کو ایک ساتھ جوڑیں۔ یہ کل کارڈز ہیں۔", h9: "اس ایپ کی مرکزی سکرین پر، آپ ہر قطار میں دیکھ سکتے ہیں:", h10: "ملانے والا مونسٹر لیول", h11: "جس کے بعد کل کارڈز کی فہرست ہے", h13: "ملنے والے لیول کا ایک مونسٹر اب بھی فیلڈ پر ہے اور", h14: "موجودہ کل کارڈز ابھی بھی اس ملانے والے مونسٹر لیول کے دائیں جانب ہیں", h15: "پھر آپ اپنے مخالف کی پوری فیلڈ نکال سکتے ہیں۔", h16: "اگر آپ کل کارڈز کے بٹن پر کلک کرتے ہیں، تو آپ کو بالکل پتہ چل جائے گا کہ نکالے گئے زون سے کیا بھیجنا ہے اور کیا واپس لانا ہے۔" },
    about: { title: "کے بارے میں", desc: "یہ ایپ ایک اوپن سورس پروجیکٹ ہے۔", github: "GitHub پر کوڈ دیکھیں یا تعاون کریں:" }
  },
  tr: {
    nav: { help: "Yardım", about: "Hakkında", install: "Çevrimdışı Uygulamayı Yükle" },
    deck: { extra_title: "Ekstra Deste Canavarları", banished_title: "Sürgün Edilen Canavarlar", space: "Ekstra Deste Alanı:", done: "Bitti", share: "Ekstra Deste Kurulumunu Paylaş", copied: "Kopyalandı!", reset: "Sürgünü Sıfırla", xyz_sel: "Xyz Canavar Rütbesi Seçimi", fusion_sel: "Füzyon Canavar Seviyesi Seçimi" },
    home: { total_cards: "Toplam Kartlar", opp_hand: "Rakibin eli", opp_field: "Rakibin sahası", my_hand: "Benim elim", my_field: "Benim saham", opp_level: "Rakip Canavar Seviyesi", total_banish: "Sürgün Edilecek Toplam Kartlar", targets: "Sürgün Hedefleri", reset: "Sürgünü Sıfırla" },
    help: { tut: "Eğitimler", usage: "Kullanım", h2: "Kart sayısını sayın:", h3: "rakibinizin elinde", h4: "rakibinizin sahasında", h5: "sizin elinizde", h6: "sizin sahanızda", h7: "Bu sayıları toplayın. Bu, toplam kart sayısıdır.", h9: "Bu uygulamanın ana ekranında her satırda şunları görebilirsiniz:", h10: "eşleşecek canavar seviyesi", h11: "ardından toplam kartların bir listesi", h13: "Eşleşen seviyeye sahip bir canavar hala sahadadır ve", h14: "mevcut toplam kart sayısı hala o eşleşecek canavar seviyesinin sağ tarafındadır", h15: "o zaman rakibinizin tüm sahasını sürgün edebilirsiniz.", h16: "Toplam kartlar düğmesine tıklarsanız, sürgün bölgesinden tam olarak ne göndereceğinizi ve ne geri döndüreceğinizi göreceksiniz." },
    about: { title: "Hakkında", desc: "Bu uygulama açık kaynaklı bir projedir.", github: "Kodu inceleyin veya GitHub'a katkıda bulunun:" }
  },
  vi: {
    nav: { help: "Trợ Giúp", about: "Giới Thiệu", install: "Cài Đặt Ứng Dụng Ngoại Tuyến" },
    deck: { extra_title: "Quái Thú Extra Deck", banished_title: "Quái Thú Bị Loại Bỏ", space: "Không Gian Extra Deck:", done: "Xong", share: "Chia Sẻ Thiết Lập Extra Deck", copied: "Đã Sao Chép!", reset: "Đặt Lại Loại Bỏ", xyz_sel: "Chọn Hạng Quái Thú Xyz", fusion_sel: "Chọn Cấp Độ Quái Thú Fusion" },
    home: { total_cards: "Tổng Số Thẻ", opp_hand: "Tay đối thủ", opp_field: "Sân đối thủ", my_hand: "Tay tôi", my_field: "Sân tôi", opp_level: "Cấp Độ Quái Thú Đối Thủ", total_banish: "Tổng Số Thẻ Cần Loại Bỏ", targets: "Mục Tiêu Loại Bỏ", reset: "Đặt Lại Loại Bỏ" },
    help: { tut: "Hướng Dẫn", usage: "Cách Dùng", h2: "Đếm số lượng thẻ:", h3: "trên tay đối thủ của bạn", h4: "trên phần sân đối thủ của bạn", h5: "trên tay bạn", h6: "trên phần sân của bạn", h7: "Cộng các số đó lại với nhau. Đây là tổng số thẻ.", h9: "Trên màn hình chính của ứng dụng này, bạn có thể thấy ở mỗi hàng:", h10: "cấp độ quái thú cần khớp", h11: "tiếp theo là danh sách tổng số thẻ", h13: "Một quái thú có cấp độ khớp vẫn còn trên sân và", h14: "tổng số thẻ hiện tại vẫn nằm bên phải của cấp độ quái thú cần khớp đó", h15: "sau đó bạn có thể loại bỏ toàn bộ sân của đối thủ.", h16: "Nếu bạn nhấp vào nút tổng số thẻ, bạn sẽ thấy chính xác những gì cần gửi và những gì cần trả về từ khu vực loại bỏ." },
    about: { title: "Giới Thiệu", desc: "Ứng dụng này là một dự án mã nguồn mở.", github: "Kiểm tra mã nguồn hoặc đóng góp trên GitHub:" }
  },
  th: {
    nav: { help: "ช่วยเหลือ", about: "เกี่ยวกับ", install: "ติดตั้งแอปออฟไลน์" },
    deck: { extra_title: "มอนสเตอร์เอ็กซ์ตร้าเด็ค", banished_title: "มอนสเตอร์ที่ถูกเนรเทศ", space: "พื้นที่เอ็กซ์ตร้าเด็ค:", done: "เสร็จสิ้น", share: "แชร์การตั้งค่าเอ็กซ์ตร้าเด็ค", copied: "คัดลอกแล้ว!", reset: "รีเซ็ตการเนรเทศ", xyz_sel: "การเลือกแรงค์มอนสเตอร์เอ็กซ์ซีส", fusion_sel: "การเลือกระดับมอนสเตอร์ฟิวชั่น" },
    home: { total_cards: "การ์ดทั้งหมด", opp_hand: "มือฝ่ายตรงข้าม", opp_field: "สนามฝ่ายตรงข้าม", my_hand: "มือของฉัน", my_field: "สนามของฉัน", opp_level: "ระดับมอนสเตอร์ฝ่ายตรงข้าม", total_banish: "การ์ดทั้งหมดที่จะเนรเทศ", targets: "เป้าหมายการเนรเทศ", reset: "รีเซ็ตการเนรเทศ" },
    help: { tut: "บทช่วยสอน", usage: "การใช้งาน", h2: "นับจำนวนการ์ด:", h3: "ในมือฝ่ายตรงข้ามของคุณ", h4: "ในสนามฝั่งตรงข้ามของคุณ", h5: "ในมือของคุณ", h6: "ในสนามฝั่งของคุณ", h7: "รวมตัวเลขเหล่านั้นเข้าด้วยกัน นี่คือการ์ดทั้งหมด", h9: "ในหน้าจอหลักของแอปนี้ คุณสามารถดูได้ในทุกแถว:", h10: "ระดับมอนสเตอร์ที่จะตรงกัน", h11: "ตามด้วยรายการการ์ดทั้งหมด", h13: "มอนสเตอร์ที่มีระดับตรงกันยังคงอยู่ในสนามและ", h14: "การ์ดทั้งหมดในปัจจุบันยังคงอยู่ทางด้านขวาของระดับมอนสเตอร์ที่จะตรงกันนั้น", h15: "จากนั้นคุณสามารถเนรเทศสนามทั้งหมดของฝ่ายตรงข้ามได้", h16: "หากคุณคลิกที่ปุ่มการ์ดทั้งหมด คุณจะเห็นสิ่งที่จะส่งและสิ่งที่จะกลับคืนจากโซนการเนรเทศอย่างชัดเจน" },
    about: { title: "เกี่ยวกับ", desc: "แอปนี้เป็นโครงการโอเพ่นซอร์ส", github: "ตรวจสอบรหัสหรือมีส่วนร่วมบน GitHub:" }
  }
};

Object.keys(dict).forEach(lang => {
  const filePath = path.join(process.cwd(), 'src', 'locales', lang, 'translation.json');
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    Object.keys(dict[lang]).forEach(section => {
      if (!data[section]) data[section] = {};
      Object.keys(dict[lang][section]).forEach(key => {
        data[section][key] = dict[lang][section][key];
      });
    });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log('Fully translated missing 80% for ' + lang);
  }
});
