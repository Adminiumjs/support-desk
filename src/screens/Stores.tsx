/*
 * `stores` — Store locator (delta spec A §7, logic C §"storeVals").
 *
 * Search + kind chips filter the same list twice: `filterStores()` is the one
 * definition, so the count under the map, the toasts the store fires and the
 * rows on screen can never disagree.
 *
 * Max-width 900.
 */

import {
  ButtonPrimary,
  ButtonSecondary,
  Card,
  Chip,
  ChipRow,
  Icon,
  MapPlaceholder,
  PlaceholderTile,
  SoftPill,
  TextInput,
  columnClass,
} from "../components";
import { dataSource } from "../data/source";
import { useI18n } from "../i18n";
import {
  filterStores,
  storeEmptyTitle,
  storeKindMeta,
  storeMapFile,
  storeMeta,
} from "../lib/derive";
import { useAppStore } from "../state/store";
import "../styles/screen-stores.css";

export default function Stores() {
  const { t, number } = useI18n();
  const stQ = useAppStore((s) => s.stQ);
  const stFilter = useAppStore((s) => s.stFilter);
  const set = useAppStore((s) => s.set);
  const go = useAppStore((s) => s.go);
  const storeSearch = useAppStore((s) => s.storeSearch);
  const storeSearchKey = useAppStore((s) => s.storeSearchKey);
  const storeNearMe = useAppStore((s) => s.storeNearMe);
  const storeReset = useAppStore((s) => s.storeReset);
  const storeDirections = useAppStore((s) => s.storeDirections);
  const storeCall = useAppStore((s) => s.storeCall);
  const storeBook = useAppStore((s) => s.storeBook);

  const rows = filterStores(dataSource.stores(), stQ, stFilter);

  return (
    <main className={`fx-screen fx-page ${columnClass("stores")} sto`}>
      <h1 className="sto__h1">{t("screensB.stores.h1")}</h1>
      <p className="sto__lede">{t("screensB.stores.lede")}</p>

      <Card className="sto-search">
        <div className="sto-search__field">
          <label className="sto-search__label" htmlFor="sto-q">
            {t("screensB.stores.searchLabel")}
          </label>
          <TextInput
            id="sto-q"
            type="search"
            value={stQ}
            onChange={(v) => set({ stQ: v })}
            placeholder={t("screensB.stores.searchPlaceholder")}
            onKeyDown={(e) => {
              if (e.key === "Enter") storeSearchKey();
            }}
          />
        </div>
        <ButtonPrimary icon="search" className="sto-search__go" onClick={storeSearch}>
          {t("screensB.stores.search")}
        </ButtonPrimary>
        <ButtonSecondary
          icon="locate-fixed"
          className="sto-search__near"
          onClick={storeNearMe}
        >
          {t("screensB.stores.nearMe")}
        </ButtonSecondary>
      </Card>

      <ChipRow className="sto__filters">
        {dataSource.storeFilters().map(([id, label, icon]) => (
          <Chip
            key={id}
            icon={icon}
            active={stFilter === id}
            onClick={() => set({ stFilter: id })}
          >
            {label}
          </Chip>
        ))}
      </ChipRow>

      <MapPlaceholder
        className="sto__map"
        filename={storeMapFile(stQ)}
        count={t("screensB.stores.shown", { count: number(rows.length) })}
      />

      {rows.length ? (
        <div className="sto-list">
          {rows.map((store) => {
            const kind = storeKindMeta(store.kind);
            return (
              <Card key={store.id} className="sto-card fx-card">
                <div className="sto-card__top">
                  <PlaceholderTile
                    tint={store.tint}
                    icon={kind.icon}
                    minHeight={62}
                    iconSize={26}
                    angle="150deg"
                    className="sto-card__tile"
                  />

                  <div className="sto-card__body">
                    <p className="sto-card__name">{store.name}</p>
                    <div className="sto-card__pills">
                      <SoftPill
                        fg={kind.fg}
                        soft={kind.soft}
                        icon={kind.icon}
                        iconSize={12}
                      >
                        {kind.label}
                      </SoftPill>
                      <SoftPill
                        fg={store.open ? "--pos" : "--fg-subtle"}
                        soft={store.open ? "--pos-soft" : "--surface-3"}
                      >
                        <span
                          className="sto-card__dot"
                          style={{
                            background: store.open
                              ? "var(--pos)"
                              : "var(--fg-subtle)",
                          }}
                        />
                        {store.open
                          ? t("screensB.stores.open")
                          : t("screensB.stores.closed")}
                      </SoftPill>
                    </div>
                    <p className="sto-card__address">{store.address}</p>
                    <p className="sto-card__meta">{storeMeta(store)}</p>
                    <div className="sto-card__tags">
                      {store.services.map(([label, icon]) => (
                        <span className="sto-card__tag" key={label}>
                          <Icon name={icon} size={12} />
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className="sto-card__distance">{store.distance}</span>
                </div>

                <div className="sto-card__acts">
                  <ButtonSecondary
                    icon="navigation"
                    iconSize={14}
                    onClick={() => storeDirections(store.name)}
                  >
                    {t("screensB.stores.directions")}
                  </ButtonSecondary>
                  <ButtonSecondary icon="phone" iconSize={14} onClick={storeCall}>
                    {store.phone}
                  </ButtonSecondary>
                  {store.kind === "flagship" ? (
                    <ButtonPrimary
                      size="md"
                      icon="wrench"
                      iconSize={15}
                      className="sto-card__book"
                      onClick={() => storeBook(store)}
                    >
                      {t("screensB.stores.bookRepair")}
                    </ButtonPrimary>
                  ) : null}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="empty sto-empty">
          <span className="empty__ico">
            <Icon name="map-pin-off" size={27} />
          </span>
          <h3 className="empty__title">{storeEmptyTitle(stQ)}</h3>
          <p className="empty__body">{t("screensB.stores.emptyBody")}</p>
          <div className="sto-empty__acts">
            <ButtonPrimary size="md" icon="list" onClick={storeReset}>
              {t("screensB.stores.showEvery")}
            </ButtonPrimary>
            <ButtonSecondary
              icon="hard-hat"
              iconSize={15}
              onClick={() => go("installers")}
            >
              {t("screensB.stores.findInstaller")}
            </ButtonSecondary>
          </div>
        </div>
      )}
    </main>
  );
}
