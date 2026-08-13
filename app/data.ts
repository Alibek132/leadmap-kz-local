export type Lead = {
  id: string;
  name: string;
  category: string;
  address: string;
  rating: number | null;
  reviews: number;
  score: number;
  need: "Сайт" | "CRM" | "Сайт + CRM";
  priority: "Горячий" | "Тёплый" | "Наблюдать";
  signals: string[];
  opportunity: string;
  url: string;
  whatsapp?: string;
  lat: number;
  lon: number;
  source: "2GIS" | "demo";
};

export const DEMO_LEADS: Lead[] = [
  {
    id: "automaster-kzo", name: "AutoMaster", category: "Автосервис", address: "ул. Жалела Кизатова, 24",
    rating: 4.8, reviews: 143, score: 96, need: "Сайт + CRM", priority: "Горячий",
    signals: ["много отзывов", "нет онлайн-записи в выдаче", "высокая нагрузка"],
    opportunity: "Онлайн-запись на ремонт, калькулятор и CRM с напоминаниями.",
    url: "https://2gis.kz/kyzylorda/firm/70000001069481314", whatsapp: "77775601717", lat: 44.842, lon: 65.502, source: "demo",
  },
  {
    id: "nns-beauty", name: "Nns salon", category: "Салон красоты", address: "ул. Текей батыра, 11Б",
    rating: 4.3, reviews: 98, score: 94, need: "Сайт + CRM", priority: "Горячий",
    signals: ["сильный рейтинг", "нет сайта в выдаче", "повторные визиты"],
    opportunity: "Лендинг с портфолио, онлайн-бронью и автовозвратом клиентов.",
    url: "https://2gis.kz/kyzylorda/firm/70000001103644266", whatsapp: "77777020299", lat: 44.848, lon: 65.485, source: "demo",
  },
  {
    id: "sultan-service", name: "Sultan service", category: "Автосервис", address: "ул. Пушкина, 1 · 2 филиала",
    rating: 4.8, reviews: 80, score: 92, need: "CRM", priority: "Горячий",
    signals: ["2 филиала", "80 отзывов", "нужна единая база"],
    opportunity: "CRM для двух точек: запись, статус авто, повторный сервис.",
    url: "https://2gis.kz/kyzylorda/firm/70000001063317160", whatsapp: "77710899191", lat: 44.861, lon: 65.511, source: "demo",
  },
  {
    id: "alexey-mebel", name: "Alexey Mebel", category: "Мебель на заказ", address: "ул. Есетова, 63",
    rating: 4, reviews: 24, score: 91, need: "Сайт", priority: "Горячий",
    signals: ["нет сайта в выдаче", "24 отзыва", "визуальная ниша"],
    opportunity: "Каталог кейсов, квиз-расчёт мебели и заявка в WhatsApp.",
    url: "https://2gis.kz/kyzylorda/firm/70000001066583590", whatsapp: "77714801999", lat: 44.835, lon: 65.491, source: "demo",
  },
  {
    id: "abusaif", name: "Abusaif", category: "Мебель на заказ", address: "ул. Абдрахманова, 77",
    rating: null, reviews: 0, score: 89, need: "Сайт", priority: "Горячий",
    signals: ["Instagram + WhatsApp", "нет сайта", "мало фото в карточке"],
    opportunity: "Сайт-витрина с каталогом материалов и квалификацией заявки.",
    url: "https://2gis.kz/kyzylorda/firm/70000001101198024", whatsapp: "77771374113", lat: 44.827, lon: 65.526, source: "demo",
  },
  {
    id: "mofhome", name: "MOFHome Collection", category: "Мебель на заказ", address: "пр. Нурсултана Назарбаева, 66а",
    rating: 5, reviews: 20, score: 85, need: "CRM", priority: "Тёплый",
    signals: ["рейтинг 5,0", "есть сайт", "нужен учёт товарных лидов"],
    opportunity: "CRM для заявок из сайта, WhatsApp и магазина с контролем повторных продаж.",
    url: "https://2gis.kz/kyzylorda/firm/70000001082811063", whatsapp: "77010659955", lat: 44.855, lon: 65.472, source: "demo",
  },
  {
    id: "studio-one", name: "Studio one salon", category: "Салон красоты", address: "мкр. Шугыла, 53",
    rating: 5, reviews: 41, score: 88, need: "Сайт + CRM", priority: "Тёплый",
    signals: ["много услуг", "рейтинг 5,0", "нет онлайн-брони"],
    opportunity: "Меню услуг, портфолио, окна мастеров и автонапоминания.",
    url: "https://2gis.kz/kyzylorda/firm/70000001110554058", lat: 44.844, lon: 65.533, source: "demo",
  },
  {
    id: "adimebel", name: "Adi Mebel Kzo", category: "Мебель на заказ", address: "ул. Балдырган, 1а",
    rating: 4.9, reviews: 11, score: 84, need: "Сайт", priority: "Тёплый",
    signals: ["рейтинг 4,9", "нет сайта в выдаче", "визуальный продукт"],
    opportunity: "Портфолио, калькулятор по размерам и захват заявок из поиска.",
    url: "https://2gis.kz/kyzylorda/firm/70000001080628801", whatsapp: "77774558086", lat: 44.822, lon: 65.499, source: "demo",
  },
  {
    id: "er-adil", name: "Er-Adl", category: "Автосервис", address: "ул. Билиса Нурпеисова, 1а",
    rating: 4.9, reviews: 144, score: 93, need: "CRM", priority: "Горячий",
    signals: ["55 отзывов", "стабильный поток", "нет записи в выдаче"],
    opportunity: "Запись по видам работ, учёт заказ-нарядов и реактивация клиентов.",
    url: "https://2gis.kz/kyzylorda/firm/70000001085621931", whatsapp: "77758341777", lat: 44.872, lon: 65.495, source: "demo",
  },
  {
    id: "khan-mebel", name: "Khan mebel", category: "Мебель на заказ", address: "ул. Жаппасбай батыра, 54",
    rating: 3.1, reviews: 4, score: 75, need: "Сайт", priority: "Наблюдать",
    signals: ["нет сайта", "широкий ассортимент", "низкий рейтинг"],
    opportunity: "Каталог и сбор отзывов; начать с репутационного пакета.",
    url: "https://2gis.kz/kyzylorda/firm/70000001088212540", whatsapp: "77770101771", lat: 44.813, lon: 65.541, source: "demo",
  },
  {
    id: "konis", name: "Konis", category: "Мебель на заказ", address: "Кызылорда",
    rating: null, reviews: 0, score: 73, need: "Сайт", priority: "Наблюдать",
    signals: ["Instagram + WhatsApp", "нет сайта", "нет точного адреса"],
    opportunity: "Мини-сайт с кейсами и формой замера, затем расширение до каталога.",
    url: "https://2gis.kz/kyzylorda/firm/70000001103410170", whatsapp: "77011121980", lat: 44.836, lon: 65.463, source: "demo",
  },
  {
    id: "grace", name: "Grace", category: "Салон красоты", address: "ул. Ауэзова, 7а",
    rating: 5, reviews: 3, score: 71, need: "Сайт", priority: "Наблюдать",
    signals: ["нет сайта в выдаче", "мало отзывов", "сильная оценка"],
    opportunity: "Лёгкий лендинг с ценами, портфолио и кнопкой быстрой записи.",
    url: "https://2gis.kz/kyzylorda/firm/70000001109985096", whatsapp: "77771163377", lat: 44.858, lon: 65.524, source: "demo",
  },
];

export const CATEGORIES = ["Все категории", "Автосервис", "Салон красоты", "Мебель на заказ", "Стоматология"];
