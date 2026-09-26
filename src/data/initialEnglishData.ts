import {
  EnglishWord,
  EnglishGrammarLesson,
  EnglishSpeakingTopic,
  EnglishListeningExercise,
  EnglishReadingArticle,
  EnglishMotivationalQuote,
  EnglishLearningState,
} from '../types';

export const initialEnglishWords: EnglishWord[] = [
  {
    id: 'ew-1',
    word: 'Consistency',
    phonetic: '/kənˈsɪs.tən.si/',
    partOfSpeech: 'noun',
    meaning: 'The quality of always behaving, working, or continuing in a regular and steadfast manner.',
    somaliMeaning: 'Joogtayn iyo adkaysi (in wax lagu celceliyo si joogto ah)',
    arabicMeaning: 'الاستمرارية والاتساق',
    example: 'Consistency in studying 30 minutes every afternoon is the secret to mastering fluent English.',
    collocationOrTip: 'Collocations: "maintain consistency", "remarkable consistency", "key to success".',
    category: 'Mindset & Growth',
    learned: true,
  },
  {
    id: 'ew-2',
    word: 'Entrepreneur',
    phonetic: '/ˌɒn.trə.prəˈnɜːr/',
    partOfSpeech: 'noun',
    meaning: 'A person who sets up a business or takes on financial risks in the hope of profit and impact.',
    somaliMeaning: 'Ganacsade / qof ganacsi abuura',
    arabicMeaning: 'رائدة أعمال / صاحب مشروع',
    example: 'As a digital entrepreneur, Muna creates high-value planners and templates on Stan Store.',
    collocationOrTip: 'Tip: Pronounced with stress on the last syllable ("-neur").',
    category: 'Business & Digital',
    learned: true,
  },
  {
    id: 'ew-3',
    word: 'Articulate',
    phonetic: '/ɑːˈtɪk.jə.lət/',
    partOfSpeech: 'adjective / verb',
    meaning: 'Having or showing the ability to speak fluently and express thoughts clearly.',
    somaliMeaning: 'Qof hadalka si cad oo fasiix ah u cabira',
    arabicMeaning: 'فصيح / متحدث لبق وواضح',
    example: 'She gave an articulate presentation during her Somali Wealth Academy Zoom workshop.',
    collocationOrTip: 'Collocations: "articulate speaker", "articulate thoughts clearly".',
    category: 'Conversation',
    learned: false,
  },
  {
    id: 'ew-4',
    word: 'E-commerce',
    phonetic: '/ˈiːˌkɒm.ɜːs/',
    partOfSpeech: 'noun',
    meaning: 'Commercial transactions conducted electronically on the internet.',
    somaliMeaning: 'Ganacsiga elektaroonigga ah ee internet-ka',
    arabicMeaning: 'التجارة الإلكترونية',
    example: 'E-commerce allows entrepreneurs to sell digital goods to customers worldwide without shipping costs.',
    collocationOrTip: 'Collocations: "e-commerce store", "global e-commerce platform".',
    category: 'Business & Digital',
    learned: true,
  },
  {
    id: 'ew-5',
    word: 'Perseverance',
    phonetic: '/ˌpɜː.sɪˈvɪə.rəns/',
    partOfSpeech: 'noun',
    meaning: 'Continued effort to do or achieve something despite difficulties, failure, or opposition.',
    somaliMeaning: 'Dhabar-adayg, sabar iyo adkaysi horumar leh',
    arabicMeaning: 'المثابرة والمواظبة',
    example: 'Her perseverance through challenging technical setups paid off when her first sale arrived.',
    collocationOrTip: 'Synonyms: determination, grit, persistence.',
    category: 'Mindset & Growth',
    learned: false,
  },
  {
    id: 'ew-6',
    word: 'Conversion Rate',
    phonetic: '/kənˈvɜː.ʃən reɪt/',
    partOfSpeech: 'noun phrase',
    meaning: 'The percentage of website visitors who take a desired action, such as purchasing a digital product.',
    somaliMeaning: 'Boqolkiiba dadka booqday bogga ee wax iibsaday',
    arabicMeaning: 'معدل التحويل في المبيعات',
    example: 'Adding clear customer reviews increased the conversion rate on her Beacons store.',
    collocationOrTip: 'Business metric: "high conversion rate", "optimize conversion rate".',
    category: 'Business & Digital',
    learned: false,
  },
  {
    id: 'ew-7',
    word: 'Inquire',
    phonetic: '/ɪnˈkwaɪər/',
    partOfSpeech: 'verb',
    meaning: 'To ask for information from someone in a polite or formal way.',
    somaliMeaning: 'Weydiin / xog raadin xushmad leh',
    arabicMeaning: 'يستفسر / يسأل بلباقة',
    example: 'I would like to inquire about the school exam timetable for my children.',
    collocationOrTip: 'Collocations: "inquire about", "inquire whether", "formal inquiry".',
    category: 'Daily Life',
    learned: false,
  },
  {
    id: 'ew-8',
    word: 'Fluency',
    phonetic: '/ˈfluː.ən.si/',
    partOfSpeech: 'noun',
    meaning: 'The ability to speak or write a foreign language easily and accurately.',
    somaliMeaning: 'Fasaxaadda iyo xirfadda luqadeed ee saxda ah',
    arabicMeaning: 'طلاقة في الحديث واللغة',
    example: 'Practicing daily speaking drills builds natural conversational fluency without hesitation.',
    collocationOrTip: 'Collocations: "achieve fluency", "speak with fluency and grace".',
    category: 'Academic',
    learned: true,
  },
  {
    id: 'ew-9',
    word: 'Appreciation',
    phonetic: '/əˌpriː.ʃiˈeɪ.ʃən/',
    partOfSpeech: 'noun',
    meaning: 'Full awareness, recognition, or gratitude for the value and significance of something.',
    somaliMeaning: 'Mahadcelin, qaddarin iyo qirasho wanaag',
    arabicMeaning: 'تقدير وامتنان',
    example: 'I want to express my sincere appreciation to the instructor for this helpful lesson.',
    collocationOrTip: 'Collocations: "express sincere appreciation", "token of appreciation".',
    category: 'Conversation',
    learned: true,
  },
  {
    id: 'ew-10',
    word: 'Prioritize',
    phonetic: '/praɪˈɒr.ɪ.taɪz/',
    partOfSpeech: 'verb',
    meaning: 'To designate or treat something as more important than other things.',
    somaliMeaning: 'Kala hor marin waxyaabaha ugu muhiimsan',
    arabicMeaning: 'يرتب الأولويات / يعطي الأولوية',
    example: 'A mother must prioritize her spiritual peace, children’s well-being, and daily education.',
    collocationOrTip: 'Tip: British spelling is often "prioritise", American is "prioritize".',
    category: 'Mindset & Growth',
    learned: false,
  },
  {
    id: 'ew-11',
    word: 'Digital Asset',
    phonetic: '/ˈdɪdʒ.ɪ.təl ˈæs.et/',
    partOfSpeech: 'noun phrase',
    meaning: 'Content or intellectual property stored digitally, such as eBooks, design templates, and courses.',
    somaliMeaning: 'Hanti dijitaal ah (sida buugaag elektaroonik ah, templates)',
    arabicMeaning: 'أصل رقمي ذو قيمة',
    example: 'Creating digital assets once can generate passive income for months and years.',
    collocationOrTip: 'Collocations: "profitable digital asset", "create digital assets".',
    category: 'Business & Digital',
    learned: false,
  },
  {
    id: 'ew-12',
    word: 'Accomplishment',
    phonetic: '/əˈkʌm.plɪʃ.mənt/',
    partOfSpeech: 'noun',
    meaning: 'Something that has been achieved successfully through skill, work, or effort.',
    somaliMeaning: 'Guul la gaaray ama shaqo si guul ah lagu dhammaystiray',
    arabicMeaning: 'إنجاز وتحقيق هدف',
    example: 'Finishing the Beacons module was a proud accomplishment this week.',
    collocationOrTip: 'Collocations: "sense of accomplishment", "significant accomplishment".',
    category: 'Mindset & Growth',
    learned: true,
  },
  {
    id: 'ew-13',
    word: 'Comprehensive',
    phonetic: '/ˌkɒm.prɪˈhen.sɪv/',
    partOfSpeech: 'adjective',
    meaning: 'Complete; including or dealing with all or nearly all elements or aspects of something.',
    somaliMeaning: 'Dhameystiran oo dhan walba ka kooban',
    arabicMeaning: 'شامل ومتكامل',
    example: 'The Somali Wealth Academy provides a comprehensive curriculum for online marketing.',
    collocationOrTip: 'Collocations: "comprehensive guide", "comprehensive review".',
    category: 'Academic',
    learned: false,
  },
  {
    id: 'ew-14',
    word: 'Authentic',
    phonetic: '/ɔːˈθen.tɪk/',
    partOfSpeech: 'adjective',
    meaning: 'Genuine, real, and true to one’s own personality, values, or origin.',
    somaliMeaning: 'Dhab ah, asalka ah oo aan been ahayn',
    arabicMeaning: 'أصيل وصادق مع النفس',
    example: 'Audiences connect with authentic stories that share both successes and honest struggles.',
    collocationOrTip: 'Collocations: "authentic voice", "authentic personal brand".',
    category: 'Conversation',
    learned: false,
  },
  {
    id: 'ew-15',
    word: 'Patience',
    phonetic: '/ˈpeɪ.ʃəns/',
    partOfSpeech: 'noun',
    meaning: 'The capacity to accept or tolerate delay, trouble, or suffering without getting angry or upset.',
    somaliMeaning: 'Samir iyo dulqaad (Sabr)',
    arabicMeaning: 'الصبر والسلوان',
    example: 'Building an online business requires both patience and daily disciplined action.',
    collocationOrTip: 'Collocations: "infinite patience", "exercise patience".',
    category: 'Mindset & Growth',
    learned: true,
  },
  {
    id: 'ew-16',
    word: 'Testimonial',
    phonetic: '/ˌtes.tɪˈməʊ.ni.əl/',
    partOfSpeech: 'noun',
    meaning: 'A formal statement or recommendation testifying to someone’s character, product, or service.',
    somaliMeaning: 'Markhaati / ra’yi togan oo macaamiil ku amaaneen wax soo saarka',
    arabicMeaning: 'شهادة تزكية أو تقييم إيجابي',
    example: 'A positive customer testimonial on your store builds instant trust with new buyers.',
    collocationOrTip: 'Collocations: "glowing testimonial", "client testimonial video".',
    category: 'Business & Digital',
    learned: false,
  },
];

