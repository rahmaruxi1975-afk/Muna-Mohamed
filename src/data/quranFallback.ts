import { AyahItem } from '../components/spiritual/QuranReader';

export const FALLBACK_SURAHS: Record<number, {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: AyahItem[];
}> = {
  1: {
    number: 1,
    name: 'سُورَةُ ٱلْفَاتِحَةِ',
    englishName: 'Al-Faatiha',
    englishNameTranslation: 'The Opening',
    numberOfAyahs: 7,
    revelationType: 'Meccan',
    ayahs: [
      {
        number: 1,
        numberInSurah: 1,
        text: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
        somaliText: 'Magaca Eebe yaan kubillaabaynaa ee Naxariis guud iyo mid gaaraba Naxariista.',
        englishText: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
      },
      {
        number: 2,
        numberInSurah: 2,
        text: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ',
        somaliText: 'Mahad Eebaa iska leh ee Barbaariyaha Caalamka ah.',
        englishText: '[All] praise is [due] to Allah, Lord of the worlds -',
      },
      {
        number: 3,
        numberInSurah: 3,
        text: 'ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
        somaliText: 'Ee Naxariis guud iyo mid gaaraba Naxariista.',
        englishText: 'The Entirely Merciful, the Especially Merciful,',
      },
      {
        number: 4,
        numberInSurah: 4,
        text: 'مَٰلِكِ يَوْمِ ٱلدِّينِ',
        somaliText: 'Ee Eebaha Maalinta Abaalmarinta ah (Qiyaamada).',
        englishText: 'Sovereign of the Day of Recompense.',
      },
      {
        number: 5,
        numberInSurah: 5,
        text: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        somaliText: 'Adigey ku caabudaynaa adigayna kaalmo ku waydiisanaynaa.',
        englishText: 'It is You we worship and You we ask for help.',
      },
      {
        number: 6,
        numberInSurah: 6,
        text: 'ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ',
        somaliText: 'Ee nagu hanuuni Jidka Toosan.',
        englishText: 'Guide us to the straight path -',
      },
      {
        number: 7,
        numberInSurah: 7,
        text: 'صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ',
        somaliText: 'Jidka kuwii aad u Nicmaysay, aan ahayn kuwa loo Cadhooday iyo kuwa Haluubay toona.',
        englishText: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
      },
    ],
  },
  112: {
    number: 112,
    name: 'سُورَةُ الإِخْلَاصِ',
    englishName: 'Al-Ikhlaas',
    englishNameTranslation: 'Sincerity',
    numberOfAyahs: 4,
    revelationType: 'Meccan',
    ayahs: [
      {
        number: 6222,
        numberInSurah: 1,
        text: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ',
        somaliText: 'Waxaad dhahdaa: Eebe waa Kow (Keli).',
        englishText: 'Say, "He is Allah, [who is] One,',
      },
      {
        number: 6223,
        numberInSurah: 2,
        text: 'ٱللَّهُ ٱلصَّمَدُ',
        somaliText: 'Eebe waa kan loo baahanyahay oo waxba u baahnayn.',
        englishText: 'Allah, the Eternal Refuge.',
      },
      {
        number: 6224,
        numberInSurah: 3,
        text: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
        somaliText: 'Wax ma dhalin isagana lama dhalin.',
        englishText: 'He neither begets nor is born,',
      },
      {
        number: 6225,
        numberInSurah: 4,
        text: 'وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ',
        somaliText: 'Waxaana la mid ahayn waxba.',
        englishText: 'Nor is there to Him any equivalent."',
      },
    ],
  },
  113: {
    number: 113,
    name: 'سُورَةُ الفَلَقِ',
    englishName: 'Al-Falaq',
    englishNameTranslation: 'The Daybreak',
    numberOfAyahs: 5,
    revelationType: 'Meccan',
    ayahs: [
      {
        number: 6226,
        numberInSurah: 1,
        text: 'قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ',
        somaliText: 'Waxaad dhahdaa: waxaan ka magan galay Eebaha Waaberiga.',
        englishText: 'Say, "I seek refuge in the Lord of daybreak',
      },
      {
        number: 6227,
        numberInSurah: 2,
        text: 'مِن شَرِّ مَا خَلَقَ',
        somaliText: 'Sharku waxuu abuuray.',
        englishText: 'From the evil of that which He created',
      },
      {
        number: 6228,
        numberInSurah: 3,
        text: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',
        somaliText: 'Iyo sharka Habeenka mugdiga ah markuu madoobaado.',
        englishText: 'And from the evil of darkness when it settles',
      },
      {
        number: 6229,
        numberInSurah: 4,
        text: 'وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِي ٱلْعُقَدِ',
        somaliText: 'Iyo sharka kuwa wax ku tufa guntimaha (sixiroolayaasha).',
        englishText: 'And from the evil of the blowers in knots',
      },
      {
        number: 6230,
        numberInSurah: 5,
        text: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
        somaliText: 'Iyo sharka midka xaasidka ah markuu xaasidnimo falayo.',
        englishText: 'And from the evil of an envier when he envies."',
      },
    ],
  },
  114: {
    number: 114,
    name: 'سُورَةُ النَّاسِ',
    englishName: 'An-Naas',
    englishNameTranslation: 'Mankind',
    numberOfAyahs: 6,
    revelationType: 'Meccan',
    ayahs: [
      {
        number: 6231,
        numberInSurah: 1,
        text: 'قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ',
        somaliText: 'Waxaad dhahdaa: waxaan ka magan galay Eebaha Dadka.',
        englishText: 'Say, "I seek refuge in the Lord of mankind,',
      },
      {
        number: 6232,
        numberInSurah: 2,
        text: 'مَلِكِ ٱلنَّاسِ',
        somaliText: 'Boqorka Dadka.',
        englishText: 'The Sovereign of mankind,',
      },
      {
        number: 6233,
        numberInSurah: 3,
        text: 'إِلَٰهِ ٱلنَّاسِ',
        somaliText: 'Ilaaha Dadka.',
        englishText: 'The God of mankind,',
      },
      {
        number: 6234,
        numberInSurah: 4,
        text: 'مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ',
        somaliText: 'Sharka waswaasiyaha dhuunta (Shaydaanka).',
        englishText: 'From the evil of the retreating whisperer -',
      },
      {
        number: 6235,
        numberInSurah: 5,
        text: 'ٱلَّذِي يُوَسْوِسُ فِي صُدُورِ ٱلنَّاسِ',
        somaliText: 'Ee ku waswaasiya laabta Dadka.',
        englishText: 'Who whispers [evil] into the breasts of mankind -',
      },
      {
        number: 6236,
        numberInSurah: 6,
        text: 'مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ',
        somaliText: 'Kuna jiro Jinka iyo Dadkaba.',
        englishText: 'From among the jinn and mankind."',
      },
    ],
  },
};
