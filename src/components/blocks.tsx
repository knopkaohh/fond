"use client";

import { FormEvent, useState } from "react";
import type { PageBlock } from "@/lib/content";
import { requisites } from "@/lib/content";

export function Blocks({ blocks }: { blocks: PageBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        if (block.type === "lead") {
          return (
            <p key={index} className="text-lg leading-8 text-[var(--ink)]">
              {block.text}
            </p>
          );
        }
        if (block.type === "p") {
          return (
            <p key={index} className="leading-7 text-[var(--muted)]">
              {block.text}
            </p>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={index} className="space-y-2">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3 leading-7">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--gold)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "cards") {
          return (
            <div key={index} className="grid gap-4 sm:grid-cols-2">
              {block.items.map((item) => (
                <article key={item.title} className="card p-5">
                  <h2 className="text-lg font-bold">{item.title}</h2>
                  <p className="mt-2 text-[16px] leading-6 text-[var(--muted)]">{item.text}</p>
                </article>
              ))}
            </div>
          );
        }
        return (
          <p key={index} className="rounded-2xl bg-[var(--lavender)] px-4 py-3 text-sm leading-6 text-[var(--violet-deep)]">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

const amounts = [250, 500, 1000, 2500];

export function GiftForm() {
  const [amount, setAmount] = useState(500);
  const [custom, setCustom] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    const sum = custom ? Number(custom) : amount;
    return (
      <div className="card p-6">
        <h2 className="text-xl font-bold">Спасибо, что хотите помочь</h2>
        <p className="mt-3 leading-7 text-[var(--muted)]">
          Сумма {Number.isFinite(sum) && sum > 0 ? `${sum} ₽` : ""} в этом макете не списывается. Чтобы пожертвование дошло до фонда, отправьте СМС «СВЕТ {sum || 250}» на номер 3434 или переведите средства по реквизитам.
        </p>
        <ul className="mt-4 space-y-1 text-sm text-[var(--muted)]">
          {requisites.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-6">
      <h2 className="text-xl font-bold">Сделать пожертвование</h2>
      <p className="mt-2 text-sm text-[var(--muted)]">Выберите сумму. Платёж в этой версии не проводится.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {amounts.map((value) => (
          <button
            type="button"
            key={value}
            onClick={() => {
              setAmount(value);
              setCustom("");
            }}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              amount === value && !custom ? "bg-[var(--violet)] text-white" : "bg-[var(--lavender)]"
            }`}
          >
            {value} ₽
          </button>
        ))}
      </div>
      <label className="mt-4 block text-sm font-semibold">
        Другая сумма
        <input
          inputMode="numeric"
          value={custom}
          onChange={(event) => setCustom(event.target.value.replace(/[^\d]/g, ""))}
          className="mt-1 w-full rounded-2xl border border-[var(--line)] px-4 py-3 font-normal"
          placeholder="Например, 250"
        />
      </label>
      <label className="mt-3 block text-sm font-semibold">
        Имя
        <input name="name" required className="mt-1 w-full rounded-2xl border border-[var(--line)] px-4 py-3 font-normal" />
      </label>
      <label className="mt-3 block text-sm font-semibold">
        Эл. почта
        <input name="email" type="email" required className="mt-1 w-full rounded-2xl border border-[var(--line)] px-4 py-3 font-normal" />
      </label>
      <p className="mt-4 rounded-2xl bg-[var(--lavender)] px-4 py-3 text-sm leading-6">
        СМС-пожертвование: отправьте на номер 3434 текст «СВЕТ 250», где 250 — комфортная сумма. Для операторов РФ подтвердите платёж.
      </p>
      <button className="sun-btn mt-5" type="submit">
        Продолжить
      </button>
    </form>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <p className="rounded-3xl bg-[var(--lavender)] p-6 leading-7">
        Сообщение сохранено только в браузере. Чтобы оно дошло до фонда, отправьте его на info@sunlightfond.ru или позвоните +7 499 550 50 79.
      </p>
    );
  }
  return (
    <form
      className="card p-6"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <h2 className="text-xl font-bold">Отправить сообщение</h2>
      <label className="mt-4 block text-sm font-semibold">
        Имя
        <input required className="mt-1 w-full rounded-2xl border border-[var(--line)] px-4 py-3 font-normal" />
      </label>
      <label className="mt-3 block text-sm font-semibold">
        Почта или телефон
        <input required className="mt-1 w-full rounded-2xl border border-[var(--line)] px-4 py-3 font-normal" />
      </label>
      <label className="mt-3 block text-sm font-semibold">
        Сообщение
        <textarea required rows={4} className="mt-1 w-full rounded-2xl border border-[var(--line)] px-4 py-3 font-normal" />
      </label>
      <button className="sun-btn mt-5" type="submit">
        Отправить
      </button>
    </form>
  );
}
