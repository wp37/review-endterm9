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
// UNIT 12 – CAREER CHOICES (Lựa chọn nghề nghiệp)
// =====================================================

const unit12Vocab: VocabItem[] = [
  { word: "Tailor", ipa: "/ˈteɪlər/ (n)", meaning: "<strong>Thợ may</strong>. Người may quần áo theo yêu cầu.<br/><em class='text-xs text-gray-500'>Ví dụ: The tailor made a beautiful dress.</em>" },
  { word: "Surgeon", ipa: "/ˈsɜːdʒən/ (n)", meaning: "<strong>Bác sĩ phẫu thuật</strong>. Bác sĩ thực hiện ca mổ.<br/><em class='text-xs text-gray-500'>Liên quan: Surgery (n) = phẫu thuật.</em>" },
  { word: "Assembly Worker", ipa: "/əˈsembli ˈwɜːkər/ (n)", meaning: "<strong>Công nhân lắp ráp</strong>. Người lắp ráp sản phẩm tại nhà máy.<br/><em class='text-xs text-gray-500'>Ví dụ: Assembly workers in a car factory.</em>" },
  { word: "Cashier", ipa: "/kæˈʃɪər/ (n)", meaning: "<strong>Thu ngân</strong>. Người tính tiền tại quầy.<br/><em class='text-xs text-gray-500'>Ví dụ: The cashier gave me my change.</em>" },
  { word: "Demanding", ipa: "/dɪˈmɑːndɪŋ/ (adj)", meaning: "<strong>Đòi hỏi khắt khe</strong>. Cần nhiều nỗ lực và kỹ năng.<br/><em class='text-xs text-gray-500'>Đồng nghĩa: Challenging. Ví dụ: A demanding job.</em>" },
  { word: "Repetitive", ipa: "/rɪˈpetətɪv/ (adj)", meaning: "<strong>Lặp đi lặp lại</strong>. Công việc cùng một kiểu.<br/><em class='text-xs text-gray-500'>Ví dụ: Factory work can be repetitive.</em>" },
  { word: "Well-paid", ipa: "/ˌwel ˈpeɪd/ (adj)", meaning: "<strong>Lương cao</strong>. Được trả lương tốt.<br/><em class='text-xs text-gray-500'>Đối lập: Poorly-paid (lương thấp).</em>" },
  { word: "Rewarding", ipa: "/rɪˈwɔːdɪŋ/ (adj)", meaning: "<strong>Đáng bõ công, xứng đáng</strong>. Mang lại sự hài lòng.<br/><em class='text-xs text-gray-500'>Ví dụ: Teaching is a rewarding career.</em>" },
];

const unit12Exercises: ExerciseItem[] = [
  { id: 1, question: "_______ the job is demanding, she still loves it.<br/>(Mệnh đề trạng ngữ chỉ nhượng bộ)", answer: "<strong>Although / Though</strong>.<br/>(Mệnh đề nhượng bộ: Although/Though + S + V = Mặc dù...)" },
  { id: 2, question: "The exam was _______ difficult _______ many students failed.", answer: "<strong>so ... that</strong>.<br/>(so + adj + that = quá... đến nỗi mà: so difficult that...)" },
  { id: 3, question: "It was _______ a good opportunity _______ she couldn't refuse it.", answer: "<strong>such ... that</strong>.<br/>(such + a/an + adj + noun + that: such a good opportunity that...)" },
  { id: 4, question: "He became a surgeon _______ he wanted to save lives.<br/>(Mệnh đề trạng ngữ chỉ nguyên nhân)", answer: "<strong>because / since</strong>.<br/>(Mệnh đề nguyên nhân: Because/Since + S + V = Bởi vì...)" },
];

