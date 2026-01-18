import { MentalHealthCondition } from '../types/mentalHealth';

interface ResponseTemplate {
  greeting: string;
  explanation: string;
  solutions: string[];
  encouragement: string;
}

export const responseTemplates: Record<string, ResponseTemplate> = {
  Anxiety: {
    greeting: "Terima kasih sudah berbagi perasaan Anda dengan saya.",
    explanation: "Berdasarkan apa yang Anda sampaikan, saya mendeteksi kemungkinan Anda mengalami kecemasan (Anxiety). Kecemasan adalah respons alami tubuh terhadap stres, namun bila berlangsung terus-menerus dapat mempengaruhi kualitas hidup Anda.",
    solutions: [
      "Praktikkan teknik pernapasan dalam: Tarik napas selama 4 hitungan, tahan 4 hitungan, hembuskan 4 hitungan",
      "Cobalah mindfulness atau meditasi selama 10-15 menit setiap hari",
      "Batasi konsumsi kafein dan alkohol yang dapat memperburuk kecemasan",
      "Lakukan aktivitas fisik ringan seperti jalan santai atau yoga",
      "Tulis jurnal untuk mengidentifikasi pemicu kecemasan Anda",
      "Bicarakan dengan orang terdekat atau konselor profesional"
    ],
    encouragement: "Ingat, Anda tidak sendirian dalam menghadapi ini. Mencari bantuan adalah langkah yang sangat berani dan positif. Saya mendorong Anda untuk berkonsultasi dengan profesional kesehatan mental untuk mendapatkan dukungan yang lebih personal."
  },
  BPD: {
    greeting: "Saya menghargai kepercayaan Anda untuk berbagi perasaan Anda.",
    explanation: "Dari apa yang Anda ceritakan, ada indikasi kemungkinan Borderline Personality Disorder (BPD). BPD adalah kondisi kesehatan mental yang ditandai dengan ketidakstabilan emosi dan hubungan interpersonal.",
    solutions: [
      "Pertimbangkan terapi DBT (Dialectical Behavior Therapy) yang sangat efektif untuk BPD",
      "Praktikkan teknik grounding saat merasa overwhelmed: fokus pada 5 hal yang Anda lihat, 4 yang Anda sentuh, 3 yang Anda dengar",
      "Buat rutinitas harian yang stabil untuk memberikan struktur",
      "Identifikasi dan hindari pemicu emosional Anda",
      "Bangun sistem dukungan dengan orang-orang yang memahami kondisi Anda",
      "Gunakan aplikasi mood tracker untuk memahami pola emosi Anda"
    ],
    encouragement: "Hidup dengan BPD memang menantang, tapi dengan bantuan profesional dan strategi yang tepat, Anda bisa menjalani hidup yang bermakna dan memuaskan. Jangan ragu untuk menghubungi psikiater atau psikolog yang berpengalaman dengan BPD."
  },
  autism: {
    greeting: "Terima kasih telah mempercayai saya untuk mendengarkan Anda.",
    explanation: "Berdasarkan deskripsi Anda, ada kemungkinan Anda berada dalam spektrum autisme. Autisme adalah kondisi neurologis yang mempengaruhi cara seseorang berkomunikasi dan berinteraksi dengan dunia.",
    solutions: [
      "Cari komunitas atau support group untuk individu dalam spektrum autisme",
      "Buat lingkungan yang sensory-friendly untuk mengurangi overstimulasi",
      "Gunakan visual schedule atau checklist untuk membantu perencanaan harian",
      "Komunikasikan kebutuhan Anda dengan jelas kepada orang-orang di sekitar",
      "Eksplorasi terapi okupasi atau speech therapy jika diperlukan",
      "Kenali dan hargai kekuatan unik Anda - banyak individu autis memiliki bakat khusus"
    ],
    encouragement: "Autisme bukanlah sesuatu yang perlu 'diperbaiki' - ini adalah bagian dari identitas Anda. Dengan dukungan yang tepat dan pemahaman diri yang baik, Anda dapat berkembang dan mencapai potensi penuh Anda. Pertimbangkan untuk berkonsultasi dengan spesialis autisme."
  },
  bipolar: {
    greeting: "Saya senang Anda berani untuk membuka diri.",
    explanation: "Dari apa yang Anda sampaikan, saya mendeteksi kemungkinan gangguan bipolar. Bipolar adalah kondisi kesehatan mental yang ditandai dengan perubahan mood ekstrem, dari episode mania hingga depresi.",
    solutions: [
      "Sangat penting untuk berkonsultasi dengan psikiater untuk evaluasi dan kemungkinan pengobatan",
      "Jaga pola tidur yang konsisten - tidur yang tidak teratur dapat memicu episode",
      "Gunakan mood chart untuk melacak perubahan suasana hati Anda",
      "Hindari alkohol dan obat-obatan yang dapat mempengaruhi stabilitas mood",
      "Pertimbangkan terapi kognitif-behavioral (CBT) sebagai pelengkap pengobatan",
      "Edukasi keluarga dan teman dekat tentang kondisi Anda agar mereka bisa mendukung"
    ],
    encouragement: "Gangguan bipolar adalah kondisi yang dapat dikelola dengan baik dengan kombinasi pengobatan dan terapi yang tepat. Banyak orang dengan bipolar menjalani hidup yang produktif dan bahagia. Jangan tunda untuk mencari bantuan profesional."
  },
  depression: {
    greeting: "Terima kasih sudah berani berbagi apa yang Anda rasakan.",
    explanation: "Berdasarkan yang Anda ceritakan, ada indikasi kemungkinan Anda mengalami depresi. Depresi adalah kondisi kesehatan mental yang serius namun dapat diobati, yang mempengaruhi perasaan, pikiran, dan aktivitas sehari-hari.",
    solutions: [
      "Hubungi profesional kesehatan mental - terapi dan/atau medikasi sangat efektif untuk depresi",
      "Tetapkan rutinitas harian yang sederhana, bahkan hal kecil seperti mandi dan berpakaian",
      "Cobalah untuk tetap aktif fisik, bahkan hanya 10-15 menit jalan kaki per hari",
      "Jaga pola makan dan tidur yang teratur",
      "Hindari isolasi - tetap terhubung dengan orang-orang terdekat, meskipun sulit",
      "Hindari membuat keputusan besar saat Anda sedang dalam episode depresif"
    ],
    encouragement: "Depresi bukanlah tanda kelemahan, dan Anda tidak sendirian. Jutaan orang berhasil pulih dari depresi dengan bantuan yang tepat. Harap ingat: jika Anda memiliki pikiran untuk menyakiti diri sendiri, segera hubungi hotline krisis atau layanan darurat. Anda penting dan kehidupan Anda berharga."
  },
  mentalhealth: {
    greeting: "Saya menghargai Anda telah berbagi pengalaman Anda.",
    explanation: "Dari apa yang Anda sampaikan, saya mendeteksi bahwa Anda mungkin sedang menghadapi tantangan kesehatan mental secara umum. Kesehatan mental sama pentingnya dengan kesehatan fisik, dan tidak apa-apa untuk tidak selalu baik-baik saja.",
    solutions: [
      "Pertimbangkan untuk berbicara dengan konselor atau psikolog untuk mendapatkan dukungan",
      "Praktikkan self-care: lakukan aktivitas yang Anda nikmati secara teratur",
      "Bangun rutinitas yang sehat: tidur cukup, makan bergizi, dan olahraga teratur",
      "Belajar mengenali dan mengekspresikan emosi Anda dengan sehat",
      "Batasi paparan media sosial dan berita yang dapat mempengaruhi mood",
      "Bergabung dengan komunitas atau kelompok dukungan yang positif"
    ],
    encouragement: "Merawat kesehatan mental adalah proses yang berkelanjutan, bukan tujuan akhir. Setiap langkah kecil yang Anda ambil untuk merawat diri sendiri adalah pencapaian yang patut dirayakan. Jangan ragu untuk mencari bantuan profesional kapan pun Anda membutuhkannya."
  },
  schizophrenia: {
    greeting: "Terima kasih atas kepercayaan Anda untuk berbagi dengan saya.",
    explanation: "Berdasarkan deskripsi Anda, ada kemungkinan indikasi skizofrenia. Skizofrenia adalah kondisi kesehatan mental serius yang mempengaruhi cara seseorang berpikir, merasakan, dan berperilaku.",
    solutions: [
      "SANGAT PENTING: Segera konsultasi dengan psikiater untuk evaluasi dan perawatan profesional",
      "Ikuti rencana pengobatan yang diberikan dokter dengan konsisten",
      "Hindari penggunaan alkohol dan obat-obatan terlarang yang dapat memperburuk gejala",
      "Pertimbangkan terapi keluarga untuk membangun sistem dukungan yang kuat",
      "Pelajari cara mengenali tanda-tanda awal kekambuhan",
      "Jaga rutinitas harian yang terstruktur dan hindari stres berlebihan"
    ],
    encouragement: "Skizofrenia adalah kondisi yang dapat dikelola dengan pengobatan dan dukungan yang tepat. Banyak orang dengan skizofrenia menjalani kehidupan yang bermakna dengan bantuan medis yang konsisten. Sangat penting untuk bekerja sama dengan tim kesehatan mental profesional. Anda tidak sendirian dalam perjalanan ini."
  }
};

