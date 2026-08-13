import { CATEGORIES, DEMO_LEADS, type Lead } from "../../data";

type TwoGisItem = {
  id: string;
  name: string;
  address_name?: string;
  full_name?: string;
  point?: { lat: number; lon: number };
  reviews?: { rating?: number; general_rating?: number; review_count?: number; general_review_count?: number };
  rubrics?: { name: string }[];
};

const categoryQueries: Record<string, string[]> = {
  "Все категории": ["автосервис", "салон красоты", "мебель на заказ", "стоматология"],
  "Автосервис": ["автосервис"],
  "Салон красоты": ["салон красоты"],
  "Мебель на заказ": ["мебель на заказ"],
  "Стоматология": ["стоматология"],
};

function toLead(item: TwoGisItem, index: number): Lead {
  const rating = item.reviews?.general_rating ?? item.reviews?.rating ?? null;
  const reviews = item.reviews?.general_review_count ?? item.reviews?.review_count ?? 0;
  const score = Math.min(99, Math.round(72 + Math.min(reviews / 7, 17) + (rating && rating >= 4.5 ? 6 : 0)));
  const need = reviews >= 40 ? "Сайт + CRM" : "Сайт";
  const category = item.rubrics?.[0]?.name ?? "Локальный бизнес";

  return {
    id: item.id,
    name: item.name,
    category,
    address: item.address_name ?? item.full_name ?? "Адрес в карточке 2ГИС",
    rating,
    reviews,
    score,
    need,
    priority: score >= 89 ? "Горячий" : score >= 80 ? "Тёплый" : "Наблюдать",
    signals: ["в 2ГИС нет сайта", reviews ? `${reviews} отзывов` : "нет отзывов", rating ? `рейтинг ${rating.toFixed(1)}` : "нет рейтинга"],
    opportunity: reviews >= 40
      ? "Сайт с онлайн-записью и CRM для обработки повторных клиентов."
      : "Конверсионный сайт с услугами, кейсами и быстрой заявкой.",
    url: `https://2gis.kz/firm/${item.id}`,
    lat: item.point?.lat ?? 44.84 + index * 0.002,
    lon: item.point?.lon ?? 65.5 + index * 0.002,
    source: "2GIS",
  };
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { city?: string; category?: string };
  const city = body.city?.trim() || "Кызылорда";
  const category = CATEGORIES.includes(body.category ?? "") ? body.category! : "Все категории";
  const apiKey = process.env.TWO_GIS_API_KEY;

  if (!apiKey) {
    const leads = category === "Все категории" ? DEMO_LEADS : DEMO_LEADS.filter((lead) => lead.category === category);
    return Response.json({ leads, source: "demo", city: "Кызылорда" });
  }

  try {
    const queries = categoryQueries[category] ?? categoryQueries["Все категории"];
    const batches = await Promise.all(queries.map(async (query) => {
      const url = new URL("https://catalog.api.2gis.com/3.0/items");
      url.searchParams.set("key", apiKey);
      url.searchParams.set("q", `${city} ${query}`);
      url.searchParams.set("type", "branch");
      url.searchParams.set("has_site", "false");
      url.searchParams.set("page_size", "10");
      url.searchParams.set("fields", "items.reviews,items.rubrics,items.point");
      url.searchParams.set("locale", "ru_KZ");
      const response = await fetch(url, { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error(`2GIS ${response.status}`);
      const data = (await response.json()) as { result?: { items?: TwoGisItem[] } };
      return data.result?.items ?? [];
    }));

    const unique = Array.from(new Map(batches.flat().map((item) => [item.id, item])).values());
    return Response.json({ leads: unique.map(toLead).sort((a, b) => b.score - a.score), source: "2GIS", city });
  } catch {
    return Response.json({ error: "Не удалось получить данные 2ГИС. Проверьте ключ и лимиты." }, { status: 502 });
  }
}