const review4Exercises: ExerciseItem[] = [
  { id: 1, question: "The Mekong Delta, _______ is in southern Vietnam, has a rich ecosystem.", answer: "<strong>which</strong>.<br/>(Non-defining clause có dấu phẩy → dùng which, KHÔNG dùng that. Unit 10)" },
  { id: 2, question: "He suggested _______ (buy) a smartwatch for exercise.", answer: "<strong>buying</strong>.<br/>(suggest + V-ing. Unit 11)" },
  { id: 3, question: "_______ the work is repetitive, the factory workers still enjoy it.", answer: "<strong>Although / Though</strong>.<br/>(Adverbial clause of concession. Unit 12)" },
  { id: 4, question: "The teacher recommended that we _______ (read) more about ecosystems.", answer: "<strong>(should) read</strong>.<br/>(recommend + that + S + (should) + V. Unit 11)" },
  { id: 5, question: "She was _______ talented _______ she got the job immediately.", answer: "<strong>so ... that</strong>.<br/>(so + adj + that = quá... đến nỗi. Unit 12)" },
  { id: 6, question: "Cat Ba Island, _______ beaches are beautiful, attracts many tourists.", answer: "<strong>whose</strong>.<br/>(Non-defining clause: whose + noun. Unit 10)" },
];

