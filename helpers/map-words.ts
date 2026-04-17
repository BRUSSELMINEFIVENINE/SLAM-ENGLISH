import { Word } from '@/hooks/use-data';

export function mapWords(obj: Record<string, string>): Word[] {
  return Object.entries(obj).map(([word, value]) => ({
    word,
    value,
  }))
}