// HO10 — Unit Tests for TruncatePipe (Vitest)
import { describe, it, expect } from 'vitest';
import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  const pipe = new TruncatePipe();

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string for null/undefined input', () => {
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform(null as any)).toBe('');
  });

  it('should return the full string if shorter than limit', () => {
    const short = 'Short text';
    expect(pipe.transform(short, 100)).toBe(short);
  });

  it('should truncate long strings and append ellipsis', () => {
    const long = 'This is a very long string that exceeds the character limit for display';
    const result = pipe.transform(long, 20);
    expect(result.length).toBeLessThanOrEqual(23); // 20 + '...'
    expect(result.endsWith('...')).toBe(true);
  });

  it('should use custom ellipsis', () => {
    const text = 'A long description here for testing';
    const result = pipe.transform(text, 10, ' [more]');
    expect(result.endsWith(' [more]')).toBe(true);
  });

  it('should truncate exactly at the limit', () => {
    const text = 'ABCDEFGHIJ'; // 10 chars
    const result = pipe.transform(text, 5);
    expect(result).toBe('ABCDE...');
  });
});
