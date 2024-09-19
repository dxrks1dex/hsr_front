import { CharacterData } from "@/types/interface";

export type CharacterInfo = {
  AvatarName: {
    Hash: number;
  };
  AvatarFullName: {
    Hash: number;
  };
  Rarity: number;
  Element: string;
  AvatarBaseType: string;
  AvatarSideIconPath: string;
  ActionAvatarHeadIconPath: string;
  AvatarCutinFrontImgPath: string;
  RankIDList: number[];
  SkillList: number[];
};
//https://github.com/EnkaNetwork/API-docs/blob/master/store/hsr/honker_characters.json
export const charactersData: Record<string, CharacterInfo> = {
  "1001": {
    AvatarName: {
      Hash: -531793651,
    },
    AvatarFullName: {
      Hash: -1063124016,
    },
    Rarity: 4,
    Element: "Ice",
    AvatarBaseType: "Knight",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1001.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1001B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1001.png",
    RankIDList: [100101, 100102, 100103, 100104, 100105, 100106],
    SkillList: [100101, 100102, 100103, 100104, 100106, 100107],
  },
  "1002": {
    AvatarName: {
      Hash: -935078178,
    },
    AvatarFullName: {
      Hash: -8036553,
    },
    Rarity: 4,
    Element: "Wind",
    AvatarBaseType: "Rogue",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1002.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1002B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1002.png",
    RankIDList: [100201, 100202, 100203, 100204, 100205, 100206],
    SkillList: [100201, 100202, 100203, 100204, 100206, 100207],
  },
  "1003": {
    AvatarName: {
      Hash: 631005763,
    },
    AvatarFullName: {
      Hash: -844315511,
    },
    Rarity: 5,
    Element: "Fire",
    AvatarBaseType: "Mage",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1003.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1003B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1003.png",
    RankIDList: [100301, 100302, 100303, 100304, 100305, 100306],
    SkillList: [100301, 100302, 100303, 100304, 100306, 100307],
  },
  "1004": {
    AvatarName: {
      Hash: 227721236,
    },
    AvatarFullName: {
      Hash: -871204766,
    },
    Rarity: 5,
    Element: "Imaginary",
    AvatarBaseType: "Warlock",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1004.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1004B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1004.png",
    RankIDList: [100401, 100402, 100403, 100404, 100405, 100406],
    SkillList: [100401, 100402, 100403, 100404, 100406, 100407],
  },
  "1005": {
    AvatarName: {
      Hash: 1793805177,
    },
    AvatarFullName: {
      Hash: -1328813516,
    },
    Rarity: 5,
    Element: "Thunder",
    AvatarBaseType: "Warlock",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1005.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1005B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1005.png",
    RankIDList: [100501, 100502, 100503, 100504, 100505, 100506],
    SkillList: [100501, 100502, 100503, 100504, 100506, 100507],
  },
  "1006": {
    AvatarName: {
      Hash: 1390520650,
    },
    AvatarFullName: {
      Hash: 621775846,
    },
    Rarity: 5,
    Element: "Quantum",
    AvatarBaseType: "Warlock",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1006.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1006B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1006.png",
    RankIDList: [100601, 100602, 100603, 100604, 100605, 100606],
    SkillList: [100601, 100602, 100603, 100604, 100606, 100607],
  },
  "1008": {
    AvatarName: {
      Hash: 1840859344,
    },
    AvatarFullName: {
      Hash: 1185245652,
    },
    Rarity: 4,
    Element: "Thunder",
    AvatarBaseType: "Warrior",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1008.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1008B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1008.png",
    RankIDList: [100801, 100802, 100803, 100804, 100805, 100806],
    SkillList: [100801, 100802, 100803, 100804, 100806, 100807],
  },
  "1009": {
    AvatarName: {
      Hash: -888024011,
    },
    AvatarFullName: {
      Hash: 1138827395,
    },
    Rarity: 4,
    Element: "Fire",
    AvatarBaseType: "Shaman",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1009.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1009B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1009.png",
    RankIDList: [100901, 100902, 100903, 100904, 100905, 100906],
    SkillList: [100901, 100902, 100903, 100904, 100906, 100907],
  },
  "1013": {
    AvatarName: {
      Hash: 631005764,
    },
    AvatarFullName: {
      Hash: -683608126,
    },
    Rarity: 4,
    Element: "Ice",
    AvatarBaseType: "Mage",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1013.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1013B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1013.png",
    RankIDList: [101301, 101302, 101303, 101304, 101305, 101306],
    SkillList: [101301, 101302, 101303, 101304, 101306, 101307],
  },
  "1101": {
    AvatarName: {
      Hash: -2077674616,
    },
    AvatarFullName: {
      Hash: 1695376073,
    },
    Rarity: 5,
    Element: "Wind",
    AvatarBaseType: "Shaman",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1101.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1101B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1101.png",
    RankIDList: [110101, 110102, 110103, 110104, 110105, 110106],
    SkillList: [110101, 110102, 110103, 110104, 110106, 110107],
  },
  "1102": {
    AvatarName: {
      Hash: 651208739,
    },
    AvatarFullName: {
      Hash: -327370702,
    },
    Rarity: 5,
    Element: "Quantum",
    AvatarBaseType: "Rogue",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1102.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1102B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1102.png",
    RankIDList: [110201, 110202, 110203, 110204, 110205, 110206],
    SkillList: [110201, 110202, 110203, 110204, 110206, 110207],
  },
  "1103": {
    AvatarName: {
      Hash: -914875202,
    },
    AvatarFullName: {
      Hash: -748459673,
    },
    Rarity: 4,
    Element: "Thunder",
    AvatarBaseType: "Mage",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1103.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1103B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1103.png",
    RankIDList: [110301, 110302, 110303, 110304, 110305, 110306],
    SkillList: [110301, 110302, 110303, 110304, 110306, 110307],
  },
  "1104": {
    AvatarName: {
      Hash: 1814008153,
    },
    AvatarFullName: {
      Hash: 2027198969,
    },
    Rarity: 5,
    Element: "Ice",
    AvatarBaseType: "Knight",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1104.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1104B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1104.png",
    RankIDList: [110401, 110402, 110403, 110404, 110405, 110406],
    SkillList: [110401, 110402, 110403, 110404, 110406, 110407],
  },
  "1105": {
    AvatarName: {
      Hash: 247924212,
    },
    AvatarFullName: {
      Hash: -1244252722,
    },
    Rarity: 4,
    Element: "Physical",
    AvatarBaseType: "Priest",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1105.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1105B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1105.png",
    RankIDList: [110501, 110502, 110503, 110504, 110505, 110506],
    SkillList: [110501, 110502, 110503, 110504, 110506, 110507],
  },
  "1106": {
    AvatarName: {
      Hash: -1318159729,
    },
    AvatarFullName: {
      Hash: -562028418,
    },
    Rarity: 4,
    Element: "Ice",
    AvatarBaseType: "Warlock",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1106.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1106B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1106.png",
    RankIDList: [110601, 110602, 110603, 110604, 110605, 110606],
    SkillList: [110601, 110602, 110603, 110604, 110606, 110607],
  },
  "1107": {
    AvatarName: {
      Hash: 1410723626,
    },
    AvatarFullName: {
      Hash: 304527861,
    },
    Rarity: 5,
    Element: "Physical",
    AvatarBaseType: "Warrior",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1107.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1107B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1107.png",
    RankIDList: [110701, 110702, 110703, 110704, 110705, 110706],
    SkillList: [110701, 110702, 110703, 110704, 110706, 110707],
  },
  "1108": {
    AvatarName: {
      Hash: -867821035,
    },
    AvatarFullName: {
      Hash: -2088319272,
    },
    Rarity: 4,
    Element: "Wind",
    AvatarBaseType: "Warlock",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1108.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1108B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1108.png",
    RankIDList: [110801, 110802, 110803, 110804, 110805, 110806],
    SkillList: [110801, 110802, 110803, 110804, 110806, 110807],
  },
  "1109": {
    AvatarName: {
      Hash: 1861062320,
    },
    AvatarFullName: {
      Hash: 963907623,
    },
    Rarity: 4,
    Element: "Fire",
    AvatarBaseType: "Warrior",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1109.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1109B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1109.png",
    RankIDList: [110901, 110902, 110903, 110904, 110905, 110906],
    SkillList: [110901, 110902, 110903, 110904, 110906, 110907, 110909],
  },
  "1110": {
    AvatarName: {
      Hash: -511590674,
    },
    AvatarFullName: {
      Hash: -1401838949,
    },
    Rarity: 4,
    Element: "Quantum",
    AvatarBaseType: "Priest",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1110.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1110B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1110.png",
    RankIDList: [111001, 111002, 111003, 111004, 111005, 111006],
    SkillList: [111001, 111002, 111003, 111004, 111006, 111007],
  },
  "1111": {
    AvatarName: {
      Hash: -2077674615,
    },
    AvatarFullName: {
      Hash: 1696571191,
    },
    Rarity: 4,
    Element: "Physical",
    AvatarBaseType: "Warlock",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1111.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1111B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1111.png",
    RankIDList: [111101, 111102, 111103, 111104, 111105, 111106],
    SkillList: [111101, 111102, 111103, 111104, 111106, 111107, 111108],
  },
  "1112": {
    AvatarName: {
      Hash: 651208740,
    },
    AvatarFullName: {
      Hash: -367521998,
    },
    Rarity: 5,
    Element: "Fire",
    AvatarBaseType: "Rogue",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1112.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1112B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1112.png",
    RankIDList: [111201, 111202, 111203, 111204, 111205, 111206],
    SkillList: [111201, 111202, 111203, 111204, 111206, 111207],
  },
  "1201": {
    AvatarName: {
      Hash: -814118653,
    },
    AvatarFullName: {
      Hash: 23154468,
    },
    Rarity: 4,
    Element: "Quantum",
    AvatarBaseType: "Mage",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1201.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1201B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1201.png",
    RankIDList: [120101, 120102, 120103, 120104, 120105, 120106],
    SkillList: [120101, 120102, 120103, 120104, 120106, 120107, 120108],
  },
  "1202": {
    AvatarName: {
      Hash: 751965288,
    },
    AvatarFullName: {
      Hash: 23263934,
    },
    Rarity: 4,
    Element: "Thunder",
    AvatarBaseType: "Shaman",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1202.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1202B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1202.png",
    RankIDList: [120201, 120202, 120203, 120204, 120205, 120206],
    SkillList: [120201, 120202, 120203, 120204, 120206, 120207],
  },
  "1203": {
    AvatarName: {
      Hash: -1976918067,
    },
    AvatarFullName: {
      Hash: -1111281336,
    },
    Rarity: 5,
    Element: "Imaginary",
    AvatarBaseType: "Priest",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1203.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1203B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1203.png",
    RankIDList: [120301, 120302, 120303, 120304, 120305, 120306],
    SkillList: [120301, 120302, 120303, 120304, 120306, 120307],
  },
  "1204": {
    AvatarName: {
      Hash: -54603766,
    },
    AvatarFullName: {
      Hash: 753361161,
    },
    Rarity: 5,
    Element: "Thunder",
    AvatarBaseType: "Mage",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1204.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1204B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1204.png",
    RankIDList: [120401, 120402, 120403, 120404, 120405, 120406],
    SkillList: [120401, 120402, 120403, 120404, 120406, 120407],
  },
  "1205": {
    AvatarName: {
      Hash: 1511480175,
    },
    AvatarFullName: {
      Hash: -1273337479,
    },
    Rarity: 5,
    Element: "Wind",
    AvatarBaseType: "Warrior",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1205.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1205B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1205.png",
    RankIDList: [120501, 120502, 120503, 120504, 120505, 120506],
    SkillList: [120501, 120502, 120503, 120504, 120506, 120507, 120508],
  },
  "1206": {
    AvatarName: {
      Hash: -1217403180,
    },
    AvatarFullName: {
      Hash: -1520733615,
    },
    Rarity: 4,
    Element: "Physical",
    AvatarBaseType: "Rogue",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1206.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1206B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1206.png",
    RankIDList: [120601, 120602, 120603, 120604, 120605, 120606],
    SkillList: [120601, 120602, 120603, 120604, 120606, 120607],
  },
  "1207": {
    AvatarName: {
      Hash: 348680761,
    },
    AvatarFullName: {
      Hash: -223886223,
    },
    Rarity: 4,
    Element: "Imaginary",
    AvatarBaseType: "Shaman",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1207.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1207B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1207.png",
    RankIDList: [120701, 120702, 120703, 120704, 120705, 120706],
    SkillList: [120701, 120702, 120703, 120704, 120706, 120707],
  },
  "1208": {
    AvatarName: {
      Hash: 1558534342,
    },
    AvatarFullName: {
      Hash: 689804049,
    },
    Rarity: 5,
    Element: "Quantum",
    AvatarBaseType: "Knight",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1208.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1208B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1208.png",
    RankIDList: [120801, 120802, 120803, 120804, 120805, 120806],
    SkillList: [120801, 120802, 120803, 120804, 120806, 120807],
  },
  "1209": {
    AvatarName: {
      Hash: -1170349013,
    },
    AvatarFullName: {
      Hash: -2117315133,
    },
    Rarity: 5,
    Element: "Ice",
    AvatarBaseType: "Rogue",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1209.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1209B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1209.png",
    RankIDList: [120901, 120902, 120903, 120904, 120905, 120906],
    SkillList: [120901, 120902, 120903, 120904, 120906, 120907],
  },
  "1210": {
    AvatarName: {
      Hash: 1914764703,
    },
    AvatarFullName: {
      Hash: -1637273828,
    },
    Rarity: 4,
    Element: "Fire",
    AvatarBaseType: "Warlock",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1210.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1210B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1210.png",
    RankIDList: [121001, 121002, 121003, 121004, 121005, 121006],
    SkillList: [121001, 121002, 121003, 121004, 121006, 121007],
  },
  "1211": {
    AvatarName: {
      Hash: -814118652,
    },
    AvatarFullName: {
      Hash: 593491427,
    },
    Rarity: 5,
    Element: "Thunder",
    AvatarBaseType: "Priest",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1211.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1211B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1211.png",
    RankIDList: [121101, 121102, 121103, 121104, 121105, 121106],
    SkillList: [121101, 121102, 121103, 121104, 121106, 121107],
  },
  "1212": {
    AvatarName: {
      Hash: 751965289,
    },
    AvatarFullName: {
      Hash: -877653918,
    },
    Rarity: 5,
    Element: "Ice",
    AvatarBaseType: "Warrior",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1212.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1212B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1212.png",
    RankIDList: [121201, 121202, 121203, 121204, 121205, 121206],
    SkillList: [121201, 121202, 121203, 121204, 121206, 121207, 121209],
  },
  "1213": {
    AvatarName: {
      Hash: -1976918066,
    },
    AvatarFullName: {
      Hash: -1905195496,
    },
    Rarity: 5,
    Element: "Imaginary",
    AvatarBaseType: "Warrior",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1213.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1213B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1213.png",
    RankIDList: [121301, 121302, 121303, 121304, 121305, 121306],
    SkillList: [
      121301, 121302, 121303, 121304, 121306, 121307, 121308, 121309, 121310,
      121312,
    ],
  },
  "1214": {
    AvatarName: {
      Hash: -54603765,
    },
    AvatarFullName: {
      Hash: -2054552258,
    },
    Rarity: 4,
    Element: "Quantum",
    AvatarBaseType: "Warrior",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1214.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1214B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1214.png",
    RankIDList: [121401, 121402, 121403, 121404, 121405, 121406],
    SkillList: [121401, 121402, 121403, 121404, 121406, 121407],
  },
  "1215": {
    AvatarName: {
      Hash: 1511480176,
    },
    AvatarFullName: {
      Hash: -878473933,
    },
    Rarity: 4,
    Element: "Physical",
    AvatarBaseType: "Shaman",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1215.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1215B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1215.png",
    RankIDList: [121501, 121502, 121503, 121504, 121505, 121506],
    SkillList: [121501, 121502, 121503, 121504, 121506, 121507],
  },
  "1217": {
    AvatarName: {
      Hash: 348680762,
    },
    AvatarFullName: {
      Hash: -1850589142,
    },
    Rarity: 5,
    Element: "Wind",
    AvatarBaseType: "Priest",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1217.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1217B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1217.png",
    RankIDList: [121701, 121702, 121703, 121704, 121705, 121706],
    SkillList: [121701, 121702, 121703, 121704, 121706, 121707],
  },
  "1218": {
    AvatarName: {
      Hash: 1558534343,
    },
    AvatarFullName: {
      Hash: 1575564764,
    },
    Rarity: 5,
    Element: "Fire",
    AvatarBaseType: "Warlock",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1218.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1218B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1218.png",
    RankIDList: [121801, 121802, 121803, 121804, 121805, 121806],
    SkillList: [121801, 121802, 121803, 121804, 121806, 121807],
  },
  "1221": {
    AvatarName: {
      Hash: -814118655,
    },
    AvatarFullName: {
      Hash: 1931231335,
    },
    Rarity: 5,
    Element: "Physical",
    AvatarBaseType: "Warrior",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1221.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1221B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1221.png",
    RankIDList: [122101, 122102, 122103, 122104, 122105, 122106],
    SkillList: [122101, 122102, 122103, 122104, 122106, 122107],
  },
  "1224": {
    AvatarName: {
      Hash: -54603768,
    },
    AvatarFullName: {
      Hash: -1063124016,
    },
    Rarity: 4,
    Element: "Imaginary",
    AvatarBaseType: "Rogue",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1224.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1224B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1224.png",
    RankIDList: [122401, 122402, 122403, 122404, 122405, 122406],
    SkillList: [122401, 122402, 122403, 122404, 122406, 122407, 122408],
  },
  "1301": {
    AvatarName: {
      Hash: 1934967678,
    },
    AvatarFullName: {
      Hash: -1686189145,
    },
    Rarity: 4,
    Element: "Fire",
    AvatarBaseType: "Priest",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1301.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1301B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1301.png",
    RankIDList: [130101, 130102, 130103, 130104, 130105, 130106],
    SkillList: [130101, 130102, 130103, 130104, 130106, 130107, 130108],
  },
  "1302": {
    AvatarName: {
      Hash: -1956715091,
    },
    AvatarFullName: {
      Hash: -1699195646,
    },
    Rarity: 5,
    Element: "Physical",
    AvatarBaseType: "Mage",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1302.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1302B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1302.png",
    RankIDList: [130201, 130202, 130203, 130204, 130205, 130206],
    SkillList: [130201, 130202, 130203, 130204, 130206, 130207, 130214],
  },
  "1303": {
    AvatarName: {
      Hash: 772168264,
    },
    AvatarFullName: {
      Hash: -835139175,
    },
    Rarity: 5,
    Element: "Ice",
    AvatarBaseType: "Shaman",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1303.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1303B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1303.png",
    RankIDList: [130301, 130302, 130303, 130304, 130305, 130306],
    SkillList: [130301, 130302, 130303, 130304, 130306, 130307],
  },
  "1304": {
    AvatarName: {
      Hash: 1531683151,
    },
    AvatarFullName: {
      Hash: -107934339,
    },
    Rarity: 5,
    Element: "Imaginary",
    AvatarBaseType: "Knight",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1304.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1304B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1304.png",
    RankIDList: [130401, 130402, 130403, 130404, 130405, 130406],
    SkillList: [130401, 130402, 130403, 130404, 130406, 130407],
  },
  "1305": {
    AvatarName: {
      Hash: -34400790,
    },
    AvatarFullName: {
      Hash: -2043468308,
    },
    Rarity: 5,
    Element: "Imaginary",
    AvatarBaseType: "Rogue",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1305.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1305B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1305.png",
    RankIDList: [130501, 130502, 130503, 130504, 130505, 130506],
    SkillList: [130501, 130502, 130503, 130504, 130506, 130507],
  },
  "1306": {
    AvatarName: {
      Hash: 368883737,
    },
    AvatarFullName: {
      Hash: -1042486512,
    },
    Rarity: 5,
    Element: "Quantum",
    AvatarBaseType: "Shaman",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1306.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1306B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1306.png",
    RankIDList: [130601, 130602, 130603, 130604, 130605, 130606],
    SkillList: [130601, 130602, 130603, 130604, 130606, 130607],
  },
  "1307": {
    AvatarName: {
      Hash: -1197200204,
    },
    AvatarFullName: {
      Hash: 2001738668,
    },
    Rarity: 5,
    Element: "Wind",
    AvatarBaseType: "Warlock",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1307.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1307B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1307.png",
    RankIDList: [130701, 130702, 130703, 130704, 130705, 130706],
    SkillList: [130701, 130702, 130703, 130704, 130706, 130707],
  },
  "1308": {
    AvatarName: {
      Hash: -1150146037,
    },
    AvatarFullName: {
      Hash: 1372569644,
    },
    Rarity: 5,
    Element: "Thunder",
    AvatarBaseType: "Warlock",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1308.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1308B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1308.png",
    RankIDList: [130801, 130802, 130803, 130804, 130805, 130806],
    SkillList: [
      130801, 130802, 130803, 130804, 130806, 130807, 130814, 130815, 130816,
      130817,
    ],
  },
  "1309": {
    AvatarName: {
      Hash: 1578737318,
    },
    AvatarFullName: {
      Hash: -11289014,
    },
    Rarity: 5,
    Element: "Physical",
    AvatarBaseType: "Shaman",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1309.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1309B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1309.png",
    RankIDList: [130901, 130902, 130903, 130904, 130905, 130906],
    SkillList: [130901, 130902, 130903, 130904, 130906, 130907],
  },
  "1310": {
    AvatarName: {
      Hash: -793915676,
    },
    AvatarFullName: {
      Hash: -515177433,
    },
    Rarity: 5,
    Element: "Fire",
    AvatarBaseType: "Warrior",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1310.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1310B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1310.png",
    RankIDList: [131001, 131002, 131003, 131004, 131005, 131006],
    SkillList: [131001, 131002, 131003, 131004, 131006, 131007, 131008, 131009],
  },
  "1312": {
    AvatarName: {
      Hash: -1956715090,
    },
    AvatarFullName: {
      Hash: 109652686,
    },
    Rarity: 4,
    Element: "Ice",
    AvatarBaseType: "Warrior",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1312.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1312B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1312.png",
    RankIDList: [131201, 131202, 131203, 131204, 131205, 131206],
    SkillList: [131201, 131202, 131203, 131204, 131206, 131207],
  },
  "1314": {
    AvatarName: {
      Hash: 1531683152,
    },
    AvatarFullName: {
      Hash: -1966747216,
    },
    Rarity: 5,
    Element: "Quantum",
    AvatarBaseType: "Mage",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1314.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1314B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1314.png",
    RankIDList: [131401, 131402, 131403, 131404, 131405, 131406],
    SkillList: [131401, 131402, 131403, 131404, 131406, 131407],
  },
  "1315": {
    AvatarName: {
      Hash: -34400789,
    },
    AvatarFullName: {
      Hash: -844857709,
    },
    Rarity: 5,
    Element: "Physical",
    AvatarBaseType: "Rogue",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/1315.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/1315B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/1315.png",
    RankIDList: [131501, 131502, 131503, 131504, 131505, 131506],
    SkillList: [131501, 131502, 131503, 131504, 131506, 131507, 131508],
  },
  "8001": {
    AvatarName: {
      Hash: -531793818,
    },
    AvatarFullName: {
      Hash: -1461075445,
    },
    Rarity: 5,
    Element: "Physical",
    AvatarBaseType: "Warrior",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/8001.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/8001B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/8001.png",
    RankIDList: [800101, 800102, 800103, 800104, 800105, 800106],
    SkillList: [800101, 800102, 800103, 800104, 800106, 800107, 800108, 800109],
  },
  "8002": {
    AvatarName: {
      Hash: -935078345,
    },
    AvatarFullName: {
      Hash: 802741703,
    },
    Rarity: 5,
    Element: "Physical",
    AvatarBaseType: "Warrior",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/8002.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/8002B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/8002.png",
    RankIDList: [800201, 800202, 800203, 800204, 800205, 800206],
    SkillList: [800201, 800202, 800203, 800204, 800206, 800207, 800208, 800209],
  },
  "8003": {
    AvatarName: {
      Hash: 631005596,
    },
    AvatarFullName: {
      Hash: -1461075445,
    },
    Rarity: 5,
    Element: "Fire",
    AvatarBaseType: "Knight",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/8003.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/8003B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/8003.png",
    RankIDList: [800301, 800302, 800303, 800304, 800305, 800306],
    SkillList: [800301, 800302, 800303, 800304, 800306, 800307, 800308],
  },
  "8004": {
    AvatarName: {
      Hash: 227721069,
    },
    AvatarFullName: {
      Hash: 802741703,
    },
    Rarity: 5,
    Element: "Fire",
    AvatarBaseType: "Knight",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/8004.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/8004B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/8004.png",
    RankIDList: [800401, 800402, 800403, 800404, 800405, 800406],
    SkillList: [800401, 800402, 800403, 800404, 800406, 800407, 800408],
  },
  "8005": {
    AvatarName: {
      Hash: 1793805010,
    },
    AvatarFullName: {
      Hash: -1461075445,
    },
    Rarity: 5,
    Element: "Imaginary",
    AvatarBaseType: "Shaman",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/8005.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/8005B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/8005.png",
    RankIDList: [800501, 800502, 800503, 800504, 800505, 800506],
    SkillList: [800501, 800502, 800503, 800504, 800506, 800507],
  },
  "8006": {
    AvatarName: {
      Hash: 1390520483,
    },
    AvatarFullName: {
      Hash: 802741703,
    },
    Rarity: 5,
    Element: "Imaginary",
    AvatarBaseType: "Shaman",
    AvatarSideIconPath: "SpriteOutput/AvatarRoundIcon/8006.png",
    ActionAvatarHeadIconPath: "SpriteOutput/AvatarIconTeam/8006B.png",
    AvatarCutinFrontImgPath: "SpriteOutput/AvatarDrawCard/8006.png",
    RankIDList: [800601, 800602, 800603, 800604, 800605, 800606],
    SkillList: [800601, 800602, 800603, 800604, 800606, 800607],
  },
};

