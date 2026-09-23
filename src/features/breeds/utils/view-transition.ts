const MAX_WAIT_MS = 700;

let finishPending: (() => void) | null = null;

export function coatTransitionName(slug: string) {
  return `coat-${slug}`;
}

export function canUseViewTransition() {
  return (
    typeof document !== "undefined" &&
    "startViewTransition" in document &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function navigateWithCoatTransition(element: HTMLElement, name: string, navigate: () => void) {
  if (!canUseViewTransition()) {
    navigate();
    return;
  }

  element.style.viewTransitionName = name;
  const transition = document.startViewTransition(
    () =>
      new Promise<void>((resolve) => {
        finishPending = resolve;
        navigate();
        setTimeout(resolve, MAX_WAIT_MS);
      }),
  );

  transition.finished.finally(() => {
    element.style.viewTransitionName = "";
    finishPending = null;
  });
}

export function completeCoatTransition() {
  finishPending?.();
  finishPending = null;
}