export const initialEnglishGrammarLessons: EnglishGrammarLesson[] = [
  {
    id: 'gr-1',
    title: 'Present Simple vs. Present Continuous',
    level: 'Beginner',
    summary: 'Learn when to use Present Simple for daily habits and routines vs. Present Continuous for actions happening right now.',
    rules: [
      {
        rule: 'Present Simple: Habits & Facts',
        example: 'I study English every day at 2:00 PM. She lives in Minneapolis.',
        explanation: 'Use base form (or add -s/-es for he/she/it) for regular habits, general truths, and daily schedules.',
      },
      {
        rule: 'Present Continuous: Right Now & Temporary Actions',
        example: 'I am practicing my speaking pronunciation right now. She is watching a Zoom class.',
        explanation: 'Use Subject + am/is/are + verb-ing for things in progress at the exact moment of speaking.',
      },
    ],
    commonMistakes: [
      {
        wrong: 'I am studying English every morning.',
        correct: 'I study English every morning.',
        why: 'Daily habits take the Present Simple, not continuous.',
      },
      {
        wrong: 'Listen! The teacher speaks.',
        correct: 'Listen! The teacher is speaking.',
        why: 'Action happening at this exact moment takes Present Continuous.',
      },
    ],
    quiz: [
      {
        question: 'Choose the correct sentence for a daily habit:',
        options: [
          'I am reviewing my children’s homework at 5:00 PM every day.',
          'I review my children’s homework at 5:00 PM every day.',
          'I was reviewing my children’s homework at 5:00 PM every day.',
        ],
        correctIndex: 1,
        explanation: 'Present Simple ("review") is used for repeated daily routines.',
      },
      {
        question: 'Look outside! It ______ right now.',
        options: ['rains', 'is raining', 'rained'],
        correctIndex: 1,
        explanation: '"Right now" signifies an ongoing action, so use "is raining".',
      },
      {
        question: 'Which sentence has the correct 3rd person singular ending?',
        options: ['My daughter study hard.', 'My daughter studies hard.', 'My daughter is study hard.'],
        correctIndex: 1,
        explanation: 'With "she/my daughter", verbs ending in consonant + y change to -ies: "studies".',
      },
    ],
  },
  {
    id: 'gr-2',
    title: 'Past Simple vs. Present Perfect',
    level: 'Intermediate',
    summary: 'Master the difference between finished past events (yesterday, in 2025) and life experiences linked to now (I have launched).',
    rules: [
      {
        rule: 'Past Simple: Specific Finished Time in the Past',
        example: 'I launched my Beacons store yesterday. We attended the Zoom call on Friday.',
        explanation: 'Use when the time is specified and finished (yesterday, last week, in 2024, 2 hours ago).',
      },
      {
        rule: 'Present Perfect: Life Experiences & Recent Actions without Exact Time',
        example: 'I have created three digital templates. She has completed five modules so far.',
        explanation: 'Use have/has + past participle when the result matters now or the exact finished time is not mentioned.',
      },
    ],
    commonMistakes: [
      {
        wrong: 'I have finished Module 6 yesterday.',
        correct: 'I finished Module 6 yesterday.',
        why: 'Never use Present Perfect with specific past time words like "yesterday".',
      },
      {
        wrong: 'I am in this Academy since three months.',
        correct: 'I have been in this Academy for three months.',
        why: 'Use Present Perfect ("have been") with "for" or "since" to indicate an ongoing duration.',
      },
    ],
    quiz: [
      {
        question: 'Complete the sentence: "Muna ______ five Canva templates this week."',
        options: ['has designed', 'designs', 'is designed'],
        correctIndex: 0,
        explanation: '"This week" is an unfinished period, and the achievements connect to now: "has designed".',
      },
      {
        question: 'Which sentence correctly uses a specific past time?',
        options: [
          'I have attended the Sunday webinar.',
          'I attended the webinar on Sunday.',
          'I was attended the webinar on Sunday.',
        ],
        correctIndex: 1,
        explanation: '"On Sunday" is a finished past point in time, which requires Past Simple ("attended").',
      },
      {
        question: '"She has lived here ______ five years."',
        options: ['since', 'for', 'during'],
        correctIndex: 1,
        explanation: 'Use "for" with a duration of time (five years, two hours, three weeks).',
      },
    ],
  },
  {
    id: 'gr-3',
    title: 'Polite Modal Verbs for Business & Daily Life',
    level: 'Beginner',
    summary: 'Using Could, Would, Can, and May to speak with elegance, warmth, and professional courtesy.',
    rules: [
      {
        rule: 'Could you please... / Would you mind...?',
        example: 'Could you please send me the link? Would you mind checking this document for me?',
        explanation: '"Could" and "Would" soften requests and show high respect in English.',
      },
      {
        rule: 'I would like... instead of I want...',
        example: 'I would like to ask a question regarding the payment settings.',
        explanation: '"I would like" is much more polite and professional than "I want".',
      },
    ],
    commonMistakes: [
      {
        wrong: 'I want you send me the file.',
        correct: 'Could you please send me the file?',
        why: '"I want you..." sounds demanding; polite modals express gentle professionalism.',
      },
      {
        wrong: 'Would you mind to help me?',
        correct: 'Would you mind helping me?',
        why: '"Would you mind" is followed by a gerund (verb-ing).',
      },
    ],
    quiz: [
      {
        question: 'Which request is the most professional and polite for an email?',
        options: [
          'Send me the invoice now.',
          'I want the invoice right now.',
          'Could you please forward the invoice at your earliest convenience?',
        ],
        correctIndex: 2,
        explanation: '"Could you please... at your earliest convenience" is formal, polite, and respectful.',
      },
      {
        question: '"Would you mind ______ the Zoom link in the chat?"',
        options: ['sharing', 'to share', 'share'],
        correctIndex: 0,
        explanation: '"Would you mind" requires the -ing form: "sharing".',
      },
      {
        question: 'How do you politely order coffee or inquire at a desk?',
        options: ['I want a tea.', 'Give me a tea.', 'I would like a cup of tea, please.'],
        correctIndex: 2,
        explanation: '"I would like..., please" is the gold standard of polite conversational English.',
      },
    ],
  },
  {
    id: 'gr-4',
    title: 'Prepositions of Time: In, On, At',
    level: 'Beginner',
    summary: 'Clear rules for using In, On, and At with hours, days, months, and years.',
    rules: [
      {
        rule: 'AT: Precise Times & Specific Moments',
        example: 'At 5:00 AM, at noon, at midnight, at bedtime.',
        explanation: 'Use "at" for exact clock times and points during the 24-hour cycle.',
      },
      {
        rule: 'ON: Days & Dates',
        example: 'On Monday, on September 21st, on my birthday, on the weekend.',
        explanation: 'Use "on" for days of the week and calendar calendar dates.',
      },
      {
        rule: 'IN: Months, Years, Decades, and Long Periods',
        example: 'In September, in 2026, in the morning, in summer.',
        explanation: 'Use "in" for larger time envelopes like months, seasons, years, and parts of the day.',
      },
    ],
    commonMistakes: [
      {
        wrong: 'The Zoom call is in Monday.',
        correct: 'The Zoom call is on Monday.',
        why: 'Days of the week always take "on".',
      },
      {
        wrong: 'I wake up on 5:00 AM.',
        correct: 'I wake up at 5:00 AM.',
        why: 'Exact clock times always take "at".',
      },
    ],
    quiz: [
      {
        question: 'The Somali Wealth Academy webinar starts ______ 7:00 PM.',
        options: ['on', 'in', 'at'],
        correctIndex: 2,
        explanation: 'Clock times take "at" (at 7:00 PM).',
      },
      {
        question: 'Our family celebration is ______ Friday.',
        options: ['at', 'on', 'in'],
        correctIndex: 1,
        explanation: 'Days of the week take "on" (on Friday).',
      },
      {
        question: 'She hopes to launch her new course ______ November.',
        options: ['in', 'at', 'on'],
        correctIndex: 0,
        explanation: 'Months take "in" (in November).',
      },
    ],
  },
  {
    id: 'gr-5',
    title: 'Professional Email & Customer Message Structures',
    level: 'Intermediate',
    summary: 'Essential formulas for writing clear, confident emails to teachers, instructors, clients, and partners.',
    rules: [
      {
        rule: 'Clear Greeting & Friendly Opener',
        example: 'Dear Sister Amina, / Good morning, Mr. Davis. I hope this email finds you well.',
        explanation: 'A warm opening sentence sets a respectful, constructive tone.',
      },
      {
        rule: 'Stating the Purpose Directly',
        example: 'I am writing to inquire about the assignment deadline. / I am following up on my order.',
        explanation: '"I am writing to..." or "I am reaching out to..." clearly explains your intent.',
      },
      {
        rule: 'Polite Call to Action & Sign-off',
        example: 'Thank you for your time and guidance. Warm regards, Muna.',
        explanation: 'Conclude with gratitude and a professional sign-off (Best regards, Warmly, Sincerely).',
      },
    ],
    commonMistakes: [
      {
        wrong: 'Hey teacher, why my son has low mark?',
        correct: 'Dear Mr. Miller, I hope you are having a wonderful week. I am writing to ask how we can best support Cabdirashiid in his math progress.',
        why: 'Diplomatic phrasing builds a collaborative partnership with teachers.',
      },
    ],
    quiz: [
      {
        question: 'Which closing phrase is most suitable for a business email?',
        options: ['See ya,', 'Best regards,', 'Later,'],
        correctIndex: 1,
        explanation: '"Best regards," is universally accepted in professional and polite correspondence.',
      },
      {
        question: 'Which sentence best introduces the reason for your email?',
        options: [
          'Listen to what I need.',
          'I am reaching out to ask for clarification on the Stan Store setup.',
          'I want you to tell me about Stan Store.',
        ],
        correctIndex: 1,
        explanation: '"I am reaching out to..." is modern, polite, and effective.',
      },
    ],
  },
  {
    id: 'gr-6',
    title: 'Comparative and Superlative Adjectives',
    level: 'Beginner',
    summary: 'How to compare two items (faster, more profitable) and describe the highest degree (the best, the most effective).',
    rules: [
      {
        rule: 'Short Adjectives: add -er / -est',
        example: 'Fast -> Faster -> The fastest. Clear -> Clearer -> The clearest.',
        explanation: 'One-syllable adjectives add -er for comparison and -est for superlative.',
      },
      {
        rule: 'Long Adjectives: use more / the most',
        example: 'Consistent -> More consistent -> The most consistent. Profitable -> More profitable -> The most profitable.',
        explanation: 'Adjectives with 2+ syllables generally use "more" and "the most".',
      },
    ],
    commonMistakes: [
      {
        wrong: 'Canva is more easy than Photoshop.',
        correct: 'Canva is easier than Photoshop.',
        why: 'Two-syllable adjectives ending in -y change to -ier ("easier").',
      },
      {
        wrong: 'This is the most good lesson.',
        correct: 'This is the best lesson.',
        why: '"Good" is irregular: Good -> Better -> Best.',
      },
    ],
    quiz: [
      {
        question: 'Practice makes speaking ______ over time.',
        options: ['more easy', 'easier', 'easiest'],
        correctIndex: 1,
        explanation: 'Comparative form of easy is "easier".',
      },
      {
        question: 'What is the comparative form of "important"?',
        options: ['importanter', 'more important', 'most important'],
        correctIndex: 1,
        explanation: '"Important" is a 3-syllable adjective, so we use "more important".',
      },
    ],
  },
];