const newQuizQuestions: QuizQuestion[] = [
  // Unit 10 – Planet Earth – Vocabulary
  { id: 41, question: "A protected area for wildlife is called a _______.", options: ["grassland", "nature reserve", "habitat loss", "ecosystem"], correct: 1, explanation: "Nature reserve = khu bảo tồn thiên nhiên.", unit: 10 },
  { id: 42, question: "The plants of a region are called its _______.", options: ["fauna", "species", "flora", "ecosystem"], correct: 2, explanation: "Flora = hệ thực vật.", unit: 10 },
  { id: 43, question: "The animals of a region are called its _______.", options: ["flora", "fauna", "grassland", "habitat"], correct: 1, explanation: "Fauna = hệ động vật.", unit: 10 },
  { id: 44, question: "When animals lose their natural homes, it's called _______.", options: ["ecological balance", "nature reserve", "habitat loss", "grassland"], correct: 2, explanation: "Habitat loss = mất môi trường sống.", unit: 10 },
  { id: 45, question: "A community of living things and their environment is an _______.", options: ["ecosystem", "species", "flora", "fauna"], correct: 0, explanation: "Ecosystem = hệ sinh thái.", unit: 10 },
  // Unit 10 – Grammar (Non-defining relative clauses)
  { id: 46, question: "Earth, _______ is the third planet from the Sun, has one moon.", options: ["that", "which", "who", "whose"], correct: 1, explanation: "Non-defining clause (có dấu phẩy) → dùng which, KHÔNG dùng that.", unit: 10 },
  { id: 47, question: "Dr. Goodall, _______ studies chimps, won many awards.", options: ["which", "that", "who", "whose"], correct: 2, explanation: "Who thay thế cho người trong non-defining clause.", unit: 10 },
  { id: 48, question: "The coral reef, _______ area is shrinking, needs protection.", options: ["who", "which", "that", "whose"], correct: 3, explanation: "Whose chỉ sở hữu: 'diện tích của rạn san hô'.", unit: 10 },
  // Unit 10 – Phonetics (Rhythm)
  { id: 49, question: "In English rhythm, which words are usually STRESSED?", options: ["Articles and prepositions", "Content words (nouns, verbs, adjectives)", "Pronouns only", "All words equally"], correct: 1, explanation: "Nhịp điệu: Từ mang nghĩa chính (content words) được nhấn.", unit: 10 },
  { id: 50, question: "Which type of word is usually UNSTRESSED in a sentence?", options: ["Nouns", "Verbs", "Adjectives", "Articles (a, an, the)"], correct: 3, explanation: "Function words (articles, prepositions) thường không nhấn.", unit: 10 },

  // Unit 11 – Electronic Devices – Vocabulary
  { id: 51, question: "A device that can print 3D objects is called a _______.", options: ["camcorder", "e-reader", "3D printer", "smartwatch"], correct: 2, explanation: "3D printer = máy in 3D.", unit: 11 },
  { id: 52, question: "A watch that connects to your phone is a _______.", options: ["camcorder", "smartwatch", "e-reader", "gadget"], correct: 1, explanation: "Smartwatch = đồng hồ thông minh.", unit: 11 },
  { id: 53, question: "_______ is a metal used to make electrical wires.", options: ["Rubber", "Silicon", "Copper", "Plastic"], correct: 2, explanation: "Copper = đồng (kim loại), dùng làm dây điện.", unit: 11 },
  { id: 54, question: "A small electronic device is often called a _______.", options: ["gadget", "rubber", "copper", "flora"], correct: 0, explanation: "Gadget = thiết bị nhỏ, đồ công nghệ.", unit: 11 },
  { id: 55, question: "_______ is used to cover wires for safety.", options: ["Copper", "Silicon", "Rubber", "Metal"], correct: 2, explanation: "Rubber = cao su, chất cách điện.", unit: 11 },
  // Unit 11 – Grammar (suggest/advise/recommend)
  { id: 56, question: "She suggested _______ a new laptop.", options: ["buy", "to buy", "buying", "bought"], correct: 2, explanation: "suggest + V-ing.", unit: 11 },
  { id: 57, question: "They recommended that he _______ give up writing.", options: ["should", "would", "could", "might"], correct: 0, explanation: "recommend + that + S + should + V.", unit: 11 },
  { id: 58, question: "The teacher advised _______ phones in class.", options: ["not using", "not to use", "don't use", "not use"], correct: 0, explanation: "advise + V-ing → advise not using.", unit: 11 },
  // Unit 11 – Phonetics (Stress on all words in commands)
  { id: 59, question: "In 'DON'T TALK!', how are the words stressed?", options: ["Only 'don't' is stressed", "Only 'talk' is stressed", "Both words are stressed", "Neither is stressed"], correct: 2, explanation: "Câu khẩu lệnh ngắn: nhấn TẤT CẢ các từ.", unit: 11 },
  { id: 60, question: "Which is an example of stressing ALL words?", options: ["I want to go home", "KEEP SILENT!", "She is a teacher", "He likes reading"], correct: 1, explanation: "KEEP SILENT! - Câu khẩu lệnh ngắn nhấn tất cả.", unit: 11 },

  // Unit 12 – Career Choices – Vocabulary
  { id: 61, question: "A person who makes clothes is a _______.", options: ["cashier", "surgeon", "tailor", "assembly worker"], correct: 2, explanation: "Tailor = thợ may.", unit: 12 },
  { id: 62, question: "A doctor who performs operations is a _______.", options: ["cashier", "surgeon", "tailor", "assembly worker"], correct: 1, explanation: "Surgeon = bác sĩ phẫu thuật.", unit: 12 },
  { id: 63, question: "A job that requires a lot of effort is _______.", options: ["repetitive", "well-paid", "demanding", "rewarding"], correct: 2, explanation: "Demanding = đòi hỏi khắt khe.", unit: 12 },
  { id: 64, question: "A job where you do the same thing repeatedly is _______.", options: ["demanding", "well-paid", "rewarding", "repetitive"], correct: 3, explanation: "Repetitive = lặp đi lặp lại.", unit: 12 },
  { id: 65, question: "A person who handles money at a store is a _______.", options: ["tailor", "surgeon", "assembly worker", "cashier"], correct: 3, explanation: "Cashier = thu ngân.", unit: 12 },
  // Unit 12 – Grammar (Adverbial clauses)
  { id: 66, question: "_______ the job is demanding, she still loves it.", options: ["Because", "So", "Although", "Such"], correct: 2, explanation: "Although = mặc dù (concession).", unit: 12 },
  { id: 67, question: "The test was _______ hard that nobody passed.", options: ["so", "such", "although", "because"], correct: 0, explanation: "so + adj + that = quá... đến nỗi.", unit: 12 },
  { id: 68, question: "He chose this career _______ he loves helping people.", options: ["although", "so", "such", "because"], correct: 3, explanation: "Because = bởi vì (reason).", unit: 12 },
  // Unit 12 – Phonetics (Intonation)
  { id: 69, question: "'I want to be a doctor.' → 'You want to be a doctor?' How does the voice change?", options: ["Falls at the end", "Rises at the end", "Stays flat", "Falls then rises"], correct: 1, explanation: "Lên giọng cuối câu trần thuật dùng làm câu hỏi.", unit: 12 },

  // Review 4 – Mixed Unit 10–12
  { id: 70, question: "The Mekong Delta, _______ produces lots of rice, is in southern Vietnam.", options: ["that", "which", "who", "whose"], correct: 1, explanation: "Non-defining clause → which (không dùng that).", unit: 99 },
];

// Extend the exported arrays
export const allQuizQuestions: QuizQuestion[] = [...quizQuestions, ...newQuizQuestions];
export { allQuizQuestions as extendedQuiz };

