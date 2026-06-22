import fs from 'fs';
import path from 'path';

const dict = {
  es: {
    nav: { main: "Página Principal", banished: "Zona de Destierro" },
    deck: { banished_sub: "Selecciona los Niveles/Rangos desterrados previamente" },
    home: { title: "Calculadora de Cañones de Ecuaciones Simultáneas", send_banish_zone: "Desterrar:", return_extra: "Devolver:", switch_list: "Vista de Lista", switch_grid: "Vista de Tabla" },
    help: { h1: "Usa la página del Deck Extra para configurar los Niveles/Rangos disponibles.", h8: "El oponente tiene monstruos en el campo que no son de Enlace, con un Rango/Nivel. Este es el nivel a coincidir.", h12: "Si Cañones de Ecuaciones Simultáneas se resuelve y en ese momento:", h17: "Si activas un segundo Cañones de Ecuaciones Simultáneas, los monstruos a enviar y devolver no tienen que ser los mismos.", h18: "Usa la página de la Zona de Destierro para definir los monstruos desterrados." }
  },
  fr: {
    nav: { main: "Page Principale", banished: "Zone de Bannissement" },
    deck: { banished_sub: "Sélectionnez les Niveaux/Rangs précédemment bannis" },
    home: { title: "Calculatrice Canons d'Équations Simultanées", send_banish_zone: "Bannir:", return_extra: "Retourner:", switch_list: "Vue en Liste", switch_grid: "Vue en Tableau" },
    help: { h1: "Utilisez la page Extra Deck pour configurer les Niveaux/Rangs disponibles.", h8: "L'adversaire a des monstres sur le terrain qui ne sont pas Lien, avec un Rang/Niveau. C'est le niveau à faire correspondre.", h12: "Si Canons d'Équations Simultanées se résout et à ce moment-là:", h17: "Si vous activez un deuxième Canons d'Équations Simultanées, les monstres à envoyer et à retourner n'ont pas besoin d'être les mêmes.", h18: "Utilisez la page Zone de Bannissement pour définir les monstres bannis." }
  },
  it: {
    nav: { main: "Pagina Principale", banished: "Zona Bandita" },
    deck: { banished_sub: "Seleziona i Livelli/Rango precedentemente banditi" },
    home: { title: "Calcolatore Cannoni a Equazione Simultanea", send_banish_zone: "Bandire:", return_extra: "Restituire:", switch_list: "Vista Elenco", switch_grid: "Vista Tabella" },
    help: { h1: "Usa la pagina Extra Deck per impostare i Livelli/Rango disponibili.", h8: "L'avversario ha mostri sul campo che non sono Link, con un Rango/Livello. Questo è il livello da far corrispondere.", h12: "Se Cannoni a Equazione Simultanea si risolve e in quel momento:", h17: "Se attivi un secondo Cannoni a Equazione Simultanea, i mostri da inviare e restituire non devono essere gli stessi.", h18: "Usa la pagina Zona Bandita per definire i mostri precedentemente banditi." }
  },
  pt: {
    nav: { main: "Página Principal", banished: "Zona de Banimento" },
    deck: { banished_sub: "Selecione os Níveis/Classes previamente banidos" },
    home: { title: "Calculadora de Canhões de Equações Simultâneas", send_banish_zone: "Banir:", return_extra: "Devolver:", switch_list: "Exibição em Lista", switch_grid: "Exibição em Tabela" },
    help: { h1: "Use a página do Deck Adicional para configurar os Níveis/Classes disponíveis.", h8: "O oponente tem monstros no campo que não são Link, com uma Classe/Nível. Este é o nível a corresponder.", h12: "Se Canhões de Equações Simultâneas for resolvido e naquele momento:", h17: "Se você ativar um segundo Canhões de Equações Simultâneas, os monstros para enviar e devolver não precisam ser os mesmos.", h18: "Use a página da Zona de Banimento para definir os monstros banidos." }
  },
  nl: {
    nav: { main: "Hoofdpagina", banished: "Verbannen Zone" },
    deck: { banished_sub: "Selecteer de eerder verbannen Niveaus/Rangen" },
    home: { title: "Simultane Vergelijkingen Kanonnen Calculator", send_banish_zone: "Verbannen:", return_extra: "Terugkeren:", switch_list: "Lijstweergave", switch_grid: "Tabelweergave" },
    help: { h1: "Gebruik de Extra Deck-pagina om de beschikbare Niveaus/Rangen in te stellen.", h8: "De tegenstander heeft monsters op het veld die geen Link-monsters zijn, met een Rang/Niveau. Dit is het niveau dat overeen moet komen.", h12: "Als Simultane Vergelijkingen Kanonnen wordt opgelost en op dat moment:", h17: "Als je een tweede Simultane Vergelijkingen Kanonnen activeert, hoeven de monsters om te sturen en terug te sturen niet hetzelfde te zijn.", h18: "Gebruik de Verbannen Zone-pagina om de eerder verbannen monsters te definiëren." }
  },
  pl: {
    nav: { main: "Strona Główna", banished: "Strefa Wygnania" },
    deck: { banished_sub: "Wybierz wcześniej wygnane Poziomy/Rangi" },
    home: { title: "Kalkulator Armat Równań Jednoczesnych", send_banish_zone: "Wygnać:", return_extra: "Zwrócić:", switch_list: "Widok Listy", switch_grid: "Widok Tabeli" },
    help: { h1: "Użyj strony Extra Deck, aby ustawić dostępne Poziomy/Rangi.", h8: "Przeciwnik ma na polu potwory, które nie są potworami Link, z Rangą/Poziomem. To jest poziom do dopasowania.", h12: "Jeśli Armaty Równań Jednoczesnych zostaną rozwiązane i w tym momencie:", h17: "Jeśli aktywujesz drugie Armaty Równań Jednoczesnych, potwory do wysłania i zwrotu nie muszą być takie same.", h18: "Użyj strony Strefy Wygnania, aby zdefiniować wygnane potwory." }
  },
  ru: {
    nav: { main: "Главная страница", banished: "Зона изгнания" },
    deck: { banished_sub: "Выберите ранее изгнанные уровни/ранги" },
    home: { title: "Калькулятор пушек одновременных уравнений", send_banish_zone: "Изгнать:", return_extra: "Вернуть:", switch_list: "Вид списком", switch_grid: "Вид таблицей" },
    help: { h1: "Используйте страницу Extra Deck, чтобы настроить доступные уровни/ранги.", h8: "У противника на поле есть монстры (не Link) с рангом/уровнем. Это уровень для совпадения.", h12: "Если Пушки одновременных уравнений разрешаются, и в этот момент:", h17: "Если вы активируете вторые Пушки, монстры для отправки и возврата не обязательно должны быть одинаковыми.", h18: "Используйте страницу Зоны изгнания, чтобы определить изгнанных монстров." }
  },
  ja: {
    nav: { main: "メインページ", banished: "除外ゾーン" },
    deck: { banished_sub: "以前に除外されたレベル/ランクを選択" },
    home: { title: "連立方程式キャノン計算機", send_banish_zone: "除外:", return_extra: "戻す:", switch_list: "リスト表示", switch_grid: "テーブル表示" },
    help: { h1: "エクストラデッキページを使用して、利用可能なレベル/ランクを設定します。", h8: "相手のフィールドにリンクモンスター以外のモンスター（ランク/レベルあり）がいます。これが一致するレベルです。", h12: "連立方程式キャノンが解決され、その時点で:", h17: "2つ目の連立方程式キャノンを発動する場合、送るモンスターと戻すモンスターが同じである必要はありません。", h18: "除外ゾーンページを使用して、除外されたモンスターを定義します。" }
  },
  ko: {
    nav: { main: "메인 페이지", banished: "제외 존" },
    deck: { banished_sub: "이전에 제외된 레벨/랭크 선택" },
    home: { title: "연립방정식 캐논 계산기", send_banish_zone: "제외:", return_extra: "되돌리기:", switch_list: "목록 보기", switch_grid: "표 보기" },
    help: { h1: "엑스트라 덱 페이지를 사용하여 사용 가능한 레벨/랭크를 설정합니다.", h8: "상대 필드에 링크 몬스터가 아닌 몬스터(랭크/레벨 있음)가 있습니다. 이것이 일치해야 할 레벨입니다.", h12: "연립방정식 캐논이 해결되고 그 순간:", h17: "두 번째 연립방정식 캐논을 발동하는 경우 보낼 몬스터와 되돌릴 몬스터가 같을 필요는 없습니다.", h18: "제외 존 페이지를 사용하여 제외된 몬스터를 정의합니다." }
  },
  vi: {
    nav: { main: "Trang Chính", banished: "Khu Vực Loại Bỏ" },
    deck: { banished_sub: "Chọn các Cấp Độ/Hạng đã loại bỏ trước đó" },
    home: { title: "Máy Tính Pháo Phương Trình Đồng Thời", send_banish_zone: "Loại bỏ:", return_extra: "Trả về:", switch_list: "Chế độ Danh Sách", switch_grid: "Chế độ Bảng" },
    help: { h1: "Sử dụng trang Extra Deck để thiết lập các Cấp Độ/Hạng có sẵn.", h8: "Đối thủ có quái thú trên sân không phải Link, có Cấp Độ/Hạng. Đây là cấp độ cần khớp.", h12: "Nếu Pháo Phương Trình Đồng Thời được giải quyết và tại thời điểm đó:", h17: "Nếu bạn kích hoạt Pháo Phương Trình Đồng Thời thứ hai, quái thú gửi đi và trả về không cần phải giống nhau.", h18: "Sử dụng trang Khu Vực Loại Bỏ để định nghĩa các quái thú đã loại bỏ." }
  },
  th: {
    nav: { main: "หน้าหลัก", banished: "โซนเนรเทศ" },
    deck: { banished_sub: "เลือกระดับ/แรงค์ที่ถูกเนรเทศก่อนหน้านี้" },
    home: { title: "เครื่องคิดเลขปืนใหญ่สมการ", send_banish_zone: "เนรเทศ:", return_extra: "กลับคืน:", switch_list: "มุมมองรายการ", switch_grid: "มุมมองตาราง" },
    help: { h1: "ใช้หน้า Extra Deck เพื่อตั้งค่าระดับ/แรงค์ที่มีอยู่", h8: "ฝ่ายตรงข้ามมีมอนสเตอร์ในสนามที่ไม่ใช่ Link ซึ่งมีระดับ/แรงค์ นี่คือระดับที่ต้องตรงกัน", h12: "หากปืนใหญ่สมการได้รับการแก้ไขและในขณะนั้น:", h17: "หากคุณเปิดใช้งานปืนใหญ่สมการที่สอง มอนสเตอร์ที่จะส่งและกลับคืนไม่จำเป็นต้องเหมือนกัน", h18: "ใช้หน้าโซนเนรเทศเพื่อกำหนดมอนสเตอร์ที่ถูกเนรเทศ" }
  },
  id: {
    nav: { main: "Halaman Utama", banished: "Zona Banish" },
    deck: { banished_sub: "Pilih Level/Rank yang dibanish sebelumnya" },
    home: { title: "Kalkulator Meriam Persamaan Simultan", send_banish_zone: "Banish:", return_extra: "Kembalikan:", switch_list: "Tampilan Daftar", switch_grid: "Tampilan Tabel" },
    help: { h1: "Gunakan halaman Extra Deck untuk mengatur Level/Rank yang tersedia.", h8: "Lawan memiliki monster di lapangan yang bukan Link, dengan Rank/Level. Ini adalah level untuk dicocokkan.", h12: "Jika Meriam Persamaan Simultan terselesaikan dan pada saat itu:", h17: "Jika Anda mengaktifkan Meriam Persamaan Simultan kedua, monster yang dikirim dan dikembalikan tidak harus sama.", h18: "Gunakan halaman Zona Banish untuk menentukan monster yang dibanish." }
  },
  tr: {
    nav: { main: "Ana Sayfa", banished: "Sürgün Bölgesi" },
    deck: { banished_sub: "Daha önce sürgün edilen Seviyeleri/Rütbeleri seçin" },
    home: { title: "Eşzamanlı Denklem Topları Hesap Makinesi", send_banish_zone: "Sürgün Et:", return_extra: "Geri Dön:", switch_list: "Liste Görünümü", switch_grid: "Tablo Görünümü" },
    help: { h1: "Kullanılabilir Seviyeleri/Rütbeleri ayarlamak için Ekstra Deste sayfasını kullanın.", h8: "Rakibin sahada Link olmayan, Seviyesi/Rütbesi olan canavarları var. Bu eşleşecek seviyedir.", h12: "Eşzamanlı Denklem Topları çözülürse ve o anda:", h17: "İkinci bir Eşzamanlı Denklem Topu etkinleştirirseniz, gönderilecek ve dönecek canavarların aynı olması gerekmez.", h18: "Sürgün edilen canavarları tanımlamak için Sürgün Bölgesi sayfasını kullanın." }
  },
  ar: {
    nav: { main: "الصفحة الرئيسية", banished: "منطقة الاستبعاد" },
    deck: { banished_sub: "حدد المستويات/الرتب المستبعدة سابقًا" },
    home: { title: "حاسبة مدافع المعادلات المتزامنة", send_banish_zone: "استبعاد:", return_extra: "إرجاع:", switch_list: "عرض القائمة", switch_grid: "عرض الجدول" },
    help: { h1: "استخدم صفحة Extra Deck لإعداد المستويات/الرتب المتاحة.", h8: "الخصم لديه وحوش في الملعب ليست Link، لها مستوى/رتبة. هذا هو المستوى المطلوب مطابقته.", h12: "إذا تمت تسوية مدافع المعادلات المتزامنة وفي تلك اللحظة:", h17: "إذا قمت بتنشيط مدافع المعادلات المتزامنة ثانية، لا يجب أن تكون الوحوش المرسلة والمعادة هي نفسها.", h18: "استخدم صفحة منطقة الاستبعاد لتحديد الوحوش المستبعدة." }
  },
  ur: {
    nav: { main: "مرکزی صفحہ", banished: "نکالا ہوا زون" },
    deck: { banished_sub: "پہلے سے نکالے گئے لیولز/رینک منتخب کریں" },
    home: { title: "بیک وقت مساوات توپ کیلکولیٹر", send_banish_zone: "نکالیں:", return_extra: "واپس کریں:", switch_list: "لسٹ ویو", switch_grid: "ٹیبل ویو" },
    help: { h1: "دستیاب لیولز/رینک سیٹ کرنے کے لیے ایکسٹرا ڈیک صفحہ استعمال کریں۔", h8: "مخالف کے پاس فیلڈ پر لنک کے علاوہ مونسٹر ہیں، جن کا رینک/لیول ہے۔ یہ ملانے والا لیول ہے۔", h12: "اگر بیک وقت مساوات توپ حل ہو جائے اور اس لمحے:", h17: "اگر آپ دوسری بیک وقت مساوات توپ کو فعال کرتے ہیں، تو بھیجے اور واپس کیے جانے والے مونسٹر ایک جیسے ہونا ضروری نہیں۔", h18: "نکالے گئے مونسٹرز کی وضاحت کے لیے نکالا ہوا زون صفحہ استعمال کریں۔" }
  },
  hi: {
    nav: { main: "मुख्य पृष्ठ", banished: "निर्वासित क्षेत्र" },
    deck: { banished_sub: "पहले निर्वासित स्तर/रैंक का चयन करें" },
    home: { title: "समकालिक समीकरण तोप कैलकुलेटर", send_banish_zone: "निर्वासित करें:", return_extra: "वापस करें:", switch_list: "सूची दृश्य", switch_grid: "तालिका दृश्य" },
    help: { h1: "उपलब्ध स्तर/रैंक सेट करने के लिए एक्स्ट्रा डेक पृष्ठ का उपयोग करें।", h8: "विरोधी के पास फील्ड पर लिंक के अलावा राक्षस हैं, जिनका स्तर/रैंक है। यह मिलान करने वाला स्तर है।", h12: "यदि समकालिक समीकरण तोप हल हो जाती है और उस समय:", h17: "यदि आप दूसरी समकालिक समीकरण तोप सक्रिय करते हैं, तो भेजे जाने वाले और वापस किए जाने वाले राक्षसों का समान होना आवश्यक नहीं है।", h18: "निर्वासित राक्षसों को परिभाषित करने के लिए निर्वासित क्षेत्र पृष्ठ का उपयोग करें।" }
  },
  bn: {
    nav: { main: "মূল পাতা", banished: "নির্বাসিত জোন" },
    deck: { banished_sub: "পূর্বে নির্বাসিত স্তর/র‍্যাঙ্ক নির্বাচন করুন" },
    home: { title: "যুগপৎ সমীকরণ কামান ক্যালকুলেটর", send_banish_zone: "নির্বাসিত করুন:", return_extra: "ফেরত দিন:", switch_list: "তালিকা ভিউ", switch_grid: "টেবিল ভিউ" },
    help: { h1: "উপলব্ধ স্তর/র‍্যাঙ্ক সেট করতে এক্সট্রা ডেক পৃষ্ঠা ব্যবহার করুন।", h8: "প্রতিপক্ষের মাঠে লিঙ্ক ছাড়া দানব আছে, যাদের স্তর/র‍্যাঙ্ক আছে। এটি মেলানোর স্তর।", h12: "যদি যুগপৎ সমীকরণ কামান সমাধান হয় এবং সেই মুহূর্তে:", h17: "আপনি যদি দ্বিতীয় যুগপৎ সমীকরণ কামান সক্রিয় করেন, তবে পাঠানো এবং ফেরত দেওয়ার দানব একই হওয়ার প্রয়োজন নেই।", h18: "নির্বাসিত দানব সংজ্ঞায়িত করতে নির্বাসিত জোন পৃষ্ঠা ব্যবহার করুন।" }
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
    console.log('Updated ' + lang);
  }
});
