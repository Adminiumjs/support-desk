/*
 * `wish` — Wishlist (delta spec A §5, logic C §"wishVals").
 *
 * Saved products with price-drop and stock watching. Removal is the `wlOut`
 * id list (undoable from the toast), never a mutation of the dataset, so
 * "Put the demo items back" is simply `wlOut: []`.
 *
 * "Others also saved" renders in both branches, empty or not.
 *
 * Max-width 900.
 */

import {
  ButtonPrimary,
  ButtonSecondary,
  Callout,
  Card,
  Icon,
  IconButton,
  PlaceholderTile,
  SoftPill,
  columnClass,
} from "../components";
import { dataSource } from "../data/source";
import { useT } from "../i18n";
import {
  visibleWish,
  wishAlert,
  wishDropped,
  wishIntro,
  wishStockMeta,
} from "../lib/derive";
import { money } from "../lib/format";
import { useAppStore } from "../state/store";
import "../styles/screen-wish.css";

export default function Wish() {
  const t = useT();
  const wlOut = useAppStore((s) => s.wlOut);
  const go = useAppStore((s) => s.go);
  const wishAdd = useAppStore((s) => s.wishAdd);
  const wishRemove = useAppStore((s) => s.wishRemove);
  const wishAddAll = useAppStore((s) => s.wishAddAll);
  const wishShare = useAppStore((s) => s.wishShare);
  const wishRestore = useAppStore((s) => s.wishRestore);
  const saveToWishlist = useAppStore((s) => s.saveToWishlist);

  const items = visibleWish(dataSource.wishlist(), wlOut);
  const alert = wishAlert(items);

  return (
    <main className={`fx-screen fx-page ${columnClass("wish")} wl`}>
      <div className="wl__head">
        <div className="wl__head-text">
          <h1 className="wl__h1">{t("screensB.wish.h1")}</h1>
          <p className="wl__lede">{wishIntro(items.length)}</p>
        </div>
        <div className="wl__head-acts">
          <ButtonSecondary icon="share-2" onClick={wishShare}>
            {t("screensB.wish.shareList")}
          </ButtonSecondary>
          <ButtonPrimary icon="shopping-basket" onClick={wishAddAll}>
            {t("screensB.wish.addAllInStock")}
          </ButtonPrimary>
        </div>
      </div>

      {alert ? (
        <Callout tone="pos" icon="trending-down" className="wl__alert">
          {alert}
        </Callout>
      ) : null}

      {items.length ? (
        <div className="wl-list">
          {items.map((item) => {
            const product = dataSource.product(item.prod);
            const stock = wishStockMeta(item.stock);
            const dropped = wishDropped(item);
            const out = item.stock === "out";

            return (
              <Card key={item.id} className="wl-item fx-card">
                <PlaceholderTile
                  tint={product.tint}
                  icon={product.icon}
                  minHeight={70}
                  iconSize={28}
                  angle="150deg"
                  className="wl-item__tile"
                />

                <div className="wl-item__body">
                  <p className="wl-item__name">{item.name}</p>
                  <div className="wl-item__pills">
                    {dropped ? (
                      <span className="wl-item__drop">
                        <Icon name="arrow-down" size={11} />
                        {t("screensB.wish.priceDrop")}
                      </span>
                    ) : null}
                    <SoftPill
                      fg={stock.fg}
                      soft={stock.soft}
                      icon={stock.icon}
                      iconSize={12}
                    >
                      {stock.label}
                    </SoftPill>
                  </div>
                  <p className="wl-item__blurb">{item.blurb}</p>
                  <p className="wl-item__added">{item.added}</p>
                </div>

                <div className="wl-item__price">
                  <span className="wl-item__now">{money(item.price)}</span>
                  {dropped ? (
                    <span className="wl-item__was">{money(item.was)}</span>
                  ) : null}
                </div>

                <div className="wl-item__acts">
                  {out ? (
                    <ButtonSecondary
                      icon="bell"
                      iconSize={14}
                      className="wl-item__add"
                      onClick={() => wishAdd(item)}
                    >
                      {t("screensB.wish.notifyMe")}
                    </ButtonSecondary>
                  ) : (
                    <ButtonPrimary
                      icon="shopping-basket"
                      iconSize={14}
                      className="wl-item__add"
                      onClick={() => wishAdd(item)}
                    >
                      {t("screensB.wish.addToBasket")}
                    </ButtonPrimary>
                  )}
                  <IconButton
                    icon="heart-off"
                    label={t("screensB.wish.remove")}
                    small
                    iconSize={16}
                    onClick={() => wishRemove(item)}
                  />
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="empty wl-empty">
          <span className="empty__ico">
            <Icon name="heart" size={27} />
          </span>
          <h3 className="empty__title">{t("screensB.wish.emptyTitle")}</h3>
          <p className="empty__body">{t("screensB.wish.emptyBody")}</p>
          <div className="wl-empty__acts">
            <ButtonPrimary
              size="md"
              icon="boxes"
              onClick={() => go("bundles")}
            >
              {t("screensB.wish.browseBundles")}
            </ButtonPrimary>
            <ButtonSecondary icon="rotate-ccw" iconSize={15} onClick={wishRestore}>
              {t("screensB.wish.restore")}
            </ButtonSecondary>
          </div>
        </div>
      )}

      <h2 className="wl__h2">{t("screensB.wish.othersSaved")}</h2>
      <div className="wl-suggest">
        {dataSource.wishSuggestions().map((s) => {
          const product = dataSource.product(s.prod);
          return (
            <Card key={s.id} className="wl-sug">
              <PlaceholderTile
                tint={product.tint}
                icon={product.icon}
                minHeight={82}
                iconSize={28}
                className="wl-sug__tile"
              />
              <div className="wl-sug__row">
                <span className="wl-sug__name">{s.name}</span>
                <span className="wl-sug__price">{money(s.price)}</span>
              </div>
              <ButtonSecondary
                icon="heart"
                iconSize={14}
                className="wl-sug__save"
                onClick={() => saveToWishlist(s.name)}
              >
                {t("screensB.wish.saveIt")}
              </ButtonSecondary>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