// Extend lessons with Unit 10, 11, 12, Review 4
const unit10Lessons: Lesson[] = [
  {
    id: 11,
    title: "Unit 10: Từ vựng Trái Đất",
    unit: 10,
    icon: Globe,
    color: "from-sky-500 to-blue-600",
    content: (
      <div>
        <div className="bg-sky-50 p-6 rounded-2xl mb-8 border border-sky-100">
          <h2 className="text-2xl font-bold text-sky-800 mb-2">Planet Earth</h2>
          <p className="text-sky-700">Từ vựng về Trái Đất, môi trường sống, hệ thực vật và động vật.</p>
        </div>
        <VocabTable items={unit10Vocab} colorTheme="bg-gradient-to-r from-sky-500 to-blue-600" />
      </div>
    )
  },
  {
    id: 12,
    title: "Unit 10: Ngữ pháp Mệnh đề quan hệ không xác định",
    unit: 10,
    icon: BookOpen,
    color: "from-blue-500 to-indigo-600",
    content: (
      <div>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
          <p className="text-blue-800 font-bold">Non-defining Relative Clauses (Mệnh đề quan hệ không xác định)</p>
          <p className="text-blue-700 text-sm mt-1">Bổ sung thông tin, bỏ đi câu vẫn có nghĩa. Luôn có <strong>dấu phẩy</strong>.</p>
        </div>
        <GrammarBox
          title="Mệnh đề quan hệ KHÔNG xác định"
          color="bg-blue-600"
          rule={
            <div className="space-y-2 text-sm md:text-base">
              <p><strong>S, + who/which/whose + V, + V chính</strong></p>
              <p className="text-gray-500">Luôn dùng dấu phẩy. KHÔNG dùng 'that'. KHÔNG lược bỏ đại từ quan hệ.</p>
              <div className="grid grid-cols-2 gap-2 border-t pt-2 mt-2">
                <span className="font-semibold">Đặc điểm</span>
                <span className="font-semibold text-blue-600">Giải thích</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span>Dấu phẩy (,)</span>
                <span>Luôn có trước và sau mệnh đề</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span>Không dùng THAT</span>
                <span>Chỉ dùng who/which/whose</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span>Không lược bỏ</span>
                <span>Đại từ quan hệ không thể bỏ</span>
              </div>
            </div>
          }
          examples={[
            {
              correct: "Earth, which is the third planet from the Sun, depends on the Sun.",
              incorrect: "Earth, that is the third planet...",
              explain: "Non-defining clause KHÔNG dùng 'that', phải dùng 'which'."
            },
            {
              correct: "Dr. Goodall, who has studied chimps, is famous.",
              explain: "Who cho người. Dấu phẩy ngăn cách = non-defining."
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
    title: "Unit 10: Nhịp điệu trong câu (Rhythm)",
    unit: 10,
    icon: Mic,
    color: "from-indigo-500 to-violet-600",
    content: (
      <div>
        <h2 className="text-2xl font-bold text-indigo-800 mb-6">Nhịp điệu trong câu (Rhythm)</h2>
        <div className="bg-indigo-50 p-4 rounded-xl mb-6 text-indigo-800">
          Nhịp điệu trong tiếng Anh được tạo ra bởi sự kết hợp giữa các âm tiết <strong>có nhấn</strong> (stressed) và <strong>không nhấn</strong> (unstressed).
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <PhoneticCard
            pair="Stressed"
            words={["NOUNS: earth, forest", "VERBS: protect, destroy", "ADJ: natural, diverse", "ADV: quickly, slowly"]}
            tip="Content words (từ mang nghĩa) được nhấn mạnh."
          />
          <PhoneticCard
            pair="Unstressed"
            words={["articles: a, an, the", "prepositions: in, on, at", "auxiliaries: is, are, was", "pronouns: it, he, she"]}
            tip="Function words (từ chức năng) đọc nhanh, nhẹ."
          />
        </div>
        <div className="mt-8 bg-indigo-50 p-6 rounded-xl border border-indigo-100 text-center">
          <p className="font-bold text-indigo-900 text-lg mb-2">Ví dụ nhịp điệu</p>
          <p className="text-lg font-medium text-indigo-600">The <strong className="text-indigo-800">EARTH</strong> de<strong className="text-indigo-800">PENDS</strong> on the <strong className="text-indigo-800">SUN</strong> for its <strong className="text-indigo-800">EN</strong>er-gy.</p>
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
