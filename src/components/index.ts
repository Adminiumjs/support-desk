/*
 * Shared-component barrel. Screens import from here:
 *
 *   import { Card, Chip, EmptyState, StatusPill } from "../components";
 *
 * Importing the barrel also pulls in components.css, so a screen never has to
 * remember it. Screen-local styles still live at src/styles/screen-<view>.css
 * and are imported by the screen itself.
 */

import "../styles/components.css";

export { Icon, ICONS } from "./Icon";
export type { IconProps } from "./Icon";

export {
  PlaceholderTile,
  IconChip,
  MapPlaceholder,
  hexToRgba,
  phBg,
  phIco,
  phInitials,
  useIsDark,
} from "./PlaceholderTile";
export type {
  PlaceholderTileProps,
  IconChipProps,
  MapPlaceholderProps,
} from "./PlaceholderTile";

export { Avatar } from "./Avatar";
export type { AvatarProps } from "./Avatar";

export {
  AccentIconTile,
  ButtonPrimary,
  ButtonSecondary,
  Callout,
  Card,
  Eyebrow,
  FactRow,
  GroupHeader,
  IconButton,
  ListCard,
} from "./Primitives";
export type {
  AccentIconTileProps,
  ButtonProps,
  ButtonSecondaryProps,
  CalloutProps,
  CalloutTone,
  CardProps,
  EyebrowProps,
  FactRowProps,
  GroupHeaderProps,
  IconButtonProps,
  ListCardProps,
} from "./Primitives";

export { Chip, ChipRow } from "./Chip";
export type { ChipProps, ChipRowProps } from "./Chip";

export { Tabs } from "./Tabs";
export type { TabsProps, TabOption } from "./Tabs";

export { Toggle } from "./Toggle";
export type { ToggleProps } from "./Toggle";

export { Radio } from "./Radio";
export type { RadioProps } from "./Radio";

export { Checkbox } from "./Checkbox";
export type { CheckboxProps } from "./Checkbox";

export { StatusPill, SoftPill } from "./StatusPill";
export type { StatusPillProps, SoftPillProps } from "./StatusPill";

export { EmptyState } from "./EmptyState";
export type { EmptyStateProps, EmptyStateSuggestion } from "./EmptyState";

export { StatTile, StatGrid } from "./StatTile";
export type { StatTileProps, StatGridProps } from "./StatTile";

export { MiniChart, ProgressBar } from "./MiniChart";
export type { MiniChartProps, MiniChartBar, ProgressBarProps } from "./MiniChart";

export {
  EventTimeline,
  HorizontalTimeline,
  StepIndicator,
  VerticalTimeline,
} from "./Timeline";
export type {
  EventTimelineEntry,
  EventTimelineProps,
  HorizontalTimelineProps,
  StepIndicatorProps,
  VerticalTimelineEntry,
  VerticalTimelineProps,
} from "./Timeline";

export { SearchHero } from "./SearchHero";
export { CategoryTile } from "./CategoryTile";
export type { CategoryTileProps } from "./CategoryTile";
export { ArticleCard, ArticleRow } from "./ArticleCard";
export type { ArticleCardProps, ArticleRowProps } from "./ArticleCard";
export { ArticleBody } from "./ArticleBody";
export type { ArticleBodyProps } from "./ArticleBody";

export {
  Field,
  FieldError,
  ProductPicker,
  SelectField,
  TextArea,
  TextInput,
} from "./TicketForm";
export type {
  FieldProps,
  ProductPickerProps,
  SelectFieldProps,
  TextAreaProps,
  TextInputProps,
} from "./TicketForm";

export { TicketRow } from "./TicketRow";
export type { TicketRowProps } from "./TicketRow";
export { ThreadBubble } from "./ThreadBubble";
export type { ThreadBubbleProps } from "./ThreadBubble";
export { TypingDots } from "./TypingDots";
export type { TypingDotsProps } from "./TypingDots";
export { AttachmentChip } from "./AttachmentChip";
export type { AttachmentChipProps } from "./AttachmentChip";

export { Header } from "./Header";
export { LocalePicker } from "./LocalePicker";
export { MobileSheet } from "./MobileSheet";
export { Footer } from "./Footer";
export { Breadcrumbs } from "./Breadcrumbs";
export { OutageBanner } from "./OutageBanner";
export { Toast } from "./Toast";
export { Modal } from "./Modal";
export type { ModalProps } from "./Modal";
export { AddOnsDrawer } from "./AddOnsDrawer";
export { CommandPalette } from "./CommandPalette";
export { ShortcutsOverlay } from "./ShortcutsOverlay";
export { ChatWidget } from "./ChatWidget";

/* --- delta components --- */

export { ErrorScreen, OfflineBanner } from "./ErrorScreen";
export { SuccessBanner } from "./SuccessBanner";
export { Skel, SkeletonScreen } from "./Skeleton";
export type { SkelProps } from "./Skeleton";
export { ClipCard, LiveStage } from "./LiveStage";
export type { ClipCardProps, LiveStageProps } from "./LiveStage";
export { InvoiceHead, InvoiceRow } from "./InvoiceRow";
export type { InvoiceRowProps } from "./InvoiceRow";

export {
  CHORD_MAP,
  CRUMB_LABELS,
  CRUMB_TRAILS,
  CRUMB_W,
  FOOTER_COLUMNS,
  NAV_LINKS,
  SHORTCUT_GROUPS,
  columnClass,
} from "./chrome";
export type {
  FooterColumn,
  FooterLink,
  FooterTarget,
  NavLink,
  ShortcutGroup,
} from "./chrome";