export const initialEnglishSpeakingTopics: EnglishSpeakingTopic[] = [
  {
    id: 'sp-1',
    title: 'Introducing Yourself & Your Digital Business',
    situation: 'You are introducing yourself in an English networking breakout room or Somali Wealth Academy Zoom call.',
    prompt: 'State your name, where you are based, what you are learning, and what digital products you create.',
    keyPhrases: [
      'Hello everyone, my name is...',
      'I am currently based in...',
      'I specialize in creating digital planners and templates for busy families.',
      'My goal this month is to...',
      'It is a pleasure to connect with all of you.',
    ],
    sampleResponse:
      'Hello everyone! My name is Muna, and I am delighted to be here. I am an aspiring digital entrepreneur and mother of three wonderful children. Through the Somali Wealth Academy, I am mastering Canva design, Beacons landing pages, and digital product marketing. I create thoughtful prayer journals and productivity planners to help women organize their daily lives with serenity. I look forward to learning alongside everyone today!',
    pronunciationTips: 'Focus on clear pauses after commas. Stress the word "delighted" (de-LIGHT-ed) and "entrepreneur" (on-truh-pruh-NUR).',
    difficulty: 'Beginner',
  },
  {
    id: 'sp-2',
    title: 'Talking to a Child’s High School Teacher',
    situation: 'A phone call or parent-teacher meeting regarding your child’s academic progress and homework habits.',
    prompt: 'Inquire about how your child is performing, what areas need extra attention, and how you can support at home.',
    keyPhrases: [
      'Good afternoon, thank you for taking the time to meet with me.',
      'I wanted to check in on his/her progress in class.',
      'Are there any specific topics we should review together at home?',
      'We have a dedicated daily study routine from 4:30 PM to 6:00 PM.',
      'We appreciate your dedication to their education.',
    ],
    sampleResponse:
      'Good afternoon, Mr. Miller. Thank you for your time. I wanted to check in regarding Cabdiraxman’s progress in advanced mathematics. He works hard every evening, and we want to ensure he feels completely confident for upcoming exams. Are there any particular units where you recommend extra practice worksheets? We will gladly support his efforts at home.',
    pronunciationTips: 'Keep your tone warm and collaborative. Use upward inflection for polite questions: "Could you recommend... ↗?"',
    difficulty: 'Intermediate',
  },
  {
    id: 'sp-3',
    title: 'Answering a Customer Inquiry About a Digital Download',
    situation: 'A customer sent you a message asking how to download and print their planner after purchase.',
    prompt: 'Explain clearly how they can access their digital PDF file, import it to GoodNotes or print it, and offer assistance.',
    keyPhrases: [
      'Thank you for your purchase and kind support!',
      'Once your payment is processed, you will receive an instant download link.',
      'You can easily download the high-resolution PDF file to your device.',
      'If you have any trouble opening the file, please let me know.',
      'Have a wonderful day and happy planning!',
    ],
    sampleResponse:
      'Hello Fatima, thank you so much for your order! As soon as your checkout completes, an email is automatically sent with your instant download link. You can save the PDF to your phone, tablet, or laptop. You can either print it at home or import it into digital note apps like GoodNotes. If you have any difficulty, please send me a message and I will gladly assist you right away!',
    pronunciationTips: 'Enunciate "automatically" (au-to-MAT-ic-al-ly) and "resolution" (res-o-LU-tion). Maintain an encouraging, positive pitch.',
    difficulty: 'Intermediate',
  },
  {
    id: 'sp-4',
    title: 'Sharing Your Personal Morning Routine & Habits',
    situation: 'Explaining your daily schedule and healthy habits to an accountability partner.',
    prompt: 'Describe your morning from Fajr prayer, Quran reflection, gentle exercise, to preparing breakfast and beginning your studies.',
    keyPhrases: [
      'My day begins early at 5:00 AM with Fajr prayer.',
      'I dedicate thirty quiet minutes to Quran recitation.',
      'After a light stretching routine, I prepare breakfast for the family.',
      'By 9:00 AM, I am ready for focused study.',
      'Starting with intention brings barakah to my entire day.',
    ],
    sampleResponse:
      'My morning routine begins early at five o’clock with Fajr prayer and morning remembrance. I always spend thirty quiet minutes reading the Quran before the house wakes up. Then, I do gentle mobility stretches and drink a warm glass of lemon water. Once the children are ready for school, I sit down with a clear mind for my digital marketing coursework. Starting with peace and gratitude transforms the entire day.',
    pronunciationTips: 'Practice smooth linking between words: "peace and gratitude" -> "peace-an-gratitude".',
    difficulty: 'Beginner',
  },
  {
    id: 'sp-5',
    title: 'Explaining the Benefits of Digital Products',
    situation: 'Discussing why digital products are an empowering business model for modern women.',
    prompt: 'Highlight how zero inventory, global reach, and low overhead make digital products an ideal venture.',
    keyPhrases: [
      'Digital products require no shipping or physical inventory.',
      'You create the value once, and it can be delivered infinite times.',
      'It empowers mothers to work flexibly from the comfort of their home.',
      'With tools like Canva and Beacons, the barrier to entry is low.',
      'It builds true financial independence and self-reliance.',
    ],
    sampleResponse:
      'What makes digital products so revolutionary is the low barrier to entry. Unlike physical stores, there is no inventory, no shipping delays, and no manufacturing waste. You can design an elegant Islamic prayer journal or meal planner in Canva, upload it to Stan Store, and customers across the world can purchase it instantly. It allows mothers to build financial independence while prioritizing their families.',
    pronunciationTips: 'Notice the rhythm in "no inventory, no shipping delays, and no manufacturing waste". Give each point equal weight.',
    difficulty: 'Advanced',
  },
];

