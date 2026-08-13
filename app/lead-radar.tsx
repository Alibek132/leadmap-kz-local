"use client";

import { useEffect, useMemo, useState } from "react";
import { CATEGORIES, DEMO_LEADS, type Lead } from "./data";

type Filter = "Все" | "Горячие" | "Нужен сайт" | "Нужна CRM" | "Сохранённые";
const FILTERS: Filter[] = ["Все", "Горячие", "Нужен сайт", "Нужна CRM", "Сохранённые"];

function csvCell(value: string | number) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function pitchFor(lead: Lead) {
  return `Здравствуйте! Заметили ${lead.name} в 2ГИС. ${lead.opportunity} Можем показать короткий прототип без обязательств. Когда будет удобно обсудить?`;
}

function contactUrl(lead: Lead) {
  return lead.whatsapp
    ? `https://wa.me/${lead.whatsapp}?text=${encodeURIComponent(pitchFor(lead))}`
    : lead.url;
}

export function LeadRadar() {
  const [leads, setLeads] = useState<Lead[]>(DEMO_LEADS);
  const [city, setCity] = useState("Кызылорда");
  const [category, setCategory] = useState("Все категории");
  const [filter, setFilter] = useState<Filter>("Все");
  const [selectedId, setSelectedId] = useState(DEMO_LEADS[0].id);
  const [saved, setSaved] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState<"demo" | "2GIS">("demo");
  const [toast, setToast] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem("leadmap-saved");
    if (stored) setSaved(JSON.parse(stored) as string[]);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const filtered = useMemo(() => leads.filter((lead) => {
    if (filter === "Горячие") return lead.priority === "Горячий";
    if (filter === "Нужен сайт") return lead.need.includes("Сайт");
    if (filter === "Нужна CRM") return lead.need.includes("CRM");
    if (filter === "Сохранённые") return saved.includes(lead.id);
    return true;
  }), [filter, leads, saved]);

  const selected = leads.find((lead) => lead.id === selectedId) ?? filtered[0] ?? leads[0];
  const hotCount = leads.filter((lead) => lead.priority === "Горячий").length;
  const crmCount = leads.filter((lead) => lead.need.includes("CRM")).length;
  const avgScore = leads.length ? Math.round(leads.reduce((sum, lead) => sum + lead.score, 0) / leads.length) : 0;

  async function runSearch() {
    setLoading(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city, category }),
      });
      const data = (await response.json()) as { leads?: Lead[]; source?: "demo" | "2GIS"; city?: string; error?: string };
      if (!response.ok || !data.leads) throw new Error(data.error || "Ошибка поиска");
      setLeads(data.leads);
      setSource(data.source ?? "demo");
      setSelectedId(data.leads[0]?.id ?? "");
      setFilter("Все");
      if (data.source === "demo" && city.toLowerCase() !== "кызылорда") {
        setToast("Демо-выборка пока доступна для Кызылорды");
      } else {
        setToast(`Найдено лидов: ${data.leads.length}`);
      }
    } catch (error) {
      setToast(error instanceof Error ? error.message : "Не удалось обновить лиды");
    } finally {
      setLoading(false);
    }
  }

  function toggleSaved(id: string) {
    const next = saved.includes(id) ? saved.filter((item) => item !== id) : [...saved, id];
    setSaved(next);
    window.localStorage.setItem("leadmap-saved", JSON.stringify(next));
    setToast(saved.includes(id) ? "Удалено из сохранённых" : "Лид сохранён");
  }

  function exportCsv() {
    const rows = [
      ["Компания", "Категория", "Адрес", "Рейтинг", "Отзывы", "Скор", "Потребность", "2ГИС", "Написать"],
      ...filtered.map((lead) => [lead.name, lead.category, lead.address, lead.rating ?? "", lead.reviews, lead.score, lead.need, lead.url, contactUrl(lead)]),
    ];
    const csv = `\uFEFF${rows.map((row) => row.map(csvCell).join(";")).join("\r\n")}`;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    link.download = `leadmap-${city.toLowerCase().replaceAll(" ", "-")}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    setToast(`Экспортировано: ${filtered.length}`);
  }

  async function copyPitch(lead: Lead) {
    await navigator.clipboard.writeText(pitchFor(lead));
    setToast("Персональный скрипт скопирован");
  }

  const latRange = Math.max(...filtered.map((lead) => lead.lat), 44.88) - Math.min(...filtered.map((lead) => lead.lat), 44.8);
  const lonRange = Math.max(...filtered.map((lead) => lead.lon), 65.55) - Math.min(...filtered.map((lead) => lead.lon), 65.45);
  const minLat = Math.min(...filtered.map((lead) => lead.lat), 44.8);
  const minLon = Math.min(...filtered.map((lead) => lead.lon), 65.45);

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">LM</span><span>LeadMap<span className="brand-kz">KZ</span></span></div>
        <nav className="nav" aria-label="Главное меню">
          <button className="nav-item active"><span className="nav-icon">◎</span>Радар лидов<span className="nav-count">{leads.length}</span></button>
          <button className="nav-item" onClick={() => setFilter("Сохранённые")}><span className="nav-icon">◇</span>Сохранённые<span className="nav-count">{saved.length}</span></button>
          <button className="nav-item" onClick={() => setToast("Канбан появится после подключения CRM")}><span className="nav-icon">≡</span>В работе</button>
          <button className="nav-item" onClick={() => setToast("Автомониторинг: следующий этап")}><span className="nav-icon">⌖</span>Мониторинг</button>
        </nav>
        <div className="sidebar-bottom">
          <div className="mini-card">
            <div className="mini-label">Источник</div>
            <div className="mini-value">{source === "2GIS" ? "Places API подключён" : "Открытая выдача · демо"}</div>
            <div className="usage-track"><div className="usage-fill" /></div>
          </div>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <button className="mobile-menu" aria-label="Открыть меню">≡</button>
          <div className="crumbs"><span>Радар</span><span>/</span><strong>{city}</strong></div>
          <div className="top-actions"><div className="status-pill"><span className="live-dot" />{source === "2GIS" ? "LIVE · 2ГИС API" : "ДЕМО · снимок выдачи"}</div><div className="avatar">AK</div></div>
        </header>

        <div className="content">
          <section className="intro">
            <div><div className="eyebrow">B2B opportunity intelligence</div><h1>Найдите бизнес, <span className="outline">готовый расти</span></h1></div>
            <p className="intro-copy">Сканируем локальные компании, находим разрывы в цифровой воронке и объясняем, что именно предложить.</p>
          </section>

          <section className="search-rig" aria-label="Параметры поиска">
            <label className="control"><span className="control-label">Город / регион</span><input value={city} onChange={(event) => setCity(event.target.value)} placeholder="Например, Алматы" /></label>
            <label className="control"><span className="control-label">Ниша</span><select value={category} onChange={(event) => setCategory(event.target.value)}>{CATEGORIES.map((item) => <option key={item}>{item}</option>)}</select></label>
            <button className="search-button" onClick={runSearch} disabled={loading}>{loading ? "Сканируем…" : "Найти лиды →"}</button>
          </section>
          <div className="source-note"><span className="source-chip">{source === "2GIS" ? "live" : "demo"}</span><span><strong>{source === "2GIS" ? "Официальные данные 2ГИС." : "Демо-выборка из открытой выдачи."}</strong> Скоринг — гипотеза; перед контактом проверьте карточку.</span></div>

          <section className="metrics" aria-label="Сводка">
            <div className="metric"><div className="metric-label">Всего лидов</div><div className="metric-value">{leads.length}</div><span className="metric-delta">в выборке</span></div>
            <div className="metric"><div className="metric-label">Горячие</div><div className="metric-value">{hotCount}</div><span className="metric-delta">{Math.round((hotCount / Math.max(leads.length, 1)) * 100)}%</span></div>
            <div className="metric"><div className="metric-label">CRM-сигнал</div><div className="metric-value">{crmCount}</div><span className="metric-delta">поток</span></div>
            <div className="metric"><div className="metric-label">Средний скор</div><div className="metric-value">{avgScore}</div><span className="metric-delta">/ 100</span></div>
          </section>

          <section className="dashboard-grid">
            <div className="panel">
              <div className="panel-head"><div><div className="panel-title">Потенциальные клиенты</div><div className="panel-subtitle">Сортировка по потенциалу сделки</div></div><div className="panel-actions"><button className="ghost-button" onClick={exportCsv}>CSV ↓</button></div></div>
              <div className="filter-row">{FILTERS.map((item) => <button key={item} className={`filter-chip ${filter === item ? "active" : ""}`} onClick={() => setFilter(item)}>{item}</button>)}</div>
              <div className="lead-list">
                {filtered.length ? filtered.map((lead) => (
                  <div key={lead.id} className={`lead-row ${selected?.id === lead.id ? "active" : ""}`} onClick={() => setSelectedId(lead.id)} role="button" tabIndex={0} onKeyDown={(event) => event.key === "Enter" && setSelectedId(lead.id)}>
                    <div className={`score ${lead.score < 80 ? "low" : lead.score < 89 ? "mid" : ""}`}>{lead.score}</div>
                    <div><div className="lead-name">{lead.name}</div><div className="lead-address">{lead.address} <a className="point-link" href={lead.url} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>2ГИС ↗</a></div></div>
                    <div className="category"><span className="category-mark" />{lead.category}</div>
                    <div className="rating">{lead.rating ? `★ ${lead.rating.toFixed(1)}` : "—"} <span>({lead.reviews})</span></div>
                    <div className="need-badge">{lead.need}</div>
                    <button className={`save-button ${saved.includes(lead.id) ? "saved" : ""}`} onClick={(event) => { event.stopPropagation(); toggleSaved(lead.id); }} aria-label={saved.includes(lead.id) ? "Убрать из сохранённых" : "Сохранить"}>{saved.includes(lead.id) ? "◆" : "◇"}</button>
                  </div>
                )) : <div className="empty">В этом фильтре пока нет лидов.</div>}
              </div>
            </div>

            <div className="panel map-panel">
              <div className="panel-head"><div><div className="panel-title">Карта возможностей</div><div className="panel-subtitle">{city} · {filtered.length} точек</div></div><div className="panel-actions"><span className="source-chip">гео</span></div></div>
              <div className="map">
                <div className="river" /><span className="map-label north">Север ↑</span><span className="map-label center">{city}</span>
                {filtered.map((lead) => {
                  const left = 9 + ((lead.lon - minLon) / Math.max(lonRange, .001)) * 82;
                  const top = 88 - ((lead.lat - minLat) / Math.max(latRange, .001)) * 76;
                  return <button key={lead.id} className={`map-pin ${selected?.id === lead.id ? "active" : ""}`} data-score={lead.score} title={lead.name} aria-label={`Открыть ${lead.name}`} style={{ left: `${left}%`, top: `${top}%` }} onClick={() => setSelectedId(lead.id)} />;
                })}
                <div className="map-legend"><span className="legend-item"><i className="legend-dot hot" />89–100</span><span className="legend-item"><i className="legend-dot" />до 88</span></div>
              </div>
              {selected && <div className="lead-detail">
                <div className="detail-top"><div><div className="detail-name">{selected.name}</div><div className="detail-meta">{selected.category} · {selected.address}</div></div><span className={`priority ${selected.priority === "Тёплый" ? "warm" : selected.priority === "Наблюдать" ? "watch" : ""}`}>{selected.priority}</span></div>
                <div className="signals">{selected.signals.map((signal) => <span className="signal" key={signal}>{signal}</span>)}</div>
                <p className="opportunity"><strong>Что предложить:</strong> {selected.opportunity}</p>
                <div className="detail-actions">
                  <a className="contact-small" href={contactUrl(selected)} target="_blank" rel="noreferrer">{selected.whatsapp ? "Написать лиду ↗" : "Контакты в 2ГИС ↗"}</a>
                  <button className="primary-small" onClick={() => copyPitch(selected)}>Скопировать скрипт</button>
                  <a className="secondary-small" href={selected.url} target="_blank" rel="noreferrer">Точка в 2ГИС ↗</a>
                </div>
              </div>}
            </div>
          </section>

          <section className="method">
            <div><div className="method-title">Как считаем потенциал</div><div className="method-copy">Скор не доказывает потребность — он ставит лиды в правильный порядок.</div></div>
            <div className="method-step"><span className="step-no">01</span><span className="step-text">Нет сайта в карточке 2ГИС</span></div>
            <div className="method-step"><span className="step-no">02</span><span className="step-text">Рейтинг и отзывы показывают спрос</span></div>
            <div className="method-step"><span className="step-no">03</span><span className="step-text">Филиалы и поток дают CRM-сигнал</span></div>
          </section>
        </div>
      </section>
      {toast && <div className="toast" role="status">{toast}</div>}
    </main>
  );
}
