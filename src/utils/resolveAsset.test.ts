import { describe, it, expect } from 'vitest'
import { resolveAsset } from './resolveAsset'

describe('resolveAsset', () => {
  it('returns empty string for empty input', () => {
    expect(resolveAsset('')).toBe('')
  })

  it('leaves absolute http URLs untouched', () => {
    expect(resolveAsset('https://example.com/img.png')).toBe('https://example.com/img.png')
    expect(resolveAsset('http://example.com/img.png')).toBe('http://example.com/img.png')
  })

  it('leaves data URIs untouched', () => {
    expect(resolveAsset('data:image/png;base64,AAAA')).toBe('data:image/png;base64,AAAA')
  })

  it('prepends BASE_URL to relative paths', () => {
    const base = import.meta.env.BASE_URL || '/'
    const cleanBase = base.endsWith('/') ? base : `${base}/`
    expect(resolveAsset('assets/avatar.webp')).toBe(`${cleanBase}assets/avatar.webp`)
  })

  it('strips leading slash from asset path', () => {
    const base = import.meta.env.BASE_URL || '/'
    const cleanBase = base.endsWith('/') ? base : `${base}/`
    expect(resolveAsset('/assets/avatar.webp')).toBe(`${cleanBase}assets/avatar.webp`)
  })
})