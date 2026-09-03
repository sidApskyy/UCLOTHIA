"use client";

export function flyToCart(sourceEl: HTMLElement, imageSrc: string) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const cartIcon = document.querySelector("[data-cart-icon]") as HTMLElement | null;
  if (!cartIcon || !sourceEl) return;

  const sourceRect = sourceEl.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();

  const flyImg = document.createElement("img");
  flyImg.src = imageSrc;
  flyImg.className = "fly-to-cart";
  flyImg.style.width = `${sourceRect.width}px`;
  flyImg.style.height = `${sourceRect.height}px`;
  flyImg.style.left = `${sourceRect.left}px`;
  flyImg.style.top = `${sourceRect.top}px`;
  flyImg.style.opacity = "1";

  document.body.appendChild(flyImg);

  requestAnimationFrame(() => {
    flyImg.style.left = `${cartRect.left + cartRect.width / 2 - 20}px`;
    flyImg.style.top = `${cartRect.top + cartRect.height / 2 - 20}px`;
    flyImg.style.width = "40px";
    flyImg.style.height = "40px";
    flyImg.style.opacity = "0.3";
    flyImg.style.transform = "scale(0.5)";
  });

  setTimeout(() => {
    flyImg.remove();
    cartIcon.style.transform = "scale(1.3)";
    setTimeout(() => {
      cartIcon.style.transform = "scale(1)";
    }, 200);
  }, 700);
}
