/*
 * Mount point.
 *
 * The CSS imports come FIRST on purpose. ES modules evaluate in source order,
 * and Vite emits the stylesheet in that same order — importing App before the
 * token/base sheets would put components.css and every screen-*.css ahead of
 * tokens.css, and the cascade would lose.
 *
 *   tokens.css → base.css → components.css (via the barrel) → screen-*.css
 */

import "./styles/tokens.css";
import "./styles/base.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nProvider } from "./i18n";
import { setDataSource } from "./data/source";
import { clientFromEnv, loadSnapshot, snapshotSource } from "./data/adminiumSource";

/*
 * ONE condition decides demo vs connected: whether the API base URL and key are
 * present at build time. `createPublicClient` returns null when either is
 * missing, so the fallback is structural rather than a catch, and there is no
 * second flag to drift. The marketplace demo builds set neither and behave
 * byte-identically to before this file changed.
 *
 * The dynamic `import()` of `App` is load-bearing, not stylistic. The seam is a
 * Proxy, so a component reading `dataSource.brand()` at render always sees the
 * live source — but `state/store.ts` builds its initial state at MODULE SCOPE,
 * seeding the tickets, the order book and the chat greeting while the module is
 * evaluated. A static import would do that during this module's own imports,
 * before the fetch below could resolve, and the desk would open on demo data
 * whatever the server said.
 *
 * READ `data/adminiumSource.ts`'s header before pointing a build at a tenant:
 * ten of this app's tables exist and most of its screens have none.
 */
async function boot(): Promise<void> {
  const client = clientFromEnv();
  if (client !== null) {
    const snap = await loadSnapshot(client);
    if (snap !== null) {
      setDataSource(snapshotSource(snap));
      console.info(
        `[adminium] connected (${snap.side}): ${String(snap.articles.length)} articles, ` +
          `${String(snap.tickets.length)} tickets, ${String(snap.orders.length)} orders`,
      );
    }
  }

  /*
   * The add-on list, registered AFTER the data source is settled and BEFORE
   * the first render. The list is static and the registry boots empty, so
   * this is the only line that turns the seam on — remove it and every slot
   * draws its fallback, which is the D6 state. Importing the modules below
   * also runs `registerAddOnMessages` at module load, which THROWS naming the
   * add-on, the locale and the key on an incomplete bundle. In connected mode
   * (Phase B) only the SOURCE of this list changes.
   */
  const [{ demoAddOns }, { useAppStore }] = await Promise.all([
    import("./add-ons/registry.ts"),
    import("./state/store.ts"),
  ]);
  useAppStore.getState().registerAddOns(demoAddOns());

  const { App } = await import("./app/App.tsx");
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <I18nProvider>
        <App />
      </I18nProvider>
    </StrictMode>,
  );
}

void boot();