// export const charactersData = {
//   "1001": {
//     icon: "icon/character/1001.png",
//     Rarity: 4,
//     rank: 0,
//   },
//   "1002": {
//     icon: "icon/character/1002.png",
//     Rarity: 4,
//     rank: 0,
//   },
//   "1003": {
//     icon: "icon/character/1003.png",
//     Rarity: 5,
//     rank: 0,
//   },
//   "1004": {
//     icon: "icon/character/1004.png",
//     Rarity: 5,
//     rank: 0,
//   },
//   "1005": {
//     icon: "icon/character/1005.png",
//     Rarity: 5,
//     rank: 0,
//   },
//   "1006": {
//     icon: "icon/character/1006.png",
//     Rarity: 5,
//     rank: 0,
//   },
//   "1008": {
//     icon: "icon/character/1008.png",
//     Rarity: 4,
//     rank: 0,
//   },
//   "1009": {
//     icon: "icon/character/1009.png",
//     Rarity: 4,
//     rank: 0,
//   },
//   "1013": {
//     icon: "icon/character/1013.png",
//     Rarity: 4,
//     rank: 0,
//   },
//   "1101": {
//     icon: "icon/character/1101.png",
//     Rarity: 5,
//     rank: 0,
//   },
//   "1102": {
//     icon: "icon/character/1102.png",
//     Rarity: 5,
//     rank: 0,
//   },
//   "1103": {
//     icon: "icon/character/1103.png",
//     Rarity: 4,
//     rank: 0,
//   },
//   "1104": {
//     icon: "icon/character/1104.png",
//     Rarity: 5,
//     rank: 0,
//   },
//   "1105": {
//     icon: "icon/character/1105.png",
//     Rarity: 4,
//     rank: 0,
//   },
//   "1106": {
//     icon: "icon/character/1106.png",
//     Rarity: 4,
//     rank: 0,
//   },
//   "1107": {
//     icon: "icon/character/1107.png",
//     Rarity: 5,
//     rank: 0,
//   },
//   "1108": {
//     icon: "icon/character/1108.png",
//     Rarity: 4,
//     rank: 0,
//   },
//   "1109": {
//     icon: "icon/character/1109.png",
//     Rarity: 4,
//     rank: 0,
//   },
//   "1110": {
//     icon: "icon/character/1110.png",
//     Rarity: 4,
//     rank: 0,
//   },
//   "1111": {
//     icon: "icon/character/1111.png",
//     Rarity: 4,
//     rank: 0,
//   },
//   "1112": {
//     icon: "icon/character/1112.png",
//     Rarity: 5,
//     rank: 0,
//   },
//   "1201": {
//     icon: "icon/character/1201.png",
//     Rarity: 4,
//     rank: 0,
//   },
//   "1202": {
//     icon: "icon/character/1202.png",
//     Rarity: 4,
//     rank: 0,
//   },
//   "1203": {
//     icon: "icon/character/1203.png",
//     Rarity: 5,
//     rank: 0,
//   },
//   "1204": {
//     icon: "icon/character/1204.png",
//     Rarity: 5,
//     rank: 0,
//   },
//   "1205": {
//     icon: "icon/character/1205.png",
//     Rarity: 5,
//     rank: 0,
//   },
//   "1206": {
//     icon: "icon/character/1206.png",
//     Rarity: 4,
//     rank: 0,
//   },
//   "1207": {
//     icon: "icon/character/1207.png",
//     Rarity: 4,
//     rank: 0,
//   },
//   "1208": {
//     icon: "icon/character/1208.png",
//     Rarity: 5,
//     rank: 0,
//   },
//   "1209": {
//     icon: "icon/character/1209.png",
//     Rarity: 5,
//     rank: 0,
//   },
//   "1210": {
//     icon: "icon/character/1210.png",
//     Rarity: 4,
//     rank: 0,
//   },
//   "1211": {
//     icon: "icon/character/1211.png",
//     Rarity: 5,
//     rank: 0,
//   },
//   "1212": {
//     icon: "icon/character/1212.png",
//     Rarity: 5,
//     rank: 0,
//   },
//   "1213": {
//     icon: "icon/character/1213.png",
//     Rarity: 5,
//     rank: 0,
//   },
//   "1214": {
//     icon: "icon/character/1214.png",
//     Rarity: 4,
//     rank: 0,
//   },
//   "1215": {
//     icon: "icon/character/1215.png",
//     Rarity: 4,
//     rank: 0,
//   },
//   "1217": {
//     icon: "icon/character/1217.png",
//     Rarity: 5,
//     rank: 0,
//   },
//   "1301": {
//     icon: "icon/character/1301.png",
//     Rarity: 4,
//     rank: 0,
//   },
//   "1302": {
//     icon: "icon/character/1302.png",
//     Rarity: 5,
//     rank: 0,
//   },
//   "1303": {
//     icon: "icon/character/1303.png",
//     Rarity: 5,
//     rank: 0,
//   },
//   "1304": {
//     icon: "icon/character/1304.png",
//     Rarity: 5,
//     rank: 0,
//   },
//   "1305": {
//     icon: "icon/character/1305.png",
//     Rarity: 5,
//     rank: 0,
//   },
//   "1306": {
//     icon: "icon/character/1306.png",
//     Rarity: 5,
//     rank: 0,
//   },
//   "1307": {
//     icon: "icon/character/1307.png",
//     Rarity: 5,
//     rank: 0,
//   },
//   "1308": {
//     icon: "icon/character/1308.png",
//     Rarity: 5,
//     rank: 0,
//   },
//   "1312": {
//     icon: "icon/character/1312.png",
//     Rarity: 4,
//     rank: 0,
//   },
//   "8001": {
//     icon: "icon/character/8001.png",
//     Rarity: 5,
//     rank: 0,
//   },
//   "8002": {
//     icon: "icon/character/8002.png",
//     Rarity: 5,
//     rank: 0,
//   },
//   "8003": {
//     icon: "icon/character/8003.png",
//     Rarity: 5,
//     rank: 0,
//   },
//   "8004": {
//     icon: "icon/character/8004.png",
//     Rarity: 5,
//     rank: 0,
//   },
// };
