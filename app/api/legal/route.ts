import { NextResponse } from 'next/server';
import { getLegal } from '@/src/services/sttmServer';

/** Пока документов нет, бэкенд отдаёт `enabled: false`, и клиент ничего не рисует. */
const DISABLED = { enabled: false, version: null, terms_url: null, privacy_url: null };

/**
 * Адреса документов и текущая редакция — для экрана регистрации, то есть до
 * появления сессии.
 */
export const GET = async () => {
  try {
    return NextResponse.json(await getLegal());
  } catch {
    // Недоступный бэкенд не должен ломать регистрацию: ведём себя так, будто
    // документов нет. Согласие всё равно проверяется на сервере при отправке.
    return NextResponse.json(DISABLED);
  }
};
