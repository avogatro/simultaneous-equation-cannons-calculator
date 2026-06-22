import fs from 'fs';
import path from 'path';

const dict = {
  es: {
    home: { select_total: "Seleccionar Número Total", get_more: "para Obtener Más Información", error: "¡Monstruos del Deck Extra superan los 15!", reset_extra: "Restablecer Deck Extra" },
    about: { created_by: "Creado por", source_code: "código fuente" },
    deck: { lvl_cards: "Nivel \\ Cartas", lvl: "Niv" }
  },
  fr: {
    home: { select_total: "Sélectionnez le Nombre Total", get_more: "pour Plus d'Informations", error: "Monstres de l'Extra Deck au-dessus de 15!", reset_extra: "Réinitialiser l'Extra Deck" },
    about: { created_by: "Créé par", source_code: "code source" },
    deck: { lvl_cards: "Niv \\ Cartes", lvl: "Niv" }
  },
  it: {
    home: { select_total: "Seleziona Numero Totale", get_more: "per Ulteriori Informazioni", error: "Mostri dell'Extra Deck oltre 15!", reset_extra: "Reimposta Extra Deck" },
    about: { created_by: "Creato da", source_code: "codice sorgente" },
    deck: { lvl_cards: "Liv \\ Carte", lvl: "Liv" }
  },
  pt: {
    home: { select_total: "Selecionar Número Total", get_more: "para Obter Mais Informações", error: "Monstros do Deck Adicional acima de 15!", reset_extra: "Redefinir Deck Adicional" },
    about: { created_by: "Criado por", source_code: "código-fonte" },
    deck: { lvl_cards: "Nív \\ Cartas", lvl: "Nív" }
  },
  nl: {
    home: { select_total: "Selecteer Totaal Aantal", get_more: "voor Meer Informatie", error: "Extra Deck Monsters Boven de 15!", reset_extra: "Reset Extra Deck" },
    about: { created_by: "Gemaakt door", source_code: "broncode" },
    deck: { lvl_cards: "Niv \\ Kaarten", lvl: "Niv" }
  },
  pl: {
    home: { select_total: "Wybierz Całkowitą Liczbę", get_more: "aby Uzyskać Więcej Informacji", error: "Potwory Extra Deck Powyżej 15!", reset_extra: "Zresetuj Extra Deck" },
    about: { created_by: "Stworzone przez", source_code: "kod źródłowy" },
    deck: { lvl_cards: "Poz \\ Karty", lvl: "Poz" }
  },
  ru: {
    home: { select_total: "Выберите общее количество", get_more: "для получения информации", error: "Монстров в Extra Deck больше 15!", reset_extra: "Сбросить Extra Deck" },
    about: { created_by: "Создатель:", source_code: "исходный код" },
    deck: { lvl_cards: "Ур. \\ Карты", lvl: "Ур." }
  },
  ja: {
    home: { select_total: "合計数を選択", get_more: "して詳細情報を取得", error: "エクストラデッキのモンスターが15枚を超えています！", reset_extra: "エクストラデッキをリセット" },
    about: { created_by: "作成者：", source_code: "ソースコード" },
    deck: { lvl_cards: "レベル \\ 枚数", lvl: "レベル" }
  },
  ko: {
    home: { select_total: "총 개수 선택", get_more: "하여 더 많은 정보 확인", error: "엑스트라 덱 몬스터가 15장을 초과했습니다!", reset_extra: "엑스트라 덱 초기화" },
    about: { created_by: "제작자:", source_code: "소스 코드" },
    deck: { lvl_cards: "레벨 \\ 카드", lvl: "레벨" }
  },
  vi: {
    home: { select_total: "Chọn Tổng Số", get_more: "để Nhận Thêm Thông Tin", error: "Quái Thú Extra Deck Vượt Quá 15!", reset_extra: "Đặt Lại Extra Deck" },
    about: { created_by: "Được tạo bởi", source_code: "mã nguồn" },
    deck: { lvl_cards: "Cấp \\ Số Thẻ", lvl: "Cấp" }
  },
  th: {
    home: { select_total: "เลือกจำนวนทั้งหมด", get_more: "เพื่อดูข้อมูลเพิ่มเติม", error: "มอนสเตอร์ในเอ็กซ์ตร้าเด็คเกิน 15 ใบ!", reset_extra: "รีเซ็ตเอ็กซ์ตร้าเด็ค" },
    about: { created_by: "สร้างโดย", source_code: "ซอร์สโค้ด" },
    deck: { lvl_cards: "ระดับ \\ การ์ด", lvl: "ระดับ" }
  },
  id: {
    home: { select_total: "Pilih Jumlah Total", get_more: "untuk Info Lebih Lanjut", error: "Monster Extra Deck Lebih Dari 15!", reset_extra: "Reset Extra Deck" },
    about: { created_by: "Dibuat oleh", source_code: "kode sumber" },
    deck: { lvl_cards: "Level \\ Kartu", lvl: "Level" }
  },
  tr: {
    home: { select_total: "Toplam Sayıyı Seç", get_more: "ve Daha Fazla Bilgi Al", error: "Ekstra Deste Canavarı 15'i Aştı!", reset_extra: "Ekstra Desteyi Sıfırla" },
    about: { created_by: "Oluşturan:", source_code: "kaynak kodu" },
    deck: { lvl_cards: "Seviye \\ Kartlar", lvl: "Svy" }
  },
  ar: {
    home: { select_total: "حدد العدد الإجمالي", get_more: "للحصول على مزيد من المعلومات", error: "وحوش Extra Deck تتجاوز 15!", reset_extra: "إعادة ضبط Extra Deck" },
    about: { created_by: "أنشئت بواسطة", source_code: "كود المصدر" },
    deck: { lvl_cards: "المستوى \\ البطاقات", lvl: "المستوى" }
  },
  ur: {
    home: { select_total: "کل تعداد منتخب کریں", get_more: "مزید معلومات کے لیے", error: "ایکسٹرا ڈیک مونسٹرز 15 سے زیادہ!", reset_extra: "ایکسٹرا ڈیک ری سیٹ کریں" },
    about: { created_by: "تخلیق کردہ بذریعہ", source_code: "سورس کوڈ" },
    deck: { lvl_cards: "لیول \\ کارڈز", lvl: "لیول" }
  },
  hi: {
    home: { select_total: "कुल संख्या चुनें", get_more: "अधिक जानकारी प्राप्त करने के लिए", error: "एक्स्ट्रा डेक मॉन्स्टर 15 से अधिक!", reset_extra: "एक्स्ट्रा डेक रीसेट करें" },
    about: { created_by: "द्वारा बनाया गया", source_code: "सोर्स कोड" },
    deck: { lvl_cards: "स्तर \\ कार्ड", lvl: "स्तर" }
  },
  bn: {
    home: { select_total: "মোট সংখ্যা নির্বাচন করুন", get_more: "আরও তথ্যের জন্য", error: "এক্সট্রা ডেক দানব ১৫ এর বেশি!", reset_extra: "এক্সট্রা ডেক রিসেট করুন" },
    about: { created_by: "তৈরি করেছেন", source_code: "সোর্স কোড" },
    deck: { lvl_cards: "স্তর \\ কার্ড", lvl: "স্তর" }
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
    console.log('Updated missing keys for ' + lang);
  }
});
