import React, { useState } from 'react';
import {
  Mountain,
  Plane,
  PenTool,
  ClipboardCheck,
  Mic,
  Zap,
  Info,
  AlertTriangle,
  CheckCircle2,
  Map,
  Compass,
  Globe,
  Languages,
  BookOpen,
  RotateCcw,
  Star,
  Rocket,
  TrendingUp,
  Briefcase
} from 'lucide-react';
import { Lesson, VocabItem, ExerciseItem, QuizQuestion } from './types';

// --- COMPONENTS FOR CONTENT ---

const VocabTable: React.FC<{ items: VocabItem[], colorTheme: string }> = ({ items, colorTheme }) => (
  <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className={`${colorTheme} text-white`}>
          <tr>
            <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Từ vựng (Word)</th>
            <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Phát âm & Loại từ</th>
            <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Nghĩa & Ví dụ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-50 transition-colors group">
              <td className="px-6 py-4">
                <span className="font-bold text-gray-900 text-base block">{item.word}</span>
              </td>
              <td className="px-6 py-4">
                <span className="font-mono text-gray-500 text-xs bg-gray-100 px-2 py-1 rounded-md border border-gray-200">{item.ipa}</span>
              </td>
              <td className="px-6 py-4 text-gray-700">
                <div dangerouslySetInnerHTML={{ __html: item.meaning }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const GrammarBox: React.FC<{
  title: string;
  rule: React.ReactNode;
  examples: { correct: string; incorrect?: string; explain?: string }[];
  color: string
}> = ({ title, rule, examples, color }) => (
  <div className="mb-8 rounded-2xl border border-gray-200 overflow-hidden shadow-sm bg-white">
    <div className={`${color} px-6 py-4 border-b border-white/10`}>
      <h3 className="text-white font-bold text-lg flex items-center gap-2">
        <Zap className="w-5 h-5 fill-current" /> {title}
      </h3>
    </div>
    <div className="p-6">
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6 font-medium text-gray-800">
        {rule}
      </div>
      <div className="space-y-4">
        {examples.map((ex, idx) => (
          <div key={idx} className="relative pl-4 border-l-4 border-l-transparent hover:border-l-indigo-500 transition-all">
            <div className="flex items-start gap-3 mb-1">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <p className="text-green-800 font-medium bg-green-50 px-2 py-1 rounded inline-block">{ex.correct}</p>
            </div>
            {ex.incorrect && (
              <div className="flex items-start gap-3 mb-1">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-red-800 line-through decoration-red-500/50 bg-red-50 px-2 py-1 rounded inline-block">{ex.incorrect}</p>
              </div>
            )}
            {ex.explain && (
              <p className="text-sm text-gray-500 italic ml-8 mt-1 border-t border-dashed border-gray-200 pt-1">💡 {ex.explain}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ExerciseCard: React.FC<{ item: ExerciseItem, idx: number }> = ({ item, idx }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <div className="p-5 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex gap-3">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold text-sm shrink-0">
          {idx + 1}
        </span>
        <div className="grow">
          <p className="font-medium text-gray-800 text-lg mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.question }}></p>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              {showAnswer ? 'Ẩn đáp án' : 'Xem đáp án'}
            </button>
          </div>

          {showAnswer && (
            <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-100 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <span className="text-green-800 font-bold block mb-1">Giải thích chi tiết:</span>
                <span className="text-green-900" dangerouslySetInnerHTML={{ __html: item.answer }}></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PhoneticCard: React.FC<{ pair: string, words: string[], tip: string }> = ({ pair, words, tip }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-indigo-200 transition-colors h-full flex flex-col">
    <div className="flex items-center justify-between mb-4">
      <span className="text-2xl font-black text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl">{pair}</span>
      <Mic className="text-gray-400 w-6 h-6" />
    </div>
    <div className="flex flex-wrap gap-2 mb-4 grow content-start">
      {words.map((w, i) => (
        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:bg-indigo-50 hover:text-indigo-700 transition-colors cursor-default">
          {w}
        </span>
      ))}
    </div>
    <p className="text-sm text-gray-600 italic bg-yellow-50 p-3 rounded-lg border border-yellow-100 mt-auto">
      <span className="font-bold text-yellow-700 not-italic">Quy tắc:</span> {tip}
    </p>
  </div>
);

// --- DATA CONTENT BASED ON REPORT ---

const unit7Vocab: VocabItem[] = [
  { word: "Natural Wonder", ipa: "/ˌnætʃrəl ˈwʌndər/ (n)", meaning: "<strong>Kỳ quan thiên nhiên</strong>. Địa điểm có vẻ đẹp tự nhiên đặc biệt.<br/><em class='text-xs text-gray-500'>Hay đi với: Visit a natural wonder.</em>" },
  { word: "Limestone", ipa: "/ˈlaɪmstəʊn/ (n)", meaning: "<strong>Đá vôi</strong>. Thành phần chính tạo nên các hang động và đảo đá.<br/><em class='text-xs text-gray-500'>Ví dụ: Limestone islands (Vịnh Hạ Long).</em>" },
  { word: "Heritage", ipa: "/ˈherɪtɪdʒ/ (n)", meaning: "<strong>Di sản</strong>. Giá trị văn hóa/tự nhiên được lưu truyền.<br/><em class='text-xs text-gray-500'>Hay đi với: World Heritage Site.</em>" },
  { word: "Explore", ipa: "/ɪkˈsplɔː(r)/ (v)", meaning: "<strong>Thám hiểm, khám phá</strong> (tìm hiểu nơi lạ).<br/><em class='text-xs text-gray-500'>Khác với 'Travel'. Từ liên quan: Exploration (n) = sự khám phá.</em>" },
  { word: "Breathtaking", ipa: "/ˈbreθteɪkɪŋ/ (adj)", meaning: "<strong>Đẹp đến nghẹt thở</strong>. (Mức độ mạnh hơn 'Beautiful').<br/><em class='text-xs text-gray-500'>Đồng nghĩa: Magnificent, Stunning.</em>" },
  { word: "Sustainable", ipa: "/səˈsteɪnəbl/ (adj)", meaning: "<strong>Bền vững</strong>. Không gây hại cho tương lai.<br/><em class='text-xs text-gray-500'>Ví dụ: Sustainable tourism.</em>" },
  { word: "Magnificent", ipa: "/mæɡˈnɪfɪsnt/ (adj)", meaning: "<strong>Tráng lệ, nguy nga</strong>. Thường dùng cho núi non, cung điện.<br/><em class='text-xs text-gray-500'>Đồng nghĩa: Impressive.</em>" },
];

const unit8Vocab: VocabItem[] = [
  { word: "Ecotourism", ipa: "/ˈiːkəʊtʊərɪzəm/ (n)", meaning: "<strong>Du lịch sinh thái</strong>. Hướng tới bảo tồn tự nhiên.<br/><em class='text-xs text-gray-500'>Kết nối chủ đề bảo vệ môi trường Unit 7.</em>" },
  { word: "Itinerary", ipa: "/aɪˈtɪnərəri/ (n)", meaning: "<strong>Lịch trình chi tiết</strong> (ngày giờ, địa điểm).<br/><em class='text-xs text-gray-500'>Hay đi với: Plan an itinerary.</em>" },
  { word: "Expedition", ipa: "/ˌekspəˈdɪʃn/ (n)", meaning: "<strong>Cuộc thám hiểm</strong>. Hành trình có mục đích cụ thể (khoa học), vất vả hơn tour thường." },
  { word: "Package Holiday", ipa: "/ˈpækɪdʒ hɒlədeɪ/ (n)", meaning: "<strong>Kỳ nghỉ trọn gói</strong>. Bao gồm vé, khách sạn, ăn uống.<br/><em class='text-xs text-gray-500'>Đối lập: Self-guided tour (Tour tự túc).</em>" },
  { word: "Affordable", ipa: "/əˈfɔːdəbl/ (adj)", meaning: "<strong>Giá cả phải chăng</strong>. Có khả năng chi trả được.<br/><em class='text-xs text-gray-500'>Đồng nghĩa: Reasonable price.</em>" },
  { word: "Destination", ipa: "/ˌdestɪˈneɪʃn/ (n)", meaning: "<strong>Điểm đến</strong>.<br/><em class='text-xs text-gray-500'>Ví dụ: Popular tourist destination.</em>" },
  { word: "Accessible", ipa: "/əkˈsesəbl/ (adj)", meaning: "<strong>Dễ tiếp cận</strong> (về vị trí hoặc giá cả)." },
];

const unit7Exercises: ExerciseItem[] = [
  { id: 1, question: "Direct: 'Is Ha Long Bay charming?'<br/>Reported: He asked _______.", answer: "<strong>if Ha Long Bay was charming</strong>.<br/>(Lùi thì: is → was. Dùng từ nối 'if' cho câu hỏi Yes/No)." },
  { id: 2, question: "Direct: 'Do you like exploring caves?'<br/>Reported: She asked me if I _______ exploring caves.", answer: "<strong>liked</strong>.<br/>(Bỏ trợ động từ 'do', động từ chính 'like' lùi về quá khứ 'liked')." },
  { id: 3, question: "Direct: 'Will you visit Son Doong tomorrow?'<br/>Reported: He asked if I _______ Son Doong _______.", answer: "<strong>would visit / the next day</strong>.<br/>(Will → Would; Tomorrow → The next day)." },
  { id: 4, question: "Phonetics: Choose the word with /sn/ sound:<br/>A. <strong>Sl</strong>eep B. <strong>Sn</strong>ow C. <strong>Sl</strong>ice D. <strong>Sl</strong>ow", answer: "<strong>B. Snow</strong>. Các từ còn lại chứa âm /sl/." },
];

const unit8Exercises: ExerciseItem[] = [
  { id: 1, question: "The guide _______ speaks English is excellent.", answer: "<strong>who</strong>.<br/>(Who thay thế cho danh từ chỉ người 'The guide' và làm chủ ngữ cho động từ 'speaks')." },
  { id: 2, question: "Ha Long Bay, _______ is in Vietnam, is famous.", answer: "<strong>which</strong>.<br/>(Mệnh đề không xác định có dấu phẩy, dùng 'which' cho vật/địa điểm, không dùng 'that')." },
  { id: 3, question: "The tourist _______ luggage was lost is complaining.", answer: "<strong>whose</strong>.<br/>(Whose chỉ sự sở hữu: 'hành lý của du khách đó')." },
  { id: 4, question: "Stress Pattern: Choose the word with different stress:<br/>A. Volc<strong>a</strong>nic B. Art<strong>i</strong>stic C. Hist<strong>o</strong>ric D. P<strong>o</strong>litics", answer: "<strong>D. Politics</strong> (nhấn âm 1).<br/>Quy tắc: Đuôi -ic nhấn trọng âm vào âm tiết ngay trước nó (Vol-CAN-ic, Ar-TIS-tic, His-TOR-ic)." },
];

const unit9Vocab: VocabItem[] = [
  { word: "Bilingual", ipa: "/baɪˈlɪŋɡwəl/ (adj)", meaning: "<strong>Song ngữ</strong>. Nói được 2 ngôn ngữ.<br/><em class='text-xs text-gray-500'>Ví dụ: bilingual education.</em>" },
  { word: "Fluent", ipa: "/ˈfluːənt/ (adj)", meaning: "<strong>Lưu loát, thông thạo</strong>.<br/><em class='text-xs text-gray-500'>Hay đi với: fluent in English. Danh từ: fluency = sự lưu loát.</em>" },
  { word: "First Language", ipa: "/fɜːst ˈlæŋɡwɪdʒ/ (n)", meaning: "<strong>Tiếng mẹ đẻ</strong> (= mother tongue).<br/><em class='text-xs text-gray-500'>So sánh: Second language (ngôn ngữ thứ hai).</em>" },
  { word: "Official Language", ipa: "/əˈfɪʃl ˈlæŋɡwɪdʒ/ (n)", meaning: "<strong>Ngôn ngữ chính thức</strong>. Được chính phủ công nhận.<br/><em class='text-xs text-gray-500'>Ví dụ: English is the official language of many countries.</em>" },
  { word: "Variety", ipa: "/vəˈraɪəti/ (n)", meaning: "<strong>Biến thể</strong> (của ngôn ngữ).<br/><em class='text-xs text-gray-500'>Ví dụ: There are many varieties of English worldwide.</em>" },
  { word: "Accent", ipa: "/ˈæksent/ (n)", meaning: "<strong>Giọng nói</strong>. Cách phát âm đặc trưng của vùng miền.<br/><em class='text-xs text-gray-500'>Khác với Dialect (phương ngữ - cả từ vựng + ngữ pháp).</em>" },
  { word: "Native Speaker", ipa: "/ˈneɪtɪv ˈspiːkər/ (n)", meaning: "<strong>Người bản ngữ</strong>.<br/><em class='text-xs text-gray-500'>Đối lập: Non-native speaker.</em>" },
  { word: "Borrowed Word", ipa: "/ˈbɒrəʊd wɜːd/ (n)", meaning: "<strong>Từ mượn</strong>. Từ vay mượn từ ngôn ngữ khác.<br/><em class='text-xs text-gray-500'>Ví dụ: 'Karate' mượn từ tiếng Nhật.</em>" },
];

const unit9Exercises: ExerciseItem[] = [
  { id: 1, question: "English is a language _______ is spoken all over the world.", answer: "<strong>which / that</strong>.<br/>(Đại từ quan hệ thay thế cho 'a language' - vật, làm chủ ngữ)." },
  { id: 2, question: "People _______ speak more than two languages are called multilingual.", answer: "<strong>who</strong>.<br/>(Who thay thế cho 'People' - người, làm chủ ngữ)." },
  { id: 3, question: "The country _______ official language is English has many dialects.", answer: "<strong>whose</strong>.<br/>(Whose chỉ sự sở hữu: 'ngôn ngữ chính thức của quốc gia đó')." },
  { id: 4, question: "She asked me _______ I could speak French fluently.", answer: "<strong>if / whether</strong>.<br/>(Reported Yes/No question: Can you speak...? → asked if I could speak...)." },
];

const review3Exercises: ExerciseItem[] = [
  { id: 1, question: "Ha Long Bay is one of the most _______ natural wonders in the world.<br/>A. magnificent B. affordable C. bilingual D. fluent", answer: "<strong>A. magnificent</strong>.<br/>(Magnificent = tráng lệ, dùng mô tả kỳ quan thiên nhiên. Unit 7)." },
  { id: 2, question: "'Do you have the _______?' the guide asked. He wanted to know our travel plan.<br/>A. accent B. itinerary C. variety D. heritage", answer: "<strong>B. itinerary</strong>.<br/>(Itinerary = lịch trình chi tiết. Unit 8)." },
  { id: 3, question: "There are many _______ of English spoken around the world.<br/>A. destinations B. expeditions C. varieties D. wonders", answer: "<strong>C. varieties</strong>.<br/>(Varieties of English = các biến thể tiếng Anh. Unit 9)." },
  { id: 4, question: "Direct: 'Are you a native speaker?'<br/>Reported: He asked me _______.", answer: "<strong>if I was a native speaker</strong>.<br/>(Yes/No question → if/whether + lùi thì: are → was)." },
  { id: 5, question: "The tourist _______ visited Ha Long Bay last year wants to come back.", answer: "<strong>who</strong>.<br/>(Who thay thế 'The tourist' - người, làm chủ ngữ. Defining relative clause)." },
  { id: 6, question: "English, _______ is spoken by millions, has many varieties.", answer: "<strong>which</strong>.<br/>(Non-defining clause có dấu phẩy → dùng which, không dùng that)." },
];

export const quizQuestions: QuizQuestion[] = [
  // Unit 7 - Vocabulary
  { id: 1, question: "Ha Long Bay is a UNESCO World _______ Site.", options: ["Heritage", "Wonder", "Limestone", "Expedition"], correct: 0, explanation: "World Heritage Site = Di sản Thế giới.", unit: 7 },
  { id: 2, question: "The view from the top of the mountain was _______.", options: ["affordable", "bilingual", "breathtaking", "accessible"], correct: 2, explanation: "Breathtaking = đẹp đến nghẹt thở.", unit: 7 },
  { id: 3, question: "We need _______ tourism to protect the environment.", options: ["sustainable", "magnificent", "fluent", "official"], correct: 0, explanation: "Sustainable tourism = du lịch bền vững.", unit: 7 },
  { id: 4, question: "The caves are made of _______.", options: ["heritage", "limestone", "accent", "variety"], correct: 1, explanation: "Limestone = đá vôi.", unit: 7 },
  { id: 5, question: "They want to _______ the jungle to discover new species.", options: ["explore", "borrow", "promote", "check in"], correct: 0, explanation: "Explore = khám phá, thám hiểm.", unit: 7 },
  // Unit 7 - Grammar (Reported Speech)
  { id: 6, question: "'Is Son Doong beautiful?' → He asked _______.", options: ["if Son Doong was beautiful", "is Son Doong beautiful", "if Son Doong is beautiful", "that Son Doong was beautiful"], correct: 0, explanation: "Yes/No question → if + lùi thì (is → was).", unit: 7 },
  { id: 7, question: "'Do you like caves?' → She asked me _______.", options: ["do I like caves", "if I liked caves", "that I like caves", "whether did I like caves"], correct: 1, explanation: "Bỏ trợ động từ 'do', lùi thì: like → liked.", unit: 7 },
  { id: 8, question: "'Will you travel tomorrow?' → He asked if I _______ the next day.", options: ["will travel", "would travel", "traveled", "had traveled"], correct: 1, explanation: "Will → Would; tomorrow → the next day.", unit: 7 },
  // Unit 7 - Phonetics
  { id: 9, question: "Which word contains the /sn/ sound?", options: ["sleep", "snow", "slice", "slow"], correct: 1, explanation: "Snow /snəʊ/ - các từ còn lại chứa /sl/.", unit: 7 },
  { id: 10, question: "Which word contains the /sl/ sound?", options: ["snake", "snack", "slippery", "sneakers"], correct: 2, explanation: "Slippery /ˈslɪpəri/ - các từ còn lại chứa /sn/.", unit: 7 },
  // Unit 8 - Vocabulary
  { id: 11, question: "We booked a _______ to Thailand including flights and hotel.", options: ["package holiday", "expedition", "heritage site", "natural wonder"], correct: 0, explanation: "Package holiday = kỳ nghỉ trọn gói.", unit: 8 },
  { id: 12, question: "Da Nang is a popular tourist _______.", options: ["accent", "variety", "destination", "speaker"], correct: 2, explanation: "Tourist destination = điểm đến du lịch.", unit: 8 },
  { id: 13, question: "_______ is tourism that aims to protect the environment.", options: ["Expedition", "Ecotourism", "Itinerary", "Heritage"], correct: 1, explanation: "Ecotourism = du lịch sinh thái.", unit: 8 },
  { id: 14, question: "Have you planned the _______ for our trip?", options: ["accent", "itinerary", "dialect", "wonder"], correct: 1, explanation: "Itinerary = lịch trình chi tiết.", unit: 8 },
  { id: 15, question: "The hotel is very _______; we can afford it.", options: ["breathtaking", "magnificent", "affordable", "sustainable"], correct: 2, explanation: "Affordable = giá cả phải chăng.", unit: 8 },
  // Unit 8 - Grammar (Articles)
  { id: 16, question: "_______ Nile is the longest river in Africa.", options: ["A", "An", "The", "Ø (no article)"], correct: 2, explanation: "Dùng THE cho tên sông (the Nile, the Mekong).", unit: 8 },
  { id: 17, question: "She wants to be _______ tour guide.", options: ["a", "an", "the", "Ø (no article)"], correct: 0, explanation: "Dùng 'a' trước danh từ đếm được số ít (tour guide).", unit: 8 },
  { id: 18, question: "_______ Mount Everest is the highest mountain in the world.", options: ["A", "An", "The", "Ø (no article)"], correct: 3, explanation: "Không dùng mạo từ trước tên núi đơn (Mount Everest).", unit: 8 },
  // Unit 8 - Phonetics
  { id: 19, question: "Which word has DIFFERENT stress from the others?", options: ["volcanic", "artistic", "historic", "politics"], correct: 3, explanation: "Politics nhấn âm 1 (PO-li-tics). Các từ khác nhấn âm trước -ic.", unit: 8 },
  { id: 20, question: "Which word has stress on the second syllable?", options: ["previous", "ambitious", "spacious", "serious"], correct: 1, explanation: "Am-BI-tious nhấn âm 2. Các từ khác nhấn âm 1.", unit: 8 },
  // Unit 9 - Vocabulary
  { id: 21, question: "A person who speaks two languages is _______.", options: ["fluent", "bilingual", "native", "official"], correct: 1, explanation: "Bilingual = song ngữ (nói được 2 ngôn ngữ).", unit: 9 },
  { id: 22, question: "The word 'karate' is a _______ word from Japanese.", options: ["native", "official", "borrowed", "standard"], correct: 2, explanation: "Borrowed word = từ mượn.", unit: 9 },
  { id: 23, question: "She is _______ in both English and French.", options: ["fluent", "bilingual", "accessible", "affordable"], correct: 0, explanation: "Fluent in = thông thạo (ngôn ngữ).", unit: 9 },
  { id: 24, question: "Vietnamese is my _______; English is my second language.", options: ["official language", "variety", "first language", "accent"], correct: 2, explanation: "First language = tiếng mẹ đẻ = mother tongue.", unit: 9 },
  // Unit 9 - Grammar (Relative Clauses)
  { id: 25, question: "The man _______ teaches us English is from the UK.", options: ["which", "who", "whose", "whom"], correct: 1, explanation: "Who thay thế cho người (The man), làm chủ ngữ.", unit: 9 },
  { id: 26, question: "English is a language _______ is spoken worldwide.", options: ["who", "whose", "which", "whom"], correct: 2, explanation: "Which thay thế cho vật (a language).", unit: 9 },
  { id: 27, question: "The student _______ mother is a linguist speaks three languages.", options: ["who", "which", "that", "whose"], correct: 3, explanation: "Whose chỉ sở hữu: 'mẹ của học sinh đó'.", unit: 9 },
  { id: 28, question: "The book _______ I borrowed is about World Englishes.", options: ["who", "which", "whose", "whom"], correct: 1, explanation: "Which thay thế cho vật (The book), làm tân ngữ.", unit: 9 },
  // Unit 9 - Phonetics
  { id: 29, question: "Which word has stress on the THIRD syllable?", options: ["beautiful", "difficult", "understand", "realize"], correct: 2, explanation: "Un-der-STAND nhấn âm 3. Còn lại nhấn âm 1.", unit: 9 },
  { id: 30, question: "Which word has stress on the FIRST syllable?", options: ["bilingual", "official", "languages", "accessible"], correct: 2, explanation: "LAN-gua-ges nhấn âm 1. Còn lại nhấn âm 2.", unit: 9 },
  // Review 3 - Mixed
  { id: 31, question: "'Can you speak Japanese?' → She asked _______.", options: ["if I can speak Japanese", "if I could speak Japanese", "can I speak Japanese", "that I could speak Japanese"], correct: 1, explanation: "Yes/No → if + lùi thì: can → could.", unit: 0 },
  { id: 32, question: "The city _______ we visited last summer was beautiful.", options: ["who", "which", "whose", "whom"], correct: 1, explanation: "Which thay thế cho 'the city' (vật), làm tân ngữ.", unit: 0 },
  { id: 33, question: "_______ Philippines is a country in Southeast Asia.", options: ["A", "An", "The", "Ø (no article)"], correct: 2, explanation: "Dùng THE cho tên nước số nhiều (the Philippines).", unit: 0 },
  { id: 34, question: "Tourists love the _______ scenery of Phong Nha Cave.", options: ["affordable", "magnificent", "bilingual", "fluent"], correct: 1, explanation: "Magnificent = tráng lệ (mô tả cảnh quan).", unit: 0 },
  { id: 35, question: "She is a _______ speaker of Vietnamese.", options: ["official", "first", "native", "borrowed"], correct: 2, explanation: "Native speaker = người bản ngữ.", unit: 0 },
  { id: 36, question: "'Where is the hotel?' → He asked _______.", options: ["where is the hotel", "where the hotel was", "where was the hotel", "if the hotel was"], correct: 1, explanation: "Wh-question → giữ từ hỏi + đảo S-V + lùi thì.", unit: 0 },
  { id: 37, question: "I talked to the girl _______ father is a famous explorer.", options: ["who", "which", "that", "whose"], correct: 3, explanation: "Whose chỉ sở hữu: 'bố của cô gái'.", unit: 0 },
  { id: 38, question: "We should promote _______ tourism to protect natural wonders.", options: ["package", "affordable", "sustainable", "accessible"], correct: 2, explanation: "Sustainable tourism = du lịch bền vững.", unit: 0 },
  { id: 39, question: "English has many regional _______.", options: ["speakers", "varieties", "wonders", "expeditions"], correct: 1, explanation: "Varieties of English = biến thể tiếng Anh.", unit: 0 },
  { id: 40, question: "'Have you visited Sapa?' → She asked if I _______ Sapa.", options: ["have visited", "had visited", "visited", "visiting"], correct: 1, explanation: "Present perfect → Past perfect: have visited → had visited.", unit: 0 },
];

export const lessons: Lesson[] = [
  // --- UNIT 7 ---
  {
    id: 0,
    title: "Unit 7: Từ vựng Kỳ quan",
    unit: 7,
    icon: Mountain,
    color: "from-cyan-600 to-blue-600",
    content: (
      <div>
        <div className="bg-cyan-50 p-6 rounded-2xl mb-8 border border-cyan-100">
          <h2 className="text-2xl font-bold text-cyan-800 mb-2">Natural Wonders of the World</h2>
          <p className="text-cyan-700">Tập trung vào từ vựng mô tả cảnh quan (Landscape), địa chất (Limestone) và các tính từ biểu cảm mạnh (Breathtaking, Magnificent).</p>
        </div>
        <VocabTable items={unit7Vocab} colorTheme="bg-gradient-to-r from-cyan-600 to-blue-600" />
      </div>
    )
  },
  {
    id: 1,
    title: "Unit 7: Ngữ pháp Câu tường thuật",
    unit: 7,
    icon: Compass,
    color: "from-blue-500 to-indigo-600",
    content: (
      <div>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <p className="text-yellow-800 font-bold">Trọng tâm: Reported Speech (Yes/No Questions)</p>
          <p className="text-yellow-700 text-sm mt-1">Cấu trúc: <strong>S + asked + if/whether + S + V (lùi thì)</strong></p>
        </div>

        <GrammarBox
          title="Quy tắc LÙI THÌ (quan trọng nhất!)"
          color="bg-indigo-600"
          rule={
            <div className="space-y-2 text-sm md:text-base">
              <div className="grid grid-cols-2 gap-2 border-b pb-2">
                <span className="font-semibold text-gray-600">Trực tiếp (Direct)</span>
                <span className="font-semibold text-indigo-600">Gián tiếp (Reported)</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span>Present Simple (V/Vs)</span>
                <span>Past Simple (Ved/V2)</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span>"Do you like it?"</span>
                <span>...if I <strong>liked</strong> it. (Bỏ Do)</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span>Future (Will)</span>
                <span>Would</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span>Tomorrow</span>
                <span>The next day / The following day</span>
              </div>
            </div>
          }
          examples={[
            {
              correct: "He asked if I liked the cave.",
              incorrect: "He asked if did I like the cave.",
              explain: "Sai lầm phổ biến: Giữ lại trợ động từ 'did' hoặc không đảo ngữ lại về dạng khẳng định."
            },
            {
              correct: "She asked if I had visited Ha Long.",
              explain: "Quá khứ đơn (Did you visit) lùi về Quá khứ hoàn thành (had visited)."
            }
          ]}
        />

        <div className="space-y-4">
          {unit7Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Unit 7: Ngữ âm /sl/ & /sn/",
    unit: 7,
    icon: Mic,
    color: "from-indigo-500 to-purple-500",
    content: (
      <div>
        <h2 className="text-2xl font-bold text-indigo-800 mb-6">Cách đọc âm /sl/ và /sn/</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <PhoneticCard
            pair="/sl/"
            words={["sleepy", "slice", "slope", "slowly", "slippery"]}
            tip="Âm /s/ kết hợp /l/. Lưỡi hạ xuống hai bên để hơi thoát ra."
          />
          <PhoneticCard
            pair="/sn/"
            words={["snow", "snake", "snack", "snail", "sneakers"]}
            tip="Âm /s/ kết hợp âm mũi /n/. Luồng hơi chuyển nhanh lên mũi."
          />
        </div>
        <div className="mt-8 bg-purple-50 p-6 rounded-xl border border-purple-100 text-center">
          <p className="font-bold text-purple-900 text-lg mb-2">Tongue Twister (Xoắn lưỡi)</p>
          <p className="text-xl font-medium text-purple-600 italic">"Alice <strong className="text-purple-800">sl</strong>ipped while she was making a <strong className="text-purple-800">sn</strong>owman."</p>
        </div>
      </div>
    )
  },

  // --- UNIT 8 ---
  {
    id: 3,
    title: "Unit 8: Từ vựng Du lịch",
    unit: 8,
    icon: Plane,
    color: "from-amber-500 to-orange-500",
    content: (
      <div>
        <div className="bg-amber-50 p-6 rounded-2xl mb-8 border border-amber-100">
          <h2 className="text-2xl font-bold text-amber-800 mb-2">Tourism Industry</h2>
          <p className="text-amber-700">Từ vựng chức năng về lập kế hoạch (Itinerary, Brochure) và các loại hình du lịch mới (Ecotourism, Safari).</p>
        </div>
        <VocabTable items={unit8Vocab} colorTheme="bg-gradient-to-r from-amber-500 to-orange-500" />
      </div>
    )
  },
  {
    id: 4,
    title: "Unit 8: Ngữ pháp Mệnh đề quan hệ",
    unit: 8,
    icon: Map,
    color: "from-orange-500 to-red-500",
    content: (
      <div>
        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-8">
          <p className="text-orange-800 font-bold">Relative Clauses (Mệnh đề quan hệ)</p>
          <p className="text-orange-700 text-sm mt-1">Sử dụng Who, Which, Whose để nối câu và bổ sung thông tin.</p>
        </div>

        <GrammarBox
          title="Đại từ quan hệ (Relative Pronouns)"
          color="bg-red-600"
          rule={
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white p-3 rounded border border-gray-200">
                <strong className="text-red-600 block text-lg">WHO</strong>
                <span className="text-gray-600 text-sm">Chỉ NGƯỜI (Chủ ngữ/Tân ngữ)</span>
              </div>
              <div className="bg-white p-3 rounded border border-gray-200">
                <strong className="text-red-600 block text-lg">WHICH</strong>
                <span className="text-gray-600 text-sm">Chỉ VẬT (Chủ ngữ/Tân ngữ)</span>
              </div>
              <div className="bg-white p-3 rounded border border-gray-200">
                <strong className="text-red-600 block text-lg">WHOSE</strong>
                <span className="text-gray-600 text-sm">Chỉ SỞ HỮU (Whose + Noun)</span>
              </div>
            </div>
          }
          examples={[
            {
              correct: "The man who called is here.",
              incorrect: "The man who he called is here.",
              explain: "Lỗi lặp từ: 'Who' đã thay thế cho 'he', không được viết lại 'he'."
            },
            {
              correct: "Ha Long Bay, which is in VN, is famous.",
              explain: "Non-defining clause (có dấu phẩy): Bắt buộc dùng Which, không dùng That."
            }
          ]}
        />

        <div className="space-y-4 mt-8">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2 mb-4"><ClipboardCheck className="text-orange-600" /> Luyện tập</h3>
          {unit8Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Unit 8: Trọng âm từ (-ic, -ious)",
    unit: 8,
    icon: Mic,
    color: "from-red-500 to-rose-600",
    content: (
      <div>
        <h2 className="text-2xl font-bold text-rose-800 mb-6">Quy tắc: Nhấn âm TRƯỚC đuôi -ic / -ious</h2>
        <div className="bg-rose-50 p-4 rounded-xl mb-6 text-rose-800">
          Quy tắc: Đối với từ kết thúc bằng đuôi <strong>-ic</strong> hoặc <strong>-ious</strong>, trọng âm luôn rơi vào âm tiết <strong>ngay trước</strong> nó.
        </div>
        <div className="grid md:grid-cols-2 gap-6 h-auto">
          <PhoneticCard
            pair="Suffix -IC"
            words={["Ar-TIS-tic", "Ter-RIF-ic", "Re-a-LIS-tic", "Sym-BOL-ic", "Vol-CAN-ic"]}
            tip="Nhấn vào âm tiết ngay trước -ic."
          />
          <PhoneticCard
            pair="Suffix -IOUS"
            words={["Am-BI-tious", "Mys-TE-rious", "PRE-vious", "SPA-cious", "Vic-TO-rious"]}
            tip="Nhấn vào âm tiết ngay trước -ious."
          />
        </div>
      </div>
    )
  },

  // --- UNIT 9 ---
  {
    id: 6,
    title: "Unit 9: Từ vựng Tiếng Anh Thế giới",
    unit: 9,
    icon: Languages,
    color: "from-violet-500 to-purple-600",
    content: (
      <div>
        <div className="bg-violet-50 p-6 rounded-2xl mb-8 border border-violet-100">
          <h2 className="text-2xl font-bold text-violet-800 mb-2">World Englishes</h2>
          <p className="text-violet-700">Từ vựng về ngôn ngữ, các biến thể tiếng Anh, người bản ngữ và từ mượn.</p>
        </div>
        <VocabTable items={unit9Vocab} colorTheme="bg-gradient-to-r from-violet-500 to-purple-600" />
      </div>
    )
  },
  {
    id: 7,
    title: "Unit 9: Ngữ pháp Mệnh đề quan hệ xác định",
    unit: 9,
    icon: Globe,
    color: "from-purple-500 to-fuchsia-600",
    content: (
      <div>
        <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-8">
          <p className="text-purple-800 font-bold">Defining Relative Clauses (Mệnh đề quan hệ xác định)</p>
          <p className="text-purple-700 text-sm mt-1">Dùng <strong>who, which, that</strong> để xác định danh từ đứng trước.</p>
        </div>

        <GrammarBox
          title="Đại từ quan hệ trong Defining Clauses"
          color="bg-purple-600"
          rule={
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white p-3 rounded border border-gray-200">
                <strong className="text-purple-600 block text-lg">WHO / THAT</strong>
                <span className="text-gray-600 text-sm">Chỉ NGƯỜI</span>
              </div>
              <div className="bg-white p-3 rounded border border-gray-200">
                <strong className="text-purple-600 block text-lg">WHICH / THAT</strong>
                <span className="text-gray-600 text-sm">Chỉ VẬT</span>
              </div>
              <div className="bg-white p-3 rounded border border-gray-200">
                <strong className="text-purple-600 block text-lg">WHOSE</strong>
                <span className="text-gray-600 text-sm">Chỉ SỞ HỮU</span>
              </div>
            </div>
          }
          examples={[
            {
              correct: "People who speak two languages are bilingual.",
              incorrect: "People which speak two languages are bilingual.",
              explain: "Dùng WHO cho người, không dùng WHICH."
            },
            {
              correct: "English is a language that is spoken worldwide.",
              explain: "Có thể dùng THAT thay cho WHICH trong mệnh đề xác định."
            }
          ]}
        />

        <div className="space-y-4 mt-8">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2 mb-4"><ClipboardCheck className="text-purple-600" /> Luyện tập</h3>
          {unit9Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  {
    id: 8,
    title: "Unit 9: Trọng âm đuôi -ion & -ity",
    unit: 9,
    icon: Mic,
    color: "from-fuchsia-500 to-pink-500",
    content: (
      <div>
        <h2 className="text-2xl font-bold text-fuchsia-800 mb-6">Trọng âm từ kết thúc bằng -ion & -ity</h2>
        <div className="bg-fuchsia-50 p-4 rounded-xl mb-6 text-fuchsia-800">
          Quy tắc: Đối với từ kết thúc bằng đuôi <strong>-ion</strong> hoặc <strong>-ity</strong>, trọng âm luôn rơi vào âm tiết <strong>ngay trước</strong> nó.
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <PhoneticCard
            pair="Suffix -ION"
            words={["re-LA-tion", "e-du-CA-tion", "in-for-MA-tion", "pro-NUN-ci-a-tion", "com-mu-ni-CA-tion"]}
            tip="Nhấn vào âm tiết ngay trước -ion."
          />
          <PhoneticCard
            pair="Suffix -ITY"
            words={["CHA-ri-ty", "a-BI-li-ty", "ac-TI-vi-ty", "per-so-NA-li-ty", "u-ni-VER-si-ty"]}
            tip="Nhấn vào âm tiết ngay trước -ity."
          />
        </div>
      </div>
    )
  },

  // --- REVIEW 3 ---
  {
    id: 9,
    title: "Review 3: Ôn tập từ vựng tổng hợp",
    unit: 0,
    icon: RotateCcw,
    color: "from-emerald-500 to-teal-600",
    content: (
      <div>
        <div className="bg-emerald-50 p-6 rounded-2xl mb-8 border border-emerald-100">
          <h2 className="text-2xl font-bold text-emerald-800 mb-2">🔄 Review 3: Tổng hợp Unit 7-9</h2>
          <p className="text-emerald-700">Ôn tập tổng hợp từ vựng, ngữ pháp, và ngữ âm từ cả 3 unit.</p>
        </div>
        <div className="space-y-4">
          {review3Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  {
    id: 10,
    title: "Review 3: Ngữ pháp tổng hợp",
    unit: 0,
    icon: Star,
    color: "from-teal-500 to-cyan-600",
    content: (
      <div>
        <div className="bg-teal-50 border-l-4 border-teal-400 p-4 mb-8">
          <p className="text-teal-800 font-bold">Tổng hợp Ngữ pháp: Reported Speech + Relative Clauses + Articles</p>
        </div>

        <GrammarBox
          title="1. Reported Yes/No Questions"
          color="bg-indigo-600"
          rule={
            <div className="text-sm md:text-base">
              <p><strong>S + asked + if/whether + S + V (lùi thì)</strong></p>
              <p className="mt-2 text-gray-500">Lùi thì: is→was, do→did, will→would, can→could, have→had</p>
            </div>
          }
          examples={[
            { correct: "She asked if I was a native speaker.", explain: "Are you...? → asked if I was..." },
          ]}
        />
        <GrammarBox
          title="2. Relative Clauses (Who/Which/Whose)"
          color="bg-orange-600"
          rule={
            <div className="text-sm md:text-base">
              <p><strong>Who</strong> (người) | <strong>Which</strong> (vật) | <strong>Whose</strong> (sở hữu)</p>
              <p className="mt-2 text-gray-500">Non-defining (có dấu phẩy) → KHÔNG dùng THAT</p>
            </div>
          }
          examples={[
            { correct: "The tourist who visited Sapa loved it.", explain: "Who = the tourist (person, subject)" },
            { correct: "English, which is global, has many varieties.", explain: "Non-defining → which, NOT that" },
          ]}
        />
        <GrammarBox
          title="3. Articles (a/an/the/Ø)"
          color="bg-teal-600"
          rule={
            <div className="text-sm md:text-base">
              <p><strong>THE</strong>: sông, biển, dãy núi, nước số nhiều. <strong>Ø</strong>: núi đơn, hồ, lục địa.</p>
            </div>
          }
          examples={[
            { correct: "The Mekong River flows through Vietnam.", explain: "THE + tên sông" },
            { correct: "Mount Fansipan is the highest peak.", incorrect: "The Mount Fansipan is...", explain: "Không dùng THE trước tên núi đơn" },
          ]}
        />
      </div>
    )
  }
];

// =====================================================
// UNIT 10 – PLANET EARTH (Trái Đất)
// =====================================================

const unit10Vocab: VocabItem[] = [
  { word: "Nature Reserve", ipa: "/ˈneɪtʃər rɪˈzɜːv/ (n)", meaning: "<strong>Khu bảo tồn thiên nhiên</strong>. Khu vực được bảo vệ để giữ nguyên hệ sinh thái.<br/><em class='text-xs text-gray-500'>Ví dụ: Cuc Phuong is a nature reserve in Vietnam.</em>" },
  { word: "Ecological Balance", ipa: "/ˌiːkəˈlɒdʒɪkl ˈbæləns/ (n)", meaning: "<strong>Cân bằng sinh thái</strong>. Trạng thái ổn định giữa các sinh vật.<br/><em class='text-xs text-gray-500'>Ví dụ: We must maintain the ecological balance.</em>" },
  { word: "Habitat Loss", ipa: "/ˈhæbɪtæt lɒs/ (n)", meaning: "<strong>Mất môi trường sống</strong>. Khi nơi ở tự nhiên bị phá hủy.<br/><em class='text-xs text-gray-500'>Nguyên nhân: Deforestation, urbanization.</em>" },
  { word: "Grassland", ipa: "/ˈɡrɑːslænd/ (n)", meaning: "<strong>Đồng cỏ</strong>. Vùng đất rộng phủ đầy cỏ.<br/><em class='text-xs text-gray-500'>Ví dụ: African grasslands are home to many animals.</em>" },
  { word: "Flora", ipa: "/ˈflɔːrə/ (n)", meaning: "<strong>Hệ thực vật</strong>. Tất cả các loại cây, hoa trong một vùng.<br/><em class='text-xs text-gray-500'>Hay đi với: Flora and fauna (hệ động thực vật).</em>" },
  { word: "Fauna", ipa: "/ˈfɔːnə/ (n)", meaning: "<strong>Hệ động vật</strong>. Tất cả các loài động vật trong một vùng.<br/><em class='text-xs text-gray-500'>Ví dụ: The fauna of this island is diverse.</em>" },
  { word: "Species", ipa: "/ˈspiːʃiːz/ (n)", meaning: "<strong>Loài</strong>. Nhóm sinh vật có đặc điểm chung.<br/><em class='text-xs text-gray-500'>Chú ý: Species (số ít) = Species (số nhiều).</em>" },
  { word: "Ecosystem", ipa: "/ˈiːkəʊsɪstəm/ (n)", meaning: "<strong>Hệ sinh thái</strong>. Cộng đồng sinh vật + môi trường sống.<br/><em class='text-xs text-gray-500'>Ví dụ: Coral reefs are important ecosystems.</em>" },
];

const unit10Exercises: ExerciseItem[] = [
  { id: 1, question: "Earth<strong>, which</strong> is the third planet from the Sun<strong>,</strong> depends on the Sun for energy.<br/>Đây là loại mệnh đề gì?", answer: "<strong>Non-defining relative clause</strong> (Mệnh đề quan hệ không xác định).<br/>(Có dấu phẩy ngăn cách, bổ sung thêm thông tin, bỏ đi câu vẫn có nghĩa.)" },
  { id: 2, question: "Cuc Phuong National Park, _______ is in Ninh Binh, has diverse flora and fauna.", answer: "<strong>which</strong>.<br/>(Non-defining clause có dấu phẩy → dùng 'which', KHÔNG dùng 'that'.)" },
  { id: 3, question: "Dr. Jane Goodall, _______ has studied chimpanzees for decades, is a famous scientist.", answer: "<strong>who</strong>.<br/>(Non-defining clause: 'who' cho người. Không được lược bỏ đại từ quan hệ.)" },
  { id: 4, question: "The Amazon rainforest, _______ area is decreasing, is vital for the planet.", answer: "<strong>whose</strong>.<br/>(Whose chỉ sở hữu: 'diện tích của rừng Amazon'.)" },
];

// =====================================================
// UNIT 11 – ELECTRONIC DEVICES (Thiết bị điện tử)
// =====================================================

const unit11Vocab: VocabItem[] = [
  { word: "3D Printer", ipa: "/ˌθriː diː ˈprɪntər/ (n)", meaning: "<strong>Máy in 3D</strong>. In ra vật thể 3 chiều từ mô hình số.<br/><em class='text-xs text-gray-500'>Ví dụ: A 3D printer can create objects from plastic.</em>" },
  { word: "Camcorder", ipa: "/ˈkæmkɔːdər/ (n)", meaning: "<strong>Máy quay phim</strong> cầm tay.<br/><em class='text-xs text-gray-500'>Camera + Recorder = Camcorder.</em>" },
  { word: "Smartwatch", ipa: "/ˈsmɑːtwɒtʃ/ (n)", meaning: "<strong>Đồng hồ thông minh</strong>. Kết nối điện thoại, đo sức khỏe.<br/><em class='text-xs text-gray-500'>Ví dụ: My smartwatch tracks my steps.</em>" },
  { word: "E-reader", ipa: "/ˈiːriːdər/ (n)", meaning: "<strong>Máy đọc sách điện tử</strong>. Thiết bị chuyên đọc ebook.<br/><em class='text-xs text-gray-500'>Ví dụ: Kindle is a popular e-reader.</em>" },
  { word: "Copper", ipa: "/ˈkɒpər/ (n)", meaning: "<strong>Đồng</strong> (kim loại). Dùng làm dây điện.<br/><em class='text-xs text-gray-500'>Ví dụ: Copper is used to make electrical wires.</em>" },
  { word: "Rubber", ipa: "/ˈrʌbər/ (n)", meaning: "<strong>Cao su</strong>. Chất liệu đàn hồi, cách điện.<br/><em class='text-xs text-gray-500'>Ví dụ: Rubber is used to cover wires for safety.</em>" },
  { word: "Gadget", ipa: "/ˈɡædʒɪt/ (n)", meaning: "<strong>Thiết bị nhỏ, đồ công nghệ</strong>.<br/><em class='text-xs text-gray-500'>Đồng nghĩa: Device. Ví dụ: Electronic gadgets.</em>" },
  { word: "Portable", ipa: "/ˈpɔːtəbl/ (adj)", meaning: "<strong>Xách tay, di động</strong>. Dễ mang theo.<br/><em class='text-xs text-gray-500'>Ví dụ: A portable speaker is easy to carry.</em>" },
];

const unit11Exercises: ExerciseItem[] = [
  { id: 1, question: "My teacher _______ using a tablet for studying.<br/>(suggest / advise / recommend + V-ing)", answer: "<strong>suggested / advised / recommended</strong>.<br/>(suggest/advise/recommend + V-ing: suggest using... = gợi ý việc sử dụng.)" },
  { id: 2, question: "She recommended that we _______ a new laptop for school.", answer: "<strong>(should) buy</strong>.<br/>(recommend + that + S + (should) + V nguyên thể.)" },
  { id: 3, question: "The expert advised _______ (turn off) devices when not in use.", answer: "<strong>turning off</strong>.<br/>(advise + V-ing = khuyên nên làm gì.)" },
  { id: 4, question: "They suggested that the students _______ (not use) phones in class.", answer: "<strong>(should) not use</strong>.<br/>(suggest + that + S + should not + V nguyên thể.)" },
];

// =====================================================
// UNIT 12 – MY FUTURE CAREER (Nghề nghiệp tương lai)
// =====================================================

const unit12Vocab: VocabItem[] = [
  { word: "Career", ipa: "/kəˈrɪər/ (n)", meaning: "<strong>Sự nghiệp</strong>. Công việc lâu dài trong một lĩnh vực.<br/><em class='text-xs text-gray-500'>Khác với Job (công việc cụ thể): Career = lộ trình nghề nghiệp.</em>" },
  { word: "Qualification", ipa: "/ˌkwɒlɪfɪˈkeɪʃn/ (n)", meaning: "<strong>Bằng cấp, chứng chỉ</strong>.<br/><em class='text-xs text-gray-500'>Ví dụ: You need a degree for this job.</em>" },
  { word: "Internship", ipa: "/ˈɪntɜːrnʃɪp/ (n)", meaning: "<strong>Kỳ thực tập</strong>.<br/><em class='text-xs text-gray-500'>Ví dụ: She did an internship at a hospital.</em>" },
  { word: "Application", ipa: "/ˌæplɪˈkeɪʃn/ (n)", meaning: "<strong>Đơn xin việc</strong>.<br/><em class='text-xs text-gray-500'>Apply (v) → Application (n). Ví dụ: I sent an application for the job.</em>" },
  { word: "Interview", ipa: "/ˈɪntəvjuː/ (n/v)", meaning: "<strong>Phỏng vấn</strong>.<br/><em class='text-xs text-gray-500'>Ví dụ: He had a job interview today.</em>" },
  { word: "Salary", ipa: "/ˈsæləri/ (n)", meaning: "<strong>Lương tháng</strong> (cố định).<br/><em class='text-xs text-gray-500'>Khác với Wage (lương theo giờ).</em>" },
  { word: "Entrepreneur", ipa: "/ˌɒntrəprəˈnɜːr/ (n)", meaning: "<strong>Doanh nhân, người khởi nghiệp</strong>.<br/><em class='text-xs text-gray-500'>Ví dụ: Elon Musk is a famous entrepreneur.</em>" },
  { word: "Profession", ipa: "/prəˈfeʃn/ (n)", meaning: "<strong>Nghề nghiệp chuyên môn</strong> (bác sĩ, luật sư...).<br/><em class='text-xs text-gray-500'>Professional (adj) = chuyên nghiệp.</em>" },
  { word: "Skill", ipa: "/skɪl/ (n)", meaning: "<strong>Kỹ năng</strong>.<br/><em class='text-xs text-gray-500'>Ví dụ: Communication skills are important at work.</em>" },
  { word: "Volunteer", ipa: "/ˌvɒlənˈtɪər/ (n/v)", meaning: "<strong>Tình nguyện viên / Tình nguyện</strong>.<br/><em class='text-xs text-gray-500'>Ví dụ: She volunteered at a local school.</em>" },
];

const unit12Exercises: ExerciseItem[] = [
  { id: 1, question: "Direct: 'What do you want to be in the future?'<br/>Reported: He asked me _______ in the future.", answer: "<strong>what I wanted to be</strong>.<br/>(Wh-question → giữ từ hỏi 'what' + S + V lùi thì: want → wanted. Không đảo ngữ.)" },
  { id: 2, question: "Direct: 'Where did you study English?'<br/>Reported: She asked me _______ English.", answer: "<strong>where I had studied</strong>.<br/>(Wh-question + lùi thì: did study → had studied.)" },
  { id: 3, question: "Which word has STRESS on the SECOND syllable?<br/>A. CA-reer B. IN-tern C. SA-la-ry D. VOL-un-teer", answer: "<strong>A. ca-REER</strong>. Nhấn âm 2. Các từ: IN-tern (âm 1), SA-la-ry (âm 1), vol-un-TEER (âm 3)." },
  { id: 4, question: "She asked where _______ my application.<br/>A. did I send B. I had sent C. I send D. have I sent", answer: "<strong>B. I had sent</strong>.<br/>(Wh-question gián tiếp: giữ trật tự S + V, lùi thì: sent → had sent.)" },
];

const review4Exercises: ExerciseItem[] = [
  { id: 1, question: "If we _______ more trees, the air _______ cleaner.<br/>A. plant / will be B. planted / would be C. plants / would D. planting / is", answer: "<strong>A. plant / will be</strong>. (Conditional Type 1 – khả năng thực tế)." },
  { id: 2, question: "Direct: 'Why are you late?' → She asked me _______.", answer: "<strong>why I was late / why I had been late</strong>.<br/>(Wh-question gián tiếp: why + S + V lùi thì.)" },
  { id: 3, question: "If I _______ (have) enough money, I _______ (travel) around the world.", answer: "<strong>had / would travel</strong>. (Conditional Type 2 – điều kiện không thực ở hiện tại.)" },
  { id: 4, question: "The _______ is a professional who treats patients.<br/>A. volunteer B. entrepreneur C. doctor D. internship", answer: "<strong>C. doctor</strong>. Profession = nghề chuyên môn. Volunteer, entrepreneur là danh từ khác, internship là danh từ sự vật." },
  { id: 5, question: "Choose the correct form: If the Earth's temperature _______ (rise) by 2°C, many islands _______ (disappear).", answer: "<strong>rises / will disappear</strong>. (Conditional Type 1)" },
  { id: 6, question: "Direct: 'How many planets are in the Solar System?'<br/>Reported: The teacher asked _______ in the Solar System.", answer: "<strong>how many planets there were / how many planets were</strong>.<br/>(Wh-question gián tiếp: how many + noun + S + V lùi thì.)" },
];

// New quiz questions for Unit 10, 11, 12, Review 4
const newQuizQuestions: QuizQuestion[] = [
  // Unit 10 – Vocabulary
  { id: 41, question: "A person who travels to space is called an _______.", options: ["astronomer", "astronaut", "explorer", "navigator"], correct: 1, explanation: "Astronaut = phi hành gia.", unit: 10 },
  { id: 42, question: "The path of a planet around the Sun is its _______.", options: ["satellite", "atmosphere", "orbit", "galaxy"], correct: 2, explanation: "Orbit = quỹ đạo.", unit: 10 },
  { id: 43, question: "The Moon is a natural _______ of Earth.", options: ["telescope", "satellite", "planet", "orbit"], correct: 1, explanation: "Satellite = vệ tinh. The Moon is Earth's natural satellite.", unit: 10 },
  { id: 44, question: "Scientists use a _______ to observe distant stars.", options: ["telescope", "satellite", "galaxy", "atmosphere"], correct: 0, explanation: "Telescope = kính thiên văn.", unit: 10 },
  { id: 45, question: "Astronauts feel _______ because there is no gravity in space.", options: ["amazing", "weightless", "solar", "orbital"], correct: 1, explanation: "Weightless = không trọng lực.", unit: 10 },
  // Unit 10 – Grammar (Conditional Type 1)
  { id: 46, question: "If we _______ more trees, the air will be cleaner.", options: ["plant", "planted", "will plant", "planting"], correct: 0, explanation: "Conditional Type 1: If + V (hiện tại đơn), will + V. Điều kiện có thể xảy ra.", unit: 10 },
  { id: 47, question: "If it _______ tomorrow, we won't go to the beach.", options: ["rain", "rains", "will rain", "rained"], correct: 1, explanation: "Conditional Type 1: If + V (hiện tại đơn).", unit: 10 },
  { id: 48, question: "She _______ the exam if she studies hard.", options: ["pass", "passes", "will pass", "would pass"], correct: 2, explanation: "Main clause dùng will + V (Type 1).", unit: 10 },
  // Unit 10 – Phonetics (/ʃ/ vs /tʃ/)
  { id: 49, question: "Which word has the /ʃ/ sound?", options: ["cheese", "chain", "shore", "children"], correct: 2, explanation: "Shore /ʃɔːr/ có âm /ʃ/. Các từ còn lại có âm /tʃ/.", unit: 10 },
  { id: 50, question: "Which word has the /tʃ/ sound?", options: ["shoe", "shape", "chef", "champion"], correct: 3, explanation: "Champion /ˈtʃæmpiən/ có âm /tʃ/. Shoe, shape, chef có âm /ʃ/.", unit: 10 },

  // Unit 11 – Vocabulary
  { id: 51, question: "The process of people moving from rural to urban areas is called _______.", options: ["deforestation", "urbanization", "globalization", "migration"], correct: 1, explanation: "Urbanization = đô thị hóa.", unit: 11 },
  { id: 52, question: "Solar and wind power are examples of _______ energy.", options: ["fossil", "nuclear", "renewable", "sustainable"], correct: 2, explanation: "Renewable energy = năng lượng tái tạo.", unit: 11 },
  { id: 53, question: "Carbon _______ from factories are causing global warming.", options: ["migration", "emissions", "populations", "urbanization"], correct: 1, explanation: "Emissions = khí thải.", unit: 11 },
  { id: 54, question: "The destruction of forests is called _______.", options: ["migration", "urbanization", "deforestation", "pollution"], correct: 2, explanation: "Deforestation = nạn phá rừng.", unit: 11 },
  { id: 55, question: "_______ connects countries through trade, culture and technology.", options: ["Deforestation", "Urbanization", "Poverty", "Globalization"], correct: 3, explanation: "Globalization = toàn cầu hóa.", unit: 11 },
  // Unit 11 – Grammar (Conditional Type 2)
  { id: 56, question: "If I _______ a scientist, I would find a cure for cancer.", options: ["am", "was", "were", "will be"], correct: 2, explanation: "Conditional Type 2: If + were (dùng 'were' cho mọi chủ ngữ).", unit: 11 },
  { id: 57, question: "If people used less plastic, there _______ less pollution.", options: ["will be", "is", "would be", "were"], correct: 2, explanation: "Conditional Type 2: Main clause dùng would + V.", unit: 11 },
  { id: 58, question: "She _______ happier if she had a better job. (Type 2)", options: ["is", "would be", "will be", "was"], correct: 1, explanation: "Type 2 main clause: would + V.", unit: 11 },
  // Unit 11 – Phonetics (Linking sounds)
  { id: 59, question: "In the phrase 'turn off', how is 'n' pronounced with 'o'?", options: ["separately", "linked as /nɒ/", "silent", "as /nf/"], correct: 1, explanation: "Linking sound: phụ âm cuối nối với nguyên âm đầu: 'turn_off' → /tɜːn ɒf/.", unit: 11 },
  { id: 60, question: "Which phrase has a clear linking sound?", options: ["look_back", "an_apple", "big_car", "run_fast"], correct: 1, explanation: "'an apple' /æ-ˈnæpl/ – âm /n/ nối với nguyên âm /æ/.", unit: 11 },

  // Unit 12 – Vocabulary
  { id: 61, question: "A _______ is someone who starts their own business.", options: ["volunteer", "entrepreneur", "professional", "intern"], correct: 1, explanation: "Entrepreneur = doanh nhân, người khởi nghiệp.", unit: 12 },
  { id: 62, question: "She did an _______ at a law firm during her summer holiday.", options: ["application", "interview", "internship", "qualification"], correct: 2, explanation: "Internship = kỳ thực tập.", unit: 12 },
  { id: 63, question: "You need to send an _______ form to apply for the job.", options: ["internship", "application", "salary", "career"], correct: 1, explanation: "Application = đơn xin việc.", unit: 12 },
  { id: 64, question: "His monthly _______ is enough to support his family.", options: ["career", "skill", "salary", "profession"], correct: 2, explanation: "Salary = lương tháng (cố định).", unit: 12 },
  { id: 65, question: "She _______ at a local hospital to gain experience.", options: ["applied", "interviewed", "volunteered", "launched"], correct: 2, explanation: "Volunteer = tình nguyện.", unit: 12 },
  // Unit 12 – Grammar (Reported Wh-Questions)
  { id: 66, question: "'What is your dream job?' → She asked me _______ my dream job.", options: ["what is", "what was", "what my", "what I wanted to be"], correct: 3, explanation: "Wh-question gián tiếp: what + S + V (lùi thì). 'what I wanted...' is correct.", unit: 12 },
  { id: 67, question: "'Where do you live?' → He asked me _______ I lived.", options: ["where", "that where", "if where", "whether where"], correct: 0, explanation: "Wh-question gián tiếp: where + S + V.", unit: 12 },
  { id: 68, question: "'How long have you worked here?' → She asked how long I _______ there.", options: ["have worked", "work", "had worked", "worked"], correct: 2, explanation: "Lùi thì: Present perfect → Past perfect: have worked → had worked.", unit: 12 },
  // Unit 12 – Phonetics (Sentence stress)
  { id: 69, question: "In the sentence 'I WANT to BE a DOC-tor', which words are stressed?", options: ["want, be, doctor", "I, to, a", "want, be", "I, doctor"], correct: 0, explanation: "Trong câu, từ mang nghĩa chính (content words) được nhấn: want, be, doctor.", unit: 12 },

  // Review 4 – Mixed Unit 10–12
  { id: 70, question: "If the robot _______ all our homework, we _______ more time to play.", options: ["does / will have", "did / would have", "do / would have", "did / will have"], correct: 1, explanation: "Conditional Type 2 (giả định không thực): If + V2 (did), would + V.", unit: 99 },
];

// Extend the exported arrays
export const allQuizQuestions: QuizQuestion[] = [...quizQuestions, ...newQuizQuestions];
export { allQuizQuestions as extendedQuiz };

// Extend lessons with Unit 10, 11, 12, Review 4
const unit10Lessons: Lesson[] = [
  {
    id: 11,
    title: "Unit 10: Từ vựng Không gian",
    unit: 10,
    icon: Rocket,
    color: "from-sky-500 to-blue-600",
    content: (
      <div>
        <div className="bg-sky-50 p-6 rounded-2xl mb-8 border border-sky-100">
          <h2 className="text-2xl font-bold text-sky-800 mb-2">Space & Science</h2>
          <p className="text-sky-700">Từ vựng về vũ trụ, thiên văn học và khoa học không gian.</p>
        </div>
        <VocabTable items={unit10Vocab} colorTheme="bg-gradient-to-r from-sky-500 to-blue-600" />
      </div>
    )
  },
  {
    id: 12,
    title: "Unit 10: Ngữ pháp Câu điều kiện loại 1",
    unit: 10,
    icon: Zap,
    color: "from-blue-500 to-indigo-600",
    content: (
      <div>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
          <p className="text-blue-800 font-bold">Conditional Type 1 (Câu điều kiện loại 1)</p>
          <p className="text-blue-700 text-sm mt-1">Cấu trúc: <strong>If + V (hiện tại đơn), will + V (nguyên thể)</strong></p>
        </div>
        <GrammarBox
          title="Câu điều kiện loại 1 – Có thể xảy ra"
          color="bg-blue-600"
          rule={
            <div className="space-y-2 text-sm md:text-base">
              <p><strong>If + S + V (V-s/es), S + will + V</strong></p>
              <p className="text-gray-500">Dùng khi điều kiện CÓ THỂ xảy ra trong thực tế.</p>
              <div className="grid grid-cols-2 gap-2 border-t pt-2 mt-2">
                <span className="font-semibold">Mệnh đề If</span>
                <span className="font-semibold text-blue-600">Mệnh đề kết quả</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span>If it rains,</span>
                <span>I will stay home.</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span>If she studies,</span>
                <span>she will pass.</span>
              </div>
            </div>
          }
          examples={[
            {
              correct: "If we plant more trees, the air will be cleaner.",
              incorrect: "If we will plant more trees, the air will be cleaner.",
              explain: "Mệnh đề If KHÔNG dùng will. Dùng thì hiện tại đơn."
            },
            {
              correct: "If he doesn't hurry, he'll miss the rocket launch.",
              explain: "Phủ định: If + don't/doesn't + V."
            }
          ]}
        />
        <div className="space-y-4 mt-6">
          {unit10Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  {
    id: 13,
    title: "Unit 10: Ngữ âm /ʃ/ và /tʃ/",
    unit: 10,
    icon: Mic,
    color: "from-indigo-500 to-violet-600",
    content: (
      <div>
        <h2 className="text-2xl font-bold text-indigo-800 mb-6">Âm /ʃ/ (sh) và /tʃ/ (ch)</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <PhoneticCard
            pair="/ʃ/"
            words={["shore", "ship", "shine", "shower", "shelf", "chef"]}
            tip="Âm /ʃ/ = 'sh'. Môi tròn, hơi thoát ra nhẹ, không rung họng."
          />
          <PhoneticCard
            pair="/tʃ/"
            words={["cheese", "chain", "church", "champion", "challenge", "children"]}
            tip="Âm /tʃ/ = 'ch'. Bắt đầu bằng /t/ rồi chuyển nhanh sang /ʃ/."
          />
        </div>
        <div className="mt-8 bg-indigo-50 p-6 rounded-xl border border-indigo-100 text-center">
          <p className="font-bold text-indigo-900 text-lg mb-2">So sánh cặp tối thiểu</p>
          <p className="text-lg font-medium text-indigo-600"><strong className="text-indigo-800">sh</strong>are vs <strong className="text-indigo-800">ch</strong>air | <strong className="text-indigo-800">sh</strong>op vs <strong className="text-indigo-800">ch</strong>op | <strong className="text-indigo-800">sh</strong>oe vs <strong className="text-indigo-800">ch</strong>ew</p>
        </div>
      </div>
    )
  },
];

const unit11Lessons: Lesson[] = [
  {
    id: 14,
    title: "Unit 11: Từ vựng Thế giới Đổi thay",
    unit: 11,
    icon: TrendingUp,
    color: "from-indigo-500 to-purple-600",
    content: (
      <div>
        <div className="bg-indigo-50 p-6 rounded-2xl mb-8 border border-indigo-100">
          <h2 className="text-2xl font-bold text-indigo-800 mb-2">The Changing World</h2>
          <p className="text-indigo-700">Từ vựng về đô thị hóa, năng lượng tái tạo, biến đổi khí hậu và toàn cầu hóa.</p>
        </div>
        <VocabTable items={unit11Vocab} colorTheme="bg-gradient-to-r from-indigo-500 to-purple-600" />
      </div>
    )
  },
  {
    id: 15,
    title: "Unit 11: Ngữ pháp Câu điều kiện loại 2",
    unit: 11,
    icon: Zap,
    color: "from-purple-500 to-fuchsia-600",
    content: (
      <div>
        <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-8">
          <p className="text-purple-800 font-bold">Conditional Type 2 (Câu điều kiện loại 2)</p>
          <p className="text-purple-700 text-sm mt-1">Cấu trúc: <strong>If + V2 (were/past), would + V (nguyên thể)</strong></p>
        </div>
        <GrammarBox
          title="Câu điều kiện loại 2 – Không có thật"
          color="bg-purple-600"
          rule={
            <div className="space-y-2 text-sm md:text-base">
              <p><strong>If + S + V2 (were / V-ed), S + would + V</strong></p>
              <p className="text-gray-500">Dùng khi điều kiện KHÔNG CÓ THẬT ở hiện tại / giả định khó xảy ra.</p>
              <div className="grid grid-cols-2 gap-2 border-t pt-2 mt-2">
                <span className="text-purple-600 font-semibold">Hiện thực</span>
                <span className="text-fuchsia-600 font-semibold">Giả định (Type 2)</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span>I'm not rich.</span>
                <span>If I were rich, I would travel.</span>
              </div>
            </div>
          }
          examples={[
            {
              correct: "If I were a bird, I would fly around the world.",
              incorrect: "If I was a bird, I would fly... (ít chuẩn trong văn viết)",
              explain: "Dùng WERE (không phải was) cho mọi chủ ngữ trong mệnh đề If (văn phong chuẩn)."
            },
            {
              correct: "People would use less energy if they knew about global warming.",
              explain: "Mệnh đề If có thể đứng sau (nêu điều kiện)."
            }
          ]}
        />
        <div className="space-y-4 mt-6">
          {unit11Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  {
    id: 16,
    title: "Unit 11: Ngữ âm Nối âm (Linking)",
    unit: 11,
    icon: Mic,
    color: "from-fuchsia-500 to-pink-500",
    content: (
      <div>
        <h2 className="text-2xl font-bold text-fuchsia-800 mb-6">Nối âm (Linking Sounds)</h2>
        <div className="bg-fuchsia-50 p-4 rounded-xl mb-6 text-fuchsia-800">
          Quy tắc: Khi một từ kết thúc bằng phụ âm và từ tiếp theo bắt đầu bằng nguyên âm, ta đọc liền 2 âm đó.
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <PhoneticCard
            pair="C → V"
            words={["an_apple", "look_at", "turn_off", "pick_up", "come_in"]}
            tip="Phụ âm cuối nối với nguyên âm đầu từ tiếp theo."
          />
          <PhoneticCard
            pair="Ví dụ câu"
            words={["not_at all", "take_it easy", "in_a moment", "give_up easily"]}
            tip="Nối âm giúp phát âm tự nhiên và trôi chảy hơn."
          />
        </div>
      </div>
    )
  },
];

const unit12Lessons: Lesson[] = [
  {
    id: 17,
    title: "Unit 12: Từ vựng Nghề nghiệp",
    unit: 12,
    icon: Briefcase,
    color: "from-rose-500 to-pink-600",
    content: (
      <div>
        <div className="bg-rose-50 p-6 rounded-2xl mb-8 border border-rose-100">
          <h2 className="text-2xl font-bold text-rose-800 mb-2">My Future Career</h2>
          <p className="text-rose-700">Từ vựng về nghề nghiệp, kỹ năng, tuyển dụng và định hướng tương lai.</p>
        </div>
        <VocabTable items={unit12Vocab} colorTheme="bg-gradient-to-r from-rose-500 to-pink-600" />
      </div>
    )
  },
  {
    id: 18,
    title: "Unit 12: Ngữ pháp Câu tường thuật (WH)",
    unit: 12,
    icon: PenTool,
    color: "from-pink-500 to-red-500",
    content: (
      <div>
        <div className="bg-pink-50 border-l-4 border-pink-400 p-4 mb-8">
          <p className="text-pink-800 font-bold">Reported Wh-Questions (Câu tường thuật – Câu hỏi Wh)</p>
          <p className="text-pink-700 text-sm mt-1">Cấu trúc: <strong>S + asked + Wh-word + S + V (lùi thì)</strong></p>
        </div>
        <GrammarBox
          title="Chuyển câu hỏi Wh thành câu tường thuật"
          color="bg-red-600"
          rule={
            <div className="space-y-2 text-sm md:text-base">
              <div className="grid grid-cols-2 gap-2 border-b pb-2">
                <span className="font-semibold text-gray-600">Direct (Trực tiếp)</span>
                <span className="font-semibold text-red-600">Reported (Gián tiếp)</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span>"Where do you work?"</span>
                <span>asked where I <strong>worked</strong>.</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span>"What are you doing?"</span>
                <span>asked what I <strong>was doing</strong>.</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span>"Why did you apply?"</span>
                <span>asked why I <strong>had applied</strong>.</span>
              </div>
            </div>
          }
          examples={[
            {
              correct: "She asked where I had studied English.",
              incorrect: "She asked where did I study English.",
              explain: "Lỗi phổ biến: Giữ nguyên dạng câu hỏi có trợ động từ đảo lên đầu."
            },
            {
              correct: "He asked what my dream career was.",
              explain: "Wh-word + S + V (không đảo ngữ)."
            }
          ]}
        />
        <div className="space-y-4 mt-6">
          {unit12Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  {
    id: 19,
    title: "Unit 12: Trọng âm trong câu",
    unit: 12,
    icon: Mic,
    color: "from-red-500 to-orange-500",
    content: (
      <div>
        <h2 className="text-2xl font-bold text-red-800 mb-6">Nhấn trọng âm trong câu (Sentence Stress)</h2>
        <div className="bg-red-50 p-4 rounded-xl mb-6 text-red-800">
          Quy tắc: Trong câu, ta nhấn vào <strong>từ mang nghĩa chính</strong> (content words): danh từ, động từ chính, tính từ, trạng từ. <strong>Không nhấn</strong> vào từ chức năng (to, a, an, the, be, do...).
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <PhoneticCard
            pair="Nhấn (stressed)"
            words={["NOUNS – job, career", "VERBS – WANT, APPLY", "ADJ – HARD-working", "ADV – QUICKLY"]}
            tip="Content words = từ mang nội dung ý nghĩa."
          />
          <PhoneticCard
            pair="Không nhấn"
            words={["articles: a, an, the", "prepositions: at, in, on", "auxiliaries: do, be, have", "pronouns: I, you, she"]}
            tip="Function words = từ chức năng, đọc nhanh, nhẹ."
          />
        </div>
        <div className="mt-8 bg-orange-50 p-6 rounded-xl border border-orange-100 text-center">
          <p className="font-bold text-orange-900 text-lg mb-2">Ví dụ câu</p>
          <p className="text-xl font-medium text-orange-600"><span className="uppercase font-black">I WANT</span> to <span className="uppercase font-black">BE</span> a <span className="uppercase font-black">DOCTOR</span> in the <span className="uppercase font-black">FUTURE</span>.</p>
        </div>
      </div>
    )
  },
];

const review4Lessons: Lesson[] = [
  {
    id: 20,
    title: "Review 4: Ôn tập tổng hợp Unit 10–12",
    unit: 99,
    icon: RotateCcw,
    color: "from-orange-500 to-amber-500",
    content: (
      <div>
        <div className="bg-orange-50 p-6 rounded-2xl mb-8 border border-orange-100">
          <h2 className="text-2xl font-bold text-orange-800 mb-2">🔄 Review 4: Tổng hợp Unit 10–12</h2>
          <p className="text-orange-700">Ôn tập từ vựng, ngữ pháp từ Unit 10 (Không gian), Unit 11 (Thế giới đổi thay), Unit 12 (Nghề nghiệp).</p>
        </div>
        <div className="space-y-4">
          {review4Exercises.map((ex, idx) => <ExerciseCard key={ex.id} item={ex} idx={idx} />)}
        </div>
      </div>
    )
  },
  {
    id: 21,
    title: "Review 4: Ngữ pháp Câu điều kiện 1 & 2",
    unit: 99,
    icon: Star,
    color: "from-amber-500 to-yellow-500",
    content: (
      <div>
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-8">
          <p className="text-amber-800 font-bold">So sánh Conditional Type 1 và Type 2</p>
        </div>
        <GrammarBox
          title="Type 1 vs Type 2 – So sánh trực tiếp"
          color="bg-amber-600"
          rule={
            <div className="space-y-3 text-sm md:text-base">
              <div className="grid grid-cols-3 gap-2 border-b pb-2 font-semibold">
                <span>Loại</span>
                <span>Cấu trúc</span>
                <span>Ý nghĩa</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-blue-600 font-bold">Type 1</span>
                <span>If + V (ht), will + V</span>
                <span>Có thể xảy ra</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-purple-600 font-bold">Type 2</span>
                <span>If + V2, would + V</span>
                <span>Không có thật</span>
              </div>
            </div>
          }
          examples={[
            { correct: "If it rains, I will take an umbrella. (Type 1 – thực tế)", explain: "Có khả năng trời mưa → dùng Type 1." },
            { correct: "If I were a bird, I would fly. (Type 2 – không thực)", explain: "Tôi không phải chim → dùng Type 2." },
          ]}
        />
        <GrammarBox
          title="Reported Wh-Questions – Tổng hợp"
          color="bg-orange-600"
          rule={
            <div className="text-sm md:text-base">
              <p><strong>S + asked (me) + Wh-word + S + V (lùi thì)</strong></p>
              <p className="mt-2 text-gray-500">Không đảo ngữ. Lùi thì giống Reported Yes/No.</p>
            </div>
          }
          examples={[
            { correct: "She asked where I had studied.", explain: "where + I + had studied (không đảo ngữ, lùi thì)" },
            { correct: "He asked what time the interview started.", explain: "Câu hỏi về thời gian." },
          ]}
        />
      </div>
    )
  },
];

// All lessons combined (exported for App.tsx)
export const allLessons: Lesson[] = [
  ...lessons,
  ...unit10Lessons,
  ...unit11Lessons,
  ...unit12Lessons,
  ...review4Lessons,
];
