'use client';

import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

/**
 * Разворачивает элемент на весь экран через Fullscreen API.
 *
 * Так игра занимает весь экран, оставаясь в том же документе: результат она
 * шлёт через `postMessage` окну, в которое встроена, поэтому отдельная вкладка
 * оборвала бы начисление очков, а полноэкранный iframe — нет.
 *
 * Safari (iPad и старые версии) знает API только под префиксом `webkit`, а
 * Safari на iPhone не умеет его вовсе — там `isSupported` остаётся false и
 * кнопку показывать не нужно.
 */

interface WebkitElement extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void> | void;
}

interface WebkitDocument extends Document {
  webkitFullscreenEnabled?: boolean;
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
}

const fullscreenElement = () => {
  const doc = document as WebkitDocument;
  return doc.fullscreenElement ?? doc.webkitFullscreenElement ?? null;
};

export const useFullscreen = (ref: RefObject<HTMLElement | null>) => {
  // Считается после монтирования: на сервере `document` нет, а расхождение
  // разметки сервера и клиента ломает гидратацию.
  const [isSupported, setIsSupported] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  // Свой полноэкранный элемент хук помнит сам: к моменту выхода React уже мог
  // отцепить `ref` (оверлей размонтируется раньше, чем отработает cleanup
  // эффекта), и по пустому `ref.current` выходить было бы не из чего.
  const ownedRef = useRef<Element | null>(null);

  useEffect(() => {
    const doc = document as WebkitDocument;
    setIsSupported(Boolean(doc.fullscreenEnabled ?? doc.webkitFullscreenEnabled));

    const sync = () => {
      const current = fullscreenElement();
      // Выйти могли и мимо наших кнопок — по Esc; тогда элемент больше не наш.
      if (!current) ownedRef.current = null;
      setIsFullscreen(Boolean(current));
    };
    // Esc выходит из полноэкранного режима мимо наших кнопок, поэтому состояние
    // берётся из события, а не из того, что мы сами вызывали.
    document.addEventListener('fullscreenchange', sync);
    document.addEventListener('webkitfullscreenchange', sync);
    sync();

    return () => {
      document.removeEventListener('fullscreenchange', sync);
      document.removeEventListener('webkitfullscreenchange', sync);
    };
  }, []);

  const enter = useCallback(async () => {
    const element = ref.current as WebkitElement | null;
    if (!element || fullscreenElement()) return;

    ownedRef.current = element;
    try {
      await (element.requestFullscreen?.() ?? element.webkitRequestFullscreen?.());
    } catch {
      // Браузер может отказать, если жест пользователя уже «остыл» — тогда
      // остаётся кнопка, которая позовёт нас снова уже по клику.
      ownedRef.current = null;
    }
  }, [ref]);

  const exit = useCallback(async () => {
    const current = fullscreenElement();
    // Выходим только из своего элемента: чужой (например, видео со встроенными
    // контролами) закрывать не наше дело. Пусто — выходить уже не из чего.
    if (!current || current !== ownedRef.current) {
      if (!current) ownedRef.current = null;
      return;
    }

    ownedRef.current = null;
    const doc = document as WebkitDocument;
    try {
      await (doc.exitFullscreen?.() ?? doc.webkitExitFullscreen?.());
    } catch {
      // Выход уже произошёл сам — состояние всё равно придёт событием.
    }
  }, []);

  const toggle = useCallback(() => {
    void (isFullscreen ? exit() : enter());
  }, [isFullscreen, enter, exit]);

  return { isSupported, isFullscreen, enter, exit, toggle };
};
