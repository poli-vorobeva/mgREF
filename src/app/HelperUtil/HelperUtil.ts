class HelperUtil {
  el: HTMLElement | null;

  constructor(selector: HTMLElement | string | null) {
    this.el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  attribute(name: string, value: string) {
    if (name && value) {
      this.el?.setAttribute(name, value);
      return this.el;
    } else if (name && !value) {
      return this.el?.getAttribute(name);
    }
    // return this
  }

  append(child: HTMLElement | null | string | undefined) {
    // @ts-ignore
    this.el?.appendChild(child);
    return this;
  }

  text(txt: string) {
    // @ts-ignore
    this.el?.textContent = txt;
    return this;
  }

  html(html: string) {
    // @ts-ignore
    this.el?.innerHTML = html;
    return this;
  }

  end() {
    return this.el
  }
}

export function __(selector: HTMLElement | string | null) {
  return new HelperUtil(selector);
}

__.create = (tag: string, clss: string | string[] = '') => {
  const el = document.createElement(tag);
  clss && typeof clss === 'string' && el.classList.add(clss)
  clss && Array.isArray(clss) && clss.forEach(e => el.classList.add(e));
  return __(el);
}
__.in = (tag: HTMLElement | null) => {
  return __(tag);
}
