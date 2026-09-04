import '@testing-library/jest-dom/vitest'

// jsdom lacks IntersectionObserver used by RevealSection
class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
// @ts-expect-error assign mock to global
globalThis.IntersectionObserver = IntersectionObserverMock

// jsdom lacks matchMedia used for media queries
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList
}

// scrollIntoView not implemented in jsdom
Element.prototype.scrollIntoView = () => {}

// jsdom lacks requestAnimationFrame in some versions
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(() => cb(Date.now()), 0)
}

// jsdom lacks scrollTo
window.scrollTo = () => {}