export function getResponse(condition: string, confidence: number): string {
  const normalizedCondition = condition.toLowerCase();

  let template: ResponseTemplate;

  if (normalizedCondition === 'anxiety') {
    template = responseTemplates.Anxiety;
  } else if (normalizedCondition === 'bpd') {
    template = responseTemplates.BPD;
  } else if (normalizedCondition === 'autism') {
    template = responseTemplates.autism;
  } else if (normalizedCondition === 'bipolar') {
    template = responseTemplates.bipolar;
  } else if (normalizedCondition === 'depression') {
    template = responseTemplates.depression;
  } else if (normalizedCondition === 'mentalhealth') {
    template = responseTemplates.mentalhealth;
  } else if (normalizedCondition === 'schizophrenia') {
    template = responseTemplates.schizophrenia;
  } else {
    template = responseTemplates.mentalhealth;
  }

  const confidencePercent = (confidence * 100).toFixed(1);

  let response = `${template.greeting}\n\n`;
  response += `${template.explanation}\n\n`;
  response += `**Tingkat Keyakinan Prediksi:** ${confidencePercent}%\n\n`;
  response += `**Saran dan Solusi:**\n\n`;

  template.solutions.forEach((solution, index) => {
    response += `${index + 1}. ${solution}\n\n`;
  });

  response += `${template.encouragement}`;

  return response;
}