export const initialEnglishListeningExercises: EnglishListeningExercise[] = [
  {
    id: 'ls-1',
    title: 'Welcome to the Digital Marketing Workshop',
    context: 'An audio orientation speech given by an instructor at the start of a digital skills webinar.',
    speaker: 'Academy Lead Instructor',
    difficulty: 'Beginner',
    audioScript:
      'Welcome everyone to this evening’s digital marketing masterclass. Tonight, we are going to explore the three pillars of digital product success: first, identifying a genuine problem that people need solved; second, designing a clean and attractive solution using beginner-friendly tools like Canva; and third, setting up your Beacons or Stan Store link so customers can checkout smoothly in seconds. Remember, you do not need prior technical expertise to thrive. All you need is consistency, patience, and a willingness to learn one small skill each day. Let us get started!',
    questions: [
      {
        id: 'q1-1',
        question: 'What is the first pillar of digital product success mentioned by the instructor?',
        options: [
          'Buying expensive advertising software',
          'Identifying a genuine problem that people need solved',
          'Renting an office building',
        ],
        correctIndex: 1,
        explanation: 'The instructor explicitly states: "first, identifying a genuine problem that people need solved".',
      },
      {
        id: 'q1-2',
        question: 'According to the speaker, what does a student need to thrive in this field?',
        options: [
          'A computer science university degree',
          'Thousands of dollars in startup capital',
          'Consistency, patience, and a willingness to learn',
        ],
        correctIndex: 2,
        explanation: 'The speaker notes: "All you need is consistency, patience, and a willingness to learn one small skill each day."',
      },
    ],
  },
  {
    id: 'ls-2',
    title: 'Parent-Teacher Advice on Study Habits',
    context: 'A high school counselor discussing how parents can support teenagers during exam season.',
    speaker: 'High School Academic Counselor',
    difficulty: 'Intermediate',
    audioScript:
      'Good afternoon parents. As our students enter their high school years, especially in grades nine, ten, and eleven, the academic workload increases noticeably. One of the most effective ways you can support your teenagers at home is by establishing an uninterrupted study hour every afternoon. Encourage them to place their smartphones in another room during study blocks to eliminate distracting notifications. Offer words of praise for their effort rather than just their test scores, and make sure they get at least eight hours of restful sleep every night. A well-rested mind remembers concepts far more easily.',
    questions: [
      {
        id: 'q2-1',
        question: 'What is recommended regarding smartphones during homework time?',
        options: [
          'Keep them on the desk with volume on loud',
          'Place them in another room to eliminate distracting notifications',
          'Use them continuously while studying',
        ],
        correctIndex: 1,
        explanation: 'The counselor suggests placing phones in another room to eliminate distracting notifications.',
      },
      {
        id: 'q2-2',
        question: 'What should parents praise to foster confidence?',
        options: [
          'Their effort and dedication rather than just test scores',
          'Only when they receive 100 percent',
          'Nothing until graduation',
        ],
        correctIndex: 0,
        explanation: 'The counselor recommends praising effort rather than just exam scores.',
      },
    ],
  },
  {
    id: 'ls-3',
    title: 'Customer Inquiry About Digital Planner Compatibility',
    context: 'A voicemail from a prospective buyer inquiring about how to use a digital PDF planner.',
    speaker: 'Customer Voicemail',
    difficulty: 'Intermediate',
    audioScript:
      'Hi there! I came across your beautiful Ramadan and daily productivity planner on TikTok, and I really love the minimalist purple design. Before I place my order, I just wanted to ask if this file is compatible with both Apple iPad using the GoodNotes application, and Samsung Galaxy tablets using Samsung Notes? Also, is the planner dated for 2026 or is it undated so I can reuse it every year? Thank you so much, and I look forward to hearing back from you!',
    questions: [
      {
        id: 'q3-1',
        question: 'Where did the customer first see the digital planner?',
        options: ['In a local newspaper', 'On TikTok', 'On a billboard'],
        correctIndex: 1,
        explanation: 'The caller states: "I came across your beautiful Ramadan and daily productivity planner on TikTok".',
      },
      {
        id: 'q3-2',
        question: 'What two apps did the customer ask about for tablet compatibility?',
        options: [
          'GoodNotes and Samsung Notes',
          'Microsoft Excel and Word',
          'Instagram and WhatsApp',
        ],
        correctIndex: 0,
        explanation: 'The caller asked about GoodNotes on iPad and Samsung Notes on Galaxy tablets.',
      },
    ],
  },
  {
    id: 'ls-4',
    title: 'Mindset & The Power of Small Daily Steps',
    context: 'A podcast host sharing an inspiring reflection on adult learning and personal transformation.',
    speaker: 'Podcast Host',
    difficulty: 'Advanced',
    audioScript:
      'Many adults hesitate to start learning a new language or building a new digital career because they believe it takes years of grueling effort. But cognitive science reveals something extraordinary: committing just twenty to thirty minutes every single day produces vastly greater fluency and retention than studying for five hours once a week. When you review five vocabulary words every afternoon and speak ten sentences aloud, your brain forms durable neural pathways. Do not underestimate the quiet compounding power of twenty minutes of daily discipline.',
    questions: [
      {
        id: 'q4-1',
        question: 'What does cognitive science demonstrate about learning retention?',
        options: [
          'Studying five hours once a week is always superior',
          'Daily 20-30 minute sessions produce far greater fluency than occasional marathon study',
          'Learning is impossible after age thirty',
        ],
        correctIndex: 1,
        explanation: 'The speaker highlights that 20-30 minutes daily produces vastly greater fluency than cramming once a week.',
      },
      {
        id: 'q4-2',
        question: 'What phrase does the host use to describe the long-term effect of daily discipline?',
        options: [
          'Sudden luck',
          'The quiet compounding power',
          'Instant viral success',
        ],
        correctIndex: 1,
        explanation: 'The host refers to "the quiet compounding power of twenty minutes of daily discipline".',
      },
    ],
  },
];

