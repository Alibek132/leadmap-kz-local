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

export const CITIES = ["Кызылорда", "Алматы", "Астана"] as const;

const ALMATY_DEMO_LEADS: Lead[] = [
  {
    id: "aviavto-almaty", name: "AviAvto", category: "Автосервис", address: "ул. Карасай батыра, 229",
    rating: 4.9, reviews: 170, score: 96, need: "Сайт + CRM", priority: "Горячий",
    signals: ["170 оценок", "WhatsApp в карточке", "высокий поток"],
    opportunity: "Сайт с онлайн-записью и CRM для истории обслуживания и повторного сервиса.",
    url: "https://2gis.kz/almaty/firm/70000001033899351", lat: 43.247, lon: 76.904, source: "demo",
  },
  {
    id: "service-auto-almaty", name: "СТО Service Auto", category: "Автосервис", address: "ул. Омская, 125а",
    rating: 4.9, reviews: 626, score: 95, need: "CRM", priority: "Горячий",
    signals: ["626 оценок", "есть сайт", "большой поток обращений"],
    opportunity: "CRM для единой воронки, записи на ремонт и автоматических напоминаний клиентам.",
    url: "https://2gis.kz/almaty/firm/9429940000915119", lat: 43.309, lon: 76.925, source: "demo",
  },
  {
    id: "alma-home-almaty", name: "Alma Home", category: "Мебель на заказ", address: "пр. Турара Рыскулова, 143в",
    rating: 5, reviews: 264, score: 94, need: "Сайт + CRM", priority: "Горячий",
    signals: ["264 оценки", "2 филиала", "WhatsApp в карточке"],
    opportunity: "Каталог с квизом на расчёт и CRM для заявок по двум филиалам.",
    url: "https://2gis.kz/almaty/firm/70000001084016721", lat: 43.225, lon: 76.822, source: "demo",
  },
  {
    id: "mebelle-almaty", name: "Mebelle", category: "Мебель на заказ", address: "ул. Кабдена Байдосова, 2а",
    rating: 5, reviews: 25, score: 91, need: "Сайт", priority: "Горячий",
    signals: ["146 фото", "нет сайта в карточке", "визуальная ниша"],
    opportunity: "Сайт-портфолио с кейсами, материалами и формой заявки на замер.",
    url: "https://2gis.kz/almaty/firm/70000001040103742", lat: 43.205, lon: 76.891, source: "demo",
  },
  {
    id: "the-scort-almaty", name: "The Scort", category: "Салон красоты", address: "ул. Каирбекова, 48",
    rating: 4.9, reviews: 38, score: 89, need: "Сайт", priority: "Горячий",
    signals: ["92 фото", "есть онлайн-запись", "нет собственного сайта"],
    opportunity: "Имиджевый сайт с услугами, работами мастеров и собственной точкой записи.",
    url: "https://2gis.kz/almaty/firm/70000001102010163", lat: 43.258, lon: 76.956, source: "demo",
  },
  {
    id: "vivat-almaty", name: "Vivat", category: "Салон красоты", address: "12-й микрорайон, 2",
    rating: 4.6, reviews: 40, score: 86, need: "Сайт + CRM", priority: "Тёплый",
    signals: ["40 оценок", "WhatsApp в карточке", "нет сайта"],
    opportunity: "Лендинг с прайсом и CRM для записи, напоминаний и возврата постоянных клиентов.",
    url: "https://2gis.kz/almaty/firm/70000001025640882", lat: 43.226, lon: 76.848, source: "demo",
  },
];

const ASTANA_DEMO_LEADS: Lead[] = [
  {
    id: "moy-shkaf-astana", name: "Мой шкаф", category: "Мебель на заказ", address: "ул. Александра Пушкина, 40в",
    rating: 4.9, reviews: 69, score: 94, need: "CRM", priority: "Горячий",
    signals: ["69 оценок", "2 филиала", "есть сайт"],
    opportunity: "CRM для заявок с сайта и WhatsApp, контроля замеров и производства по двум филиалам.",
    url: "https://2gis.kz/astana/firm/70000001047414690", lat: 51.155, lon: 71.471, source: "demo",
  },
  {
    id: "lineo-astana", name: "Lineo", category: "Мебель на заказ", address: "ул. Ыкылас Дукенулы, 25/1",
    rating: 5, reviews: 43, score: 92, need: "Сайт + CRM", priority: "Горячий",
    signals: ["43 оценки", "WhatsApp в карточке", "кухни на заказ"],
    opportunity: "Сайт с портфолио кухонь, квизом расчёта и CRM по этапам заказа.",
    url: "https://2gis.kz/astana/firm/70000001099074313", lat: 51.192, lon: 71.408, source: "demo",
  },
  {
    id: "linden-astana", name: "Linden.kz", category: "Мебель на заказ", address: "ул. Жошы хан, 14/2",
    rating: 5, reviews: 32, score: 91, need: "CRM", priority: "Горячий",
    signals: ["2 филиала", "есть сайт", "дизайнерская мебель"],
    opportunity: "CRM для контроля заявок, дизайнерских проектов, смет и повторных касаний.",
    url: "https://2gis.kz/astana/firm/70000001087630319", lat: 51.095, lon: 71.416, source: "demo",
  },
  {
    id: "kukebaev-astana", name: "Кукебаев", category: "Мебель на заказ", address: "ул. Михаила Лермонтова, 41Б",
    rating: 5, reviews: 30, score: 90, need: "Сайт", priority: "Горячий",
    signals: ["30 оценок", "18 фото", "нет сайта в карточке"],
    opportunity: "Сайт-портфолио с калькулятором проекта и заявкой на бесплатный замер.",
    url: "https://2gis.kz/astana/firm/70000001052676266", lat: 51.168, lon: 71.452, source: "demo",
  },
  {
    id: "beauty-zhenis-astana", name: "Салон красоты", category: "Салон красоты", address: "пр. Женис, 37",
    rating: 5, reviews: 35, score: 89, need: "Сайт + CRM", priority: "Горячий",
    signals: ["35 оценок", "WhatsApp в карточке", "нет сайта"],
    opportunity: "Сайт с меню услуг и CRM для онлайн-записи, напоминаний и загрузки мастеров.",
    url: "https://2gis.kz/astana/firm/70000001094524921", lat: 51.178, lon: 71.414, source: "demo",
  },
  {
    id: "autoservice-mailin-astana", name: "Автосервис", category: "Автосервис", address: "ул. Беимбет Майлин, 17",
    rating: 4.5, reviews: 40, score: 87, need: "Сайт + CRM", priority: "Тёплый",
    signals: ["40 оценок", "WhatsApp в карточке", "нет сайта"],
    opportunity: "Сайт с перечнем работ и CRM для записи, статусов ремонта и возврата на ТО.",
    url: "https://2gis.kz/astana/firm/70000001029777438", lat: 51.138, lon: 71.488, source: "demo",
  },
];

export const DEMO_LEADS_BY_CITY: Record<(typeof CITIES)[number], Lead[]> = {
  "Кызылорда": DEMO_LEADS,
  "Алматы": ALMATY_DEMO_LEADS,
  "Астана": ASTANA_DEMO_LEADS,
};

export const CATEGORIES = ["Все категории", "Автосервис", "Салон красоты", "Мебель на заказ", "Стоматология"];
