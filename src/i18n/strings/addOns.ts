/**
 * The HOST's own words about add-ons — and not one add-on's words.
 *
 * Every key here belongs to a surface this app draws AROUND something an
 * add-on drew: the manage drawer, its headings, the promise about what a
 * disconnect keeps. They are the host's half of the seam, all `addon.host.*`,
 * kept in one file so the whole of what this app says on the subject reads in
 * one sitting. NOT ONE OF THEM NAMES AN ADD-ON (acceptance criterion 5, and
 * `add-ons/addOns.test.ts` greps for it): an add-on's own strings ride on the
 * add-on object and are merged at registration by `registerAddOnMessages`,
 * which throws on a bundle that is not complete in all eight locales.
 *
 * The customer-only scope is COPY, not a comment: a reader who connects a
 * delivery company here and goes hunting for a staff dispatch screen is owed
 * the sentence on screen, which is why `manage.scope` is a message key and
 * not a paragraph in `slots.ts`.
 */
import type { LocaleTag } from '../locales';

export const addOns = {
  'en-US': {
    'addon.host.manage.open': 'Add-ons',
    'addon.host.manage.title': 'Add-ons',
    'addon.host.manage.sub':
      'Extra things this help desk can connect. Switch one on and its own screens appear where they belong.',
    'addon.host.manage.close': 'Close',
    'addon.host.manage.connect': 'Connect',
    'addon.host.manage.disconnect': 'Disconnect',
    'addon.host.manage.connected': 'Connected',
    'addon.host.manage.notConnected': 'Not connected',
    'addon.host.manage.permissions': 'What it can do',
    'addon.host.manage.settings': 'Settings',
    'addon.host.manage.noSettings': 'This one has nothing to set.',
    'addon.host.manage.goes': 'Disconnecting removes',
    'addon.host.manage.stays': 'Disconnecting keeps',
    'addon.host.manage.empty': 'This build has nothing to connect.',
    'addon.host.manage.scopeTitle': 'This is the customer’s half of the help desk',
    'addon.host.manage.scope':
      'You are looking at the customer support portal, so an add-on only appears where a customer meets it: a prepaid label on a return, tracking as the parcel travels back. Staff-side screens belong to the admin dashboard rather than in here.',
    'addon.host.notAffiliated':
      'Adminium is not affiliated with the companies these add-ons connect to. Every name and mark belongs to its owner.',
  },

  'de-DE': {
    'addon.host.manage.open': 'Add-ons',
    'addon.host.manage.title': 'Add-ons',
    'addon.host.manage.sub':
      'Zusätzliche Dienste, die dieser Kundenservice verbinden kann. Einmal eingeschaltet, erscheinen die eigenen Ansichten dort, wo sie hingehören.',
    'addon.host.manage.close': 'Schließen',
    'addon.host.manage.connect': 'Verbinden',
    'addon.host.manage.disconnect': 'Trennen',
    'addon.host.manage.connected': 'Verbunden',
    'addon.host.manage.notConnected': 'Nicht verbunden',
    'addon.host.manage.permissions': 'Was es darf',
    'addon.host.manage.settings': 'Einstellungen',
    'addon.host.manage.noSettings': 'Hier gibt es nichts einzustellen.',
    'addon.host.manage.goes': 'Beim Trennen entfällt',
    'addon.host.manage.stays': 'Beim Trennen bleibt',
    'addon.host.manage.empty': 'In dieser Version gibt es nichts zu verbinden.',
    'addon.host.manage.scopeTitle': 'Dies ist die Kundenseite des Kundendiensts',
    'addon.host.manage.scope':
      'Sie sehen das Kundenportal, deshalb erscheint ein Add-on nur dort, wo Kundschaft ihm begegnet: ein vorausbezahltes Etikett bei einer Rücksendung, Sendungsverfolgung auf dem Rückweg des Pakets. Alles für Mitarbeitende liegt im Admin-Dashboard, nicht hier.',
    'addon.host.notAffiliated':
      'Adminium steht in keiner Verbindung zu den Unternehmen, mit denen diese Add-ons arbeiten. Alle Namen und Marken gehören ihren Inhabern.',
  },

  'fr-FR': {
    'addon.host.manage.open': 'Modules',
    'addon.host.manage.title': 'Modules',
    'addon.host.manage.sub':
      'Ce que ce service client peut connecter en plus. Activez un module et ses écrans apparaissent là où ils ont leur place.',
    'addon.host.manage.close': 'Fermer',
    'addon.host.manage.connect': 'Connecter',
    'addon.host.manage.disconnect': 'Déconnecter',
    'addon.host.manage.connected': 'Connecté',
    'addon.host.manage.notConnected': 'Non connecté',
    'addon.host.manage.permissions': 'Ce qu’il peut faire',
    'addon.host.manage.settings': 'Réglages',
    'addon.host.manage.noSettings': 'Celui-ci n’a rien à régler.',
    'addon.host.manage.goes': 'La déconnexion retire',
    'addon.host.manage.stays': 'La déconnexion conserve',
    'addon.host.manage.empty': 'Cette version n’a rien à connecter.',
    'addon.host.manage.scopeTitle': 'Vous êtes du côté client du service',
    'addon.host.manage.scope':
      'Vous regardez le portail client : un module n’apparaît donc que là où un client le rencontre — une étiquette prépayée sur un retour, le suivi du colis sur le chemin du retour. Les écrans côté équipe se trouvent dans le tableau de bord d’administration, pas ici.',
    'addon.host.notAffiliated':
      'Adminium n’est affilié à aucune des sociétés auxquelles ces modules se connectent. Chaque nom et chaque marque appartient à son propriétaire.',
  },

  'cs-CZ': {
    'addon.host.manage.open': 'Doplňky',
    'addon.host.manage.title': 'Doplňky',
    'addon.host.manage.sub':
      'Co dalšího lze k této zákaznické podpoře připojit. Zapněte doplněk a jeho vlastní obrazovky se objeví tam, kam patří.',
    'addon.host.manage.close': 'Zavřít',
    'addon.host.manage.connect': 'Připojit',
    'addon.host.manage.disconnect': 'Odpojit',
    'addon.host.manage.connected': 'Připojeno',
    'addon.host.manage.notConnected': 'Nepřipojeno',
    'addon.host.manage.permissions': 'Co smí dělat',
    'addon.host.manage.settings': 'Nastavení',
    'addon.host.manage.noSettings': 'Tady není co nastavovat.',
    'addon.host.manage.goes': 'Odpojením zmizí',
    'addon.host.manage.stays': 'Odpojením zůstane',
    'addon.host.manage.empty': 'V této verzi není co připojit.',
    'addon.host.manage.scopeTitle': 'Toto je zákaznická část podpory',
    'addon.host.manage.scope':
      'Díváte se na zákaznický portál, a tak se doplněk objeví jen tam, kde na něj zákazník narazí: předplacený štítek u vrácení, sledování balíku na cestě zpět. Obrazovky týmu jsou v administraci, ne tady.',
    'addon.host.notAffiliated':
      'Adminium není nijak spojeno se společnostmi, k nimž se tyto doplňky připojují. Každý název i ochranná známka patří svému vlastníkovi.',
  },

  'da-DK': {
    'addon.host.manage.open': 'Tilføjelser',
    'addon.host.manage.title': 'Tilføjelser',
    'addon.host.manage.sub':
      'Det, denne kundeservice kan tilslutte derudover. Slå én til, og dens egne skærme dukker op, hvor de hører hjemme.',
    'addon.host.manage.close': 'Luk',
    'addon.host.manage.connect': 'Tilslut',
    'addon.host.manage.disconnect': 'Afbryd',
    'addon.host.manage.connected': 'Tilsluttet',
    'addon.host.manage.notConnected': 'Ikke tilsluttet',
    'addon.host.manage.permissions': 'Hvad den må',
    'addon.host.manage.settings': 'Indstillinger',
    'addon.host.manage.noSettings': 'Der er intet at indstille her.',
    'addon.host.manage.goes': 'Ved afbrydelse forsvinder',
    'addon.host.manage.stays': 'Ved afbrydelse bevares',
    'addon.host.manage.empty': 'Der er intet at tilslutte i denne udgave.',
    'addon.host.manage.scopeTitle': 'Det her er kundens halvdel af kundeservicen',
    'addon.host.manage.scope':
      'Du ser kundeportalen, så en tilføjelse dukker kun op, hvor en kunde møder den: en forudbetalt etiket på en retur, sporing mens pakken er på vej tilbage. Skærme til medarbejderne ligger i administrationen — ikke her.',
    'addon.host.notAffiliated':
      'Adminium er ikke tilknyttet de virksomheder, disse tilføjelser forbinder til. Alle navne og mærker tilhører deres ejere.',
  },

  'zh-CN': {
    'addon.host.manage.open': '插件',
    'addon.host.manage.title': '插件',
    'addon.host.manage.sub': '这个客服中心还可以接入的服务。开启后，它自己的界面会出现在该出现的位置。',
    'addon.host.manage.close': '关闭',
    'addon.host.manage.connect': '接入',
    'addon.host.manage.disconnect': '断开',
    'addon.host.manage.connected': '已接入',
    'addon.host.manage.notConnected': '未接入',
    'addon.host.manage.permissions': '它能做什么',
    'addon.host.manage.settings': '设置',
    'addon.host.manage.noSettings': '这个插件没有可设置的项目。',
    'addon.host.manage.goes': '断开后将移除',
    'addon.host.manage.stays': '断开后仍保留',
    'addon.host.manage.empty': '此版本没有可接入的插件。',
    'addon.host.manage.scopeTitle': '这里是客服中心面向顾客的一半',
    'addon.host.manage.scope':
      '您看到的是顾客端，因此插件只出现在顾客会遇到它的地方：退货时的预付标签、包裹寄回途中的物流轨迹。工作人员的界面在管理后台，不在这里。',
    'addon.host.notAffiliated': 'Adminium 与这些插件所连接的公司没有从属关系。所有名称与标识均归其所有者所有。',
  },

  'zh-TW': {
    'addon.host.manage.open': '外掛',
    'addon.host.manage.title': '外掛',
    'addon.host.manage.sub': '這個客服中心還可以接上的服務。開啟後，它自己的畫面會出現在該出現的位置。',
    'addon.host.manage.close': '關閉',
    'addon.host.manage.connect': '接上',
    'addon.host.manage.disconnect': '中斷',
    'addon.host.manage.connected': '已接上',
    'addon.host.manage.notConnected': '未接上',
    'addon.host.manage.permissions': '它能做什麼',
    'addon.host.manage.settings': '設定',
    'addon.host.manage.noSettings': '這個外掛沒有可設定的項目。',
    'addon.host.manage.goes': '中斷後將移除',
    'addon.host.manage.stays': '中斷後仍保留',
    'addon.host.manage.empty': '此版本沒有可接上的外掛。',
    'addon.host.manage.scopeTitle': '這裡是客服中心面向顧客的一半',
    'addon.host.manage.scope':
      '您看到的是顧客端，因此外掛只會出現在顧客會遇到它的地方：退貨時的預付標籤、包裹寄回途中的追蹤紀錄。工作人員的畫面在管理後台，不在這裡。',
    'addon.host.notAffiliated': 'Adminium 與這些外掛所連接的公司並無隸屬關係。所有名稱與標誌均歸其所有者所有。',
  },

  'ar-EG': {
    'addon.host.manage.open': 'الإضافات',
    'addon.host.manage.title': 'الإضافات',
    'addon.host.manage.sub':
      'خدمات إضافية يمكن لخدمة العملاء هذه ربطها. شغّل واحدة لتظهر شاشاتها الخاصة في مكانها الصحيح.',
    'addon.host.manage.close': 'إغلاق',
    'addon.host.manage.connect': 'ربط',
    'addon.host.manage.disconnect': 'فصل',
    'addon.host.manage.connected': 'مربوطة',
    'addon.host.manage.notConnected': 'غير مربوطة',
    'addon.host.manage.permissions': 'ما تستطيع فعله',
    'addon.host.manage.settings': 'الإعدادات',
    'addon.host.manage.noSettings': 'لا توجد إعدادات لهذه الإضافة.',
    'addon.host.manage.goes': 'يزيل الفصل',
    'addon.host.manage.stays': 'يبقي الفصل',
    'addon.host.manage.empty': 'لا يوجد ما يمكن ربطه في هذه النسخة.',
    'addon.host.manage.scopeTitle': 'هذا هو نصف خدمة العملاء الخاص بالعميل',
    'addon.host.manage.scope':
      'أنت تنظر إلى بوابة العميل، لذلك لا تظهر الإضافة إلا حيث يلتقي بها العميل: ملصق مدفوع مسبقًا عند الإرجاع، وتتبّع الطرد في طريق عودته. أما شاشات فريق العمل فمكانها لوحة الإدارة وليس هنا.',
    'addon.host.notAffiliated':
      'لا ترتبط Adminium بأي علاقة مع الشركات التي تتصل بها هذه الإضافات. كل اسم وعلامة ملك لصاحبه.',
  },
} satisfies Record<LocaleTag, Record<string, string>>;
