import fs from 'fs';
import path from 'path';
import { translate } from '@vitalets/google-translate-api';
import pLimit from 'p-limit';

const enBase = {
  nav: {
    main: "Main",
    extra: "Extra Deck",
    banished: "Banished Monsters",
    help: "Help",
    about: "About",
    install: "Install Offline App"
  },
  deck: {
    extra_title: "Extra Deck Monsters",
    extra_sub: "Select the levels/ranks available in your Extra Deck",
    banished_title: "Banished Monsters",
    banished_sub: "Select previously banished SEC targets",
    space: "Extra Deck Space:",
    done: "Done",
    share: "Share Extra Deck Setup",
    copied: "Copied!",
    reset: "Reset Banished",
    xyz_sel: "Xyz Monster Rank Selection",
    fusion_sel: "Fusion Monster Level Selection"
  },
  home: {
    title: "Simultaneous Equation Cannon Calculator",
    total_cards: "Total Cards",
    opp_hand: "Opponent hand",
    opp_field: "Opponent field",
    my_hand: "My hand",
    my_field: "My field",
    matches: "Matches",
    opp_level: "Opponent Monster Level",
    total_banish: "Total Cards to Banish",
    targets: "Banish Targets",
    send_banish_zone: "Send to Grave:",
    return_extra: "Return to Extra:",
    reset: "Reset Banished"
  },
  help: {
    tut: "Tutorials",
    usage: "Usage",
    h1: "Use the Extra Deck page to setup levels and ranks available.",
    h2: "Count the number of cards:",
    h3: "in your opponent's hand",
    h4: "on your opponent's side of the field",
    h5: "in your hand",
    h6: "on your side of the field",
    h7: "Add those numbers together. This is the total cards.",
    h8: "The opponent has monsters on the field that are not Link monsters, with a rank/level in the data. This is the monster level to match.",
    h9: "On the main screen of this app, you can see in every row:",
    h10: "monster level to match",
    h11: "followed by a list of total cards",
    h12: "If SEC resolves and at that moment:",
    h13: "A monster with level to match is still on the field and",
    h14: "the current total cards is still on the right side of that monster level to match",
    h15: "then you can banish your opponent's entire field.",
    h16: "If you click on the total cards button, you will see exactly what to send and what to return from the banish zone.",
    h17: "If you activate a second SEC, the monsters to send and to return do not have to be the same.",
    h18: "Use the Banished Monsters page to define the previously banished monsters."
  },
  about: {
    title: "About",
    desc: "This app is an open-source project.",
    github: "Check out the code or contribute on GitHub:",
    version: "Version"
  }
};