export const initialEnglishReadingArticles: EnglishReadingArticle[] = [
  {
    id: 'rd-1',
    title: 'The Secret to Lifelong Learning for Busy Mothers',
    category: 'Personal Growth & Habits',
    estimatedMinutes: 4,
    content: `Motherhood is one of the most demanding callings in the world. Between managing household responsibilities, preparing nutritious meals, and supporting children with their schooling, finding quiet personal time can feel nearly impossible. 

However, embracing lifelong learning does not require hours of uninterrupted solitude. Modern research shows that "micro-learning"—dedicating focused 15 to 30-minute intervals throughout the day—is often more effective than traditional long classroom lectures. 

When you set aside thirty minutes every afternoon to practice English vocabulary, listen to an educational podcast, or refine a digital product design, you are not taking away from your family. Rather, you are demonstrating to your children that growth, curiosity, and self-improvement are lifelong values. 

As the saying goes: "A mother who learns is an entire community that advances." By investing in your own mind, you open doors of financial independence, articulate confidence, and boundless opportunities for your household.`,
    vocabularyHighlights: [
      { word: 'Demanding', definition: 'Requiring much time, effort, or skill.', somali: 'Culays badan oo dadaal u baahan' },
      { word: 'Solitude', definition: 'The state or situation of being alone in peace.', somali: 'Kalinimo deggan oo faa’iido leh' },
      { word: 'Intervals', definition: 'A period of time between events or states.', somali: 'Waqtiyo kooban oo kala go’an' },
      { word: 'Refine', definition: 'To improve something by making small changes.', somali: 'Hagaajin iyo carfin si heer sare loo gaarsiiyo' },
      { word: 'Boundless', definition: 'Without limits; immense.', somali: 'Aan xad lahayn, aad u ballaaran' },
    ],
    comprehensionQuestions: [
      {
        question: 'What does the article mean by "micro-learning"?',
        options: [
          'Studying for ten hours without sleeping',
          'Dedicating focused 15 to 30-minute intervals throughout the day',
          'Using a microscope to read books',
        ],
        correctIndex: 1,
      },
      {
        question: 'According to the article, how does a mother’s learning impact her children?',
        options: [
          'It models lifelong curiosity, growth, and self-improvement',
          'It causes children to forget their homework',
          'It has no effect at all',
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'rd-2',
    title: 'How Digital Products Are Empowering Somali Entrepreneurs',
    category: 'Business & Ecommerce',
    estimatedMinutes: 5,
    content: `Across the global Somali diaspora, a quiet revolution of digital entrepreneurship is unfolding. Ambitious women and youth are leveraging online platforms like Canva, Stan Store, Beacons, and TikTok to build thriving independent businesses.

In previous decades, launching a business required thousands of dollars in capital, renting physical storefronts, and purchasing bulk inventory. Today, digital products have eliminated those heavy barriers. A single well-crafted digital asset—such as an Islamic habit tracker, a budgeting spreadsheet, or a high-converting social media template—can be designed once and sold thousands of times.

The key to succeeding in this digital economy is authenticity and community trust. When creators share their genuine learning journey, provide genuine value, and speak with clear, confident English in international marketplaces, they attract customers across North America, Europe, and the Middle East.

Financial independence is not merely about accumulating wealth; it is about dignity, the freedom to make choices, and the capacity to give generously back to one's community.`,
    vocabularyHighlights: [
      { word: 'Leveraging', definition: 'Using something to maximum advantage.', somali: 'Ka faa’iideysiga awoodaha jira' },
      { word: 'Barriers', definition: 'Obstacles that prevent movement or access.', somali: 'Caqabado hortaagan gelitaanka' },
      { word: 'Well-crafted', definition: 'Skilfully and carefully constructed.', somali: 'Si xirfad iyo hufnaan leh loo sameeyay' },
      { word: 'Diaspora', definition: 'People settled far across the world from their homeland.', somali: 'Qurba-joogta ku nool daafaha caalamka' },
      { word: 'Accumulating', definition: 'Gathering or growing in quantity over time.', somali: 'Ururin iyo kobcin tartiib-tartiib ah' },
    ],
    comprehensionQuestions: [
      {
        question: 'What is a major advantage of digital products over physical businesses?',
        options: [
          'No inventory, no shipping delays, and low startup capital',
          'You must rent a huge physical warehouse',
          'You can only sell to people living on your street',
        ],
        correctIndex: 0,
      },
      {
        question: 'What qualities help creators attract international buyers?',
        options: [
          'Hiding their true identity',
          'Authenticity, community trust, and clear communication',
          'Copying other people’s work without changes',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'rd-3',
    title: 'Mastering the Art of Confident English Speaking',
    category: 'Communication & Confidence',
    estimatedMinutes: 4,
    content: `The greatest obstacle to speaking a second language fluently is rarely a lack of vocabulary or grammar rules; it is the fear of making a mistake. Many adult learners hesitate to speak because they worry about their accent or grammar accuracy.

However, native speakers and international professionals value clarity and sincerity far more than grammatical perfection. When you speak with warmth, maintain eye contact, and articulate your thoughts calmly, people naturally listen with respect.

To build speaking confidence quickly, implement three simple daily rituals:
1. Shadowing: Listen to a short audio sentence and repeat it aloud immediately, copying the natural rhythm and intonation.
2. Self-recording: Record a 60-second voice memo describing what you did today, and listen back without self-judgment.
3. Daily Dialogue: Practice polite conversational phrases whenever ordering, inquiring, or greeting others.

Remember: Fluency is not the absence of mistakes; it is the courage to communicate regardless.`,
    vocabularyHighlights: [
      { word: 'Obstacle', definition: 'A thing that blocks one’s way or hinders progress.', somali: 'Caqabad hortaagan horumarka' },
      { word: 'Sincerity', definition: 'The quality of being free from pretense or deceit.', somali: 'Daacadnimo iyo niyad-sami' },
      { word: 'Shadowing', definition: 'An active listening technique of repeating speech instantly.', somali: 'Ku celinta hadalka isla marka aad maqasho' },
      { word: 'Intonation', definition: 'The rise and fall of the voice in speaking.', somali: 'Kala baxa iyo laxanka codka inta la hadlayo' },
    ],
    comprehensionQuestions: [
      {
        question: 'What is identified as the biggest obstacle to speaking fluently?',
        options: [
          'Not having an expensive textbook',
          'The fear of making mistakes and hesitating',
          'Speaking too many languages',
        ],
        correctIndex: 1,
      },
      {
        question: 'What is the "Shadowing" technique?',
        options: [
          'Standing in the dark while studying',
          'Repeating an audio sentence immediately to mirror rhythm and intonation',
          'Reading silently without moving your lips',
        ],
        correctIndex: 1,
      },
    ],
  },
];

export const initialEnglishMotivationalQuotes: EnglishMotivationalQuote[] = [
  {
    id: 'emq-1',
    quote: 'A different language is a different vision of life.',
    author: 'Federico Fellini',
    somaliTranslation: 'Luqad cusub waa aragti cusub iyo dariiq kale oo nolosha loo fahmo.',
    arabicTranslation: 'لغة جديدة هي رؤية جديدة للحياة.',
    tip: 'Every word you practice today broadens your horizons and multiplies your opportunities.',
  },
  {
    id: 'emq-2',
    quote: 'Do not be afraid of mistakes. Mistakes are the proof that you are actively trying and growing.',
    author: 'Language Mindset Principle',
    somaliTranslation: 'Ha ka cabsan khaladaadka; khaladaadku waa caddeynta inaad dadaalayso oo aad baranayso.',
    arabicTranslation: 'لا تخف من الأخطاء؛ فالخطأ هو الدليل القاطع على أنك تحاول وتتطور.',
    tip: 'Speak with confidence even if imperfect. Clarity and courage beat perfection every time.',
  },
  {
    id: 'emq-3',
    quote: 'Small daily improvements over time lead to stunning results.',
    author: 'Robin Sharma',
    somaliTranslation: 'Dadaal yar oo joogto ah maalin walba wuxuu dhashaa guulo layaab leh.',
    arabicTranslation: 'التحسينات اليومية الصغيرة تقود مع مرور الوقت إلى نتائج باهرة.',
    tip: 'Twenty minutes of focused afternoon English practice creates effortless fluency within months.',
  },
  {
    id: 'emq-4',
    quote: 'Knowledge is power, but the ability to articulate your knowledge is freedom.',
    author: 'Muna Inspiration',
    somaliTranslation: 'Aqoontu waa awood, laakiin inaad si cad u cabirto waa xorriyad dhab ah.',
    arabicTranslation: 'المعرفة قوة، والقدرة على التعبير عنها بوضوح هي قمة الحرية.',
    tip: 'Speak your thoughts clearly in business calls and with your children’s teachers.',
  },
  {
    id: 'emq-5',
    quote: 'You are never too busy to invest thirty minutes into the future of your voice and business.',
    author: 'Somali Wealth Academy Wisdom',
    somaliTranslation: 'Weligood ma jirto mashquul kaaga weyn 30 daqiiqo oo aad ku maalgashato mustaqbalkaaga.',
    arabicTranslation: 'لستِ مشغولة أبداً عن استثمار 30 دقيقة يومياً في بناء مستقبلك وفصاحتك.',
    tip: 'Treat your English study time as an unshakeable appointment with your future self.',
  },
];

export const initialEnglishLearningState: EnglishLearningState = {
  studyTime: '14:00', // 02:00 PM
  studyDurationMinutes: 30,
  reminderEnabled: true,
  reminderTime: '14:00',
  level: 'Intermediate',
  streakDays: 8,
  totalMinutesLearned: 380,
  wordsLearned: ['ew-1', 'ew-2', 'ew-4', 'ew-8', 'ew-9', 'ew-12', 'ew-15'],
  grammarMastered: ['gr-1'],
  speakingCompleted: ['sp-1'],
  listeningCompleted: ['ls-1'],
  readingCompleted: ['rd-1'],
  dailyChecklist: {
    vocabulary: true,
    grammar: false,
    speaking: false,
    listening: false,
    reading: true,
  },
  lastActiveDate: '2026-09-21',
  personalGoalNotes:
    'Build effortless conversational confidence for Somali Wealth Academy Zoom calls, customer support on Stan Store, and communicating with my children’s school teachers with poise and clarity.',
};