const overrides = {
  ja: {
    "nav.extra": "エクストラデッキ",
    "nav.banished": "除外されたモンスター",
    "deck.extra_title": "エクストラデッキのモンスター",
    "deck.banished_title": "除外されたモンスター",
    "deck.xyz_sel": "エクシーズモンスターのランク",
    "deck.fusion_sel": "融合モンスターのレベル",
    "deck.reset": "除外リセット",
    "home.title": "連立方程式キャノン 電卓",
    "home.send_banish_zone": "墓地へ送る:",
    "home.return_extra": "エクストラに戻す:",
    "home.opp_level": "相手モンスターのレベル",
  },
  de: {
    "nav.extra": "Extra Deck",
    "nav.banished": "Verbannte Monster",
    "deck.extra_title": "Extra Deck Monster",
    "deck.banished_title": "Verbannte Monster",
    "deck.xyz_sel": "Xyz-Monster Rang",
    "deck.fusion_sel": "Fusionsmonster Stufe",
    "home.title": "Simultangleichung-Kanonen Rechner",
    "home.send_banish_zone": "Auf den Friedhof legen:",
    "home.return_extra": "Ins Extra Deck zurücklegen:",
  },
  fr: {
    "nav.extra": "Extra Deck",
    "nav.banished": "Monstres Bannis",
    "deck.extra_title": "Monstres de l'Extra Deck",
    "deck.banished_title": "Monstres Bannis",
    "deck.xyz_sel": "Monstres Xyz (Rang)",
    "deck.fusion_sel": "Monstres Fusion (Niveau)",
    "home.title": "Calculatrice Canons d'Équations Simultanées",
    "home.send_banish_zone": "Envoyer au Cimetière:",
    "home.return_extra": "Renvoyer à l'Extra Deck:",
  },
  it: {
    "nav.extra": "Extra Deck",
    "nav.banished": "Mostri Banditi",
    "deck.extra_title": "Mostri Extra Deck",
    "deck.banished_title": "Mostri Banditi",
    "deck.xyz_sel": "Rango Mostro Xyz",
    "deck.fusion_sel": "Livello Mostro Fusione",
    "home.title": "Calcolatore Cannoni a Equazioni Simultanee",
    "home.send_banish_zone": "Manda al Cimitero:",
    "home.return_extra": "Fai ritornare nell'Extra Deck:",
  },
  es: {
    "nav.extra": "Deck Extra",
    "nav.banished": "Monstruos Desterrados",
    "deck.extra_title": "Monstruos del Deck Extra",
    "deck.banished_title": "Monstruos Desterrados",
    "deck.xyz_sel": "Rango de Monstruos Xyz",
    "deck.fusion_sel": "Nivel de Monstruos de Fusión",
    "home.title": "Calculadora de Cañones de Ecuaciones Simultáneas",
    "home.send_banish_zone": "Mandar al Cementerio:",
    "home.return_extra": "Devolver al Deck Extra:",
  },
  pt: {
    "nav.extra": "Deck Adicional",
    "nav.banished": "Monstros Banidos",
    "deck.extra_title": "Monstros do Deck Adicional",
    "deck.banished_title": "Monstros Banidos",
    "deck.xyz_sel": "Classe de Monstros Xyz",
    "deck.fusion_sel": "Nível de Monstros de Fusão",
    "home.title": "Calculadora Canhões de Equações Simultâneas",
    "home.send_banish_zone": "Enviar para o Cemitério:",
    "home.return_extra": "Devolver ao Deck Adicional:",
  },
  ko: {
    "nav.extra": "엑스트라 덱",
    "nav.banished": "제외된 몬스터",
    "deck.extra_title": "엑스트라 덱 몬스터",
    "deck.banished_title": "제외된 몬스터",
    "deck.xyz_sel": "엑시즈 몬스터 랭크",
    "deck.fusion_sel": "융합 몬스터 레벨",
    "home.title": "연립방정식 캐논 계산기",
    "home.send_banish_zone": "묘지로 보낸다:",
    "home.return_extra": "엑스트라 덱으로 되돌린다:",
  },
  'zh-CN': {
    "nav.extra": "额外卡组",
    "nav.banished": "除外区的怪兽",
    "deck.extra_title": "额外卡组怪兽",
    "deck.banished_title": "除外区的怪兽",
    "deck.xyz_sel": "超量怪兽阶级",
    "deck.fusion_sel": "融合怪兽等级",
    "home.title": "联立方程式加农炮计算器",
    "home.send_banish_zone": "送去墓地:",
    "home.return_extra": "回到额外卡组:",
  }
};

const topLanguages = [
  'en', 'es', 'zh-CN', 'hi', 'bn', 'pt', 'ru', 'ja', 'de', 'fr',
  'it', 'ko', 'ar', 'id', 'ur', 'tr', 'vi', 'pl', 'th', 'nl'
];

async function translateObj(obj, langCode) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object') {
      result[key] = await translateObj(value, langCode);
    } else {
      try {
        const res = await translate(value, { to: langCode });
        result[key] = res.text;
      } catch (e) {
        console.error(`Error translating ${value} to ${langCode}`);
        result[key] = value;
      }
    }
  }
  return result;
}

function applyOverrides(obj, overrideMap, pathStr = "") {
  if (!overrideMap) return obj;
  const result = { ...obj };
  for (const key of Object.keys(result)) {
    const fullPath = pathStr ? `${pathStr}.${key}` : key;
    if (typeof result[key] === 'object') {
      result[key] = applyOverrides(result[key], overrideMap, fullPath);
    } else if (overrideMap[fullPath]) {
      result[key] = overrideMap[fullPath];
    }
  }
  return result;
}

async function main() {
  const limit = pLimit(2); // Prevent rate limiting
  const promises = topLanguages.map(lang => limit(async () => {
    console.log(`Processing ${lang}...`);
    let translated;
    if (lang === 'en') {
      translated = JSON.parse(JSON.stringify(enBase));
    } else {
      translated = await translateObj(enBase, lang);
    }

    // Apply YGO specific overrides
    if (overrides[lang]) {
      translated = applyOverrides(translated, overrides[lang]);
    }

    const dir = path.join(process.cwd(), 'src', 'locales', lang);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'translation.json'), JSON.stringify(translated, null, 2));
    console.log(`Saved ${lang}.`);
  }));

  await Promise.all(promises);
  console.log('All translations generated!');
}

main().catch(console.error);
