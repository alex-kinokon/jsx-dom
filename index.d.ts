/**
 * Adapted from React TypeScript definition from DefinitelyTyped 16.9
 * @see https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts
 * https://github.com/DefinitelyTyped/DefinitelyTyped/commit/82f5b794c1086b1b75a394c32d8d0ca3d1565ac3
 */
import * as CSS from "csstype"

type Booleanish = boolean | "true" | "false"

export const SVGNamespace: "http://www.w3.org/2000/svg"

export function className(value: ClassNames): string

export { createElement as h, createElement as jsx, createElement as jsxs }

export function useText(initialValue?: string): readonly [Text, (value: string) => void]
export function useClassList(initialValue?: ClassNames): ClassList

export interface ClassList {
  (value: Element): void
  readonly size: number
  readonly value: string
  add(...tokens: string[]): void
  remove(...tokens: string[]): void
  toggle(token: string, force?: boolean): void
  contains(token: string): boolean
}

/** @internal */
declare const __defaultExport: {
  createElement: typeof createElement
  Fragment: typeof Fragment
}
export default __defaultExport

// Utility functions
export function stopPropagation(event: Event): Event
export function preventDefault(event: Event): Event

export namespace HTML {
  export type Anchor = HTMLAnchorElement
  export type Area = HTMLAreaElement
  export type Audio = HTMLAudioElement
  export type Base = HTMLBaseElement
  export type Body = HTMLBodyElement
  export type BR = HTMLBRElement
  export type Button = HTMLButtonElement
  export type Canvas = HTMLCanvasElement
  export type Data = HTMLDataElement
  export type DataList = HTMLDataListElement
  export type Details = HTMLDetailsElement
  export type Dialog = HTMLDialogElement
  export type Directory = HTMLDirectoryElement
  export type Div = HTMLDivElement
  export type DList = HTMLDListElement
  export type Embed = HTMLEmbedElement
  export type FieldSet = HTMLFieldSetElement
  export type Font = HTMLFontElement
  export type Form = HTMLFormElement
  export type Frame = HTMLFrameElement
  export type FrameSet = HTMLFrameSetElement
  export type Head = HTMLHeadElement
  export type Heading = HTMLHeadingElement
  export type HR = HTMLHRElement
  export type HtmlElement = HTMLHtmlElement
  export type IFrame = HTMLIFrameElement
  export type Image = HTMLImageElement
  export type Input = HTMLInputElement
  export type Label = HTMLLabelElement
  export type Legend = HTMLLegendElement
  export type LI = HTMLLIElement
  export type Link = HTMLLinkElement
  export type Map = HTMLMapElement
  export type Marquee = HTMLMarqueeElement
  export type MediaElement = HTMLMediaElement
  export type Menu = HTMLMenuElement
  export type Meta = HTMLMetaElement
  export type Meter = HTMLMeterElement
  export type Mod = HTMLModElement
  export type Object = HTMLObjectElement
  export type OList = HTMLOListElement
  export type OptGroup = HTMLOptGroupElement
  export type Option = HTMLOptionElement
  export type Output = HTMLOutputElement
  export type Paragraph = HTMLParagraphElement
  export type Param = HTMLParamElement
  export type Picture = HTMLPictureElement
  export type Pre = HTMLPreElement
  export type Progress = HTMLProgressElement
  export type Quote = HTMLQuoteElement
  export type Script = HTMLScriptElement
  export type Select = HTMLSelectElement
  export type Slot = HTMLSlotElement
  export type Source = HTMLSourceElement
  export type Span = HTMLSpanElement
  export type Style = HTMLStyleElement
  export type Table = HTMLTableElement
  export type TableCaption = HTMLTableCaptionElement
  export type TableCell = HTMLTableCellElement
  export type TableCol = HTMLTableColElement
  export type TableDataCell = HTMLTableDataCellElement
  export type TableHeaderCell = HTMLTableHeaderCellElement
  export type TableRow = HTMLTableRowElement
  export type TableSection = HTMLTableSectionElement
  export type Template = HTMLTemplateElement
  export type TextArea = HTMLTextAreaElement
  export type Time = HTMLTimeElement
  export type Title = HTMLTitleElement
  export type Track = HTMLTrackElement
  export type UList = HTMLUListElement
  export type Unknown = HTMLUnknownElement
  export type Video = HTMLVideoElement
}

export namespace SVG {
  export type Anchor = SVGAElement
  export type Animate = SVGAnimateElement
  export type AnimateMotion = SVGAnimateMotionElement
  export type AnimateTransform = SVGAnimateTransformElement
  export type Circle = SVGCircleElement
  export type ClipPath = SVGClipPathElement
  export type Defs = SVGDefsElement
  export type Desc = SVGDescElement
  export type Ellipse = SVGEllipseElement
  export type FEBlend = SVGFEBlendElement
  export type FEColorMatrix = SVGFEColorMatrixElement
  export type FEComponentTransfer = SVGFEComponentTransferElement
  export type FEConvolveMatrix = SVGFEConvolveMatrixElement
  export type FEDiffuseLighting = SVGFEDiffuseLightingElement
  export type FEDisplacementMap = SVGFEDisplacementMapElement
  export type FEDistantLight = SVGFEDistantLightElement
  export type FEDropShadow = SVGFEDropShadowElement
  export type FEFlood = SVGFEFloodElement
  export type FEFuncA = SVGFEFuncAElement
  export type FEFuncB = SVGFEFuncBElement
  export type FEFuncG = SVGFEFuncGElement
  export type FEFuncR = SVGFEFuncRElement
  export type FEGaussianBlur = SVGFEGaussianBlurElement
  export type FEImage = SVGFEImageElement
  export type FEMerge = SVGFEMergeElement
  export type FEMergeNode = SVGFEMergeNodeElement
  export type FEMorphology = SVGFEMorphologyElement
  export type FEOffset = SVGFEOffsetElement
  export type FEPointLight = SVGFEPointLightElement
  export type FETile = SVGFETileElement
  export type FETurbulence = SVGFETurbulenceElement
  export type Filter = SVGFilterElement
  export type Foreign = SVGForeignObjectElement
  export type G = SVGGElement
  export type Gradient = SVGGradientElement
  export type Image = SVGImageElement
  export type Line = SVGLineElement
  export type LinearGradient = SVGLinearGradientElement
  export type Marker = SVGMarkerElement
  export type Mask = SVGMaskElement
  export type Metadata = SVGMetadataElement
  export type Path = SVGPathElement
  export type Pattern = SVGPatternElement
  export type Polygon = SVGPolygonElement
  export type Polyline = SVGPolylineElement
  export type RadialGradient = SVGRadialGradientElement
  export type Rect = SVGRectElement
  export type Script = SVGScriptElement
  export type Stop = SVGStopElement
  export type Style = SVGStyleElement
  export type SVG = SVGSVGElement
  export type Switch = SVGSwitchElement
  export type Symbol = SVGSymbolElement
  export type Text = SVGTextElement
  export type TextPath = SVGTextPathElement
  export type Title = SVGTitleElement
  export type Use = SVGUseElement
  export type View = SVGViewElement
}

type Key = string | number

type ClassName = string | { [key: string]: boolean } | false | null | undefined | ClassName[]

export type ClassNames = ClassName | ClassList

interface RefObject<T> {
  readonly current: T | null
}
type RefCallback<T> = (instance: T) => void

type Ref<T> = RefCallback<T> | RefObject<T> | null

/**
 * @internal You shouldn't need to use this type since you never see these attributes
 * inside your component or have to validate them.
 */
interface Attributes {
  key?: Key
}
interface AttrWithRef<T> extends Attributes {
  ref?: Ref<T>
}

type ReactElement = HTMLElement | SVGElement

type DOMFactory<P extends DOMAttributes<T>, T extends Element> = (
  props?: (AttrWithRef<T> & P) | null,
  ...children: ReactNode[]
) => T

type HTMLFactory<T extends HTMLElement> = DetailedHTMLFactory<AllHTMLAttributes<T>, T>

interface DetailedHTMLFactory<P extends HTMLAttributes<T>, T extends HTMLElement>
  extends DOMFactory<P, T> {
  (props?: (AttrWithRef<T> & P) | null, ...children: ReactNode[]): T
  (...children: ReactNode[]): T
}

interface SVGFactory extends DOMFactory<SVGAttributes<SVGElement>, SVGElement> {
  (
    props?: (AttrWithRef<SVGElement> & SVGAttributes<SVGElement>) | null,
    ...children: ReactNode[]
  ): SVGElement
  (...children: ReactNode[]): SVGElement
}

//
// React Nodes
// http://facebook.github.io/react/docs/glossary.html
// ----------------------------------------------------------------------

type ReactText = string | number
type ReactChild = Element | ReactText

interface ReactNodeArray extends Array<ReactNode> {}
type ReactNode =
  | ReactChild
  | ReactNodeArray
  | DocumentFragment
  | Text
  | Comment
  | boolean
  | null
  | undefined

//
// Top Level API
// ----------------------------------------------------------------------

// DOM Elements
export function createFactory<K extends keyof ReactHTML>(type: K): HTMLFactory<ReactHTML[K]>
export function createFactory(type: keyof ReactSVG): SVGFactory
export function createFactory<T extends Element>(type: string): T

// DOM Elements
export function createElement<K extends keyof ReactHTML, T extends HTMLElementTagNameMap[K]>(
  type: K,
  props?: (HTMLAttributes<T> & AttrWithRef<T>) | null,
  ...children: ReactNode[]
): T
export function createElement<K extends keyof ReactSVG, T extends ReactSVG[K]>(
  type: K,
  props?: (SVGAttributes<T> & AttrWithRef<T>) | null,
  ...children: ReactNode[]
): SVGElement
export function createElement<T extends Element>(
  type: string,
  props?: (AttrWithRef<T> & DOMAttributes<T>) | null,
  ...children: ReactNode[]
): T

// Custom components

export function createElement<P extends {}, T extends Element>(
  type: FunctionComponent<P, T>,
  props?: (Attributes & P) | null,
  ...children: ReactNode[]
): T

export function createElement<T extends Element>(
  type: string,
  props?: Attributes | null,
  ...children: ReactNode[]
): T

export function Fragment(props: { children?: ReactNode }): any // DocumentFragment

interface FunctionComponent<P = {}, T extends Element = Element> {
  (props: PropsWithChildren<P>, context?: any): T | null
  defaultProps?: Partial<P>
  displayName?: string
}

type PropsWithChildren<P> = P & { children?: ReactNode }

//
// React Hooks
// ----------------------------------------------------------------------

// based on the code in https://github.com/facebook/react/pull/13968

// TODO (TypeScript 3.0): ReadonlyArray<unknown>
type DependencyList = ReadonlyArray<any>

interface MutableRefObject<T> {
  current: T
}

export function createRef<T = any>(): RefObject<T>

/**
 * `useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument
 * (`initialValue`). The returned object will persist for the full lifetime of the component.
 *
 * Note that `useRef()` is useful for more than the `ref` attribute. It’s handy for keeping any mutable
 * value around similar to how you’d use instance fields in classes.
 *
 * @version 16.8.0
 * @see https://reactjs.org/docs/hooks-reference.html#useref
 */
// TODO (TypeScript 3.0): <T extends unknown>
export function useRef<T>(initialValue: T): MutableRefObject<T>

// convenience overload for refs given as a ref prop as they typically start with a null value
/**
 * `useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument
 * (`initialValue`). The returned object will persist for the full lifetime of the component.
 *
 * Note that `useRef()` is useful for more than the `ref` attribute. It’s handy for keeping any mutable
 * value around similar to how you’d use instance fields in classes.
 *
 * Usage note: if you need the result of useRef to be directly mutable, include `| null` in the type
 * of the generic argument.
 *
 * @version 16.8.0
 * @see https://reactjs.org/docs/hooks-reference.html#useref
 */
// TODO (TypeScript 3.0): <T extends unknown>
export function useRef<T>(initialValue: T | null): RefObject<T>

// convenience overload for potentially undefined initialValue / call with 0 arguments
// has a default to stop it from defaulting to {} instead
/**
 * `useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument
 * (`initialValue`). The returned object will persist for the full lifetime of the component.
 *
 * Note that `useRef()` is useful for more than the `ref` attribute. It’s handy for keeping any mutable
 * value around similar to how you’d use instance fields in classes.
 *
 * @version 16.8.0
 * @see https://reactjs.org/docs/hooks-reference.html#useref
 */
// TODO (TypeScript 3.0): <T extends unknown>
export function useRef<T = undefined>(): MutableRefObject<T | undefined>

// I made 'inputs' required here and in useMemo as there's no point to memoizing without the memoization key
// useCallback(X) is identical to just using X, useMemo(() => Y) is identical to just using Y.
/**
 * `useCallback` will return a memoized version of the callback that only changes if one of the `inputs`
 * has changed.
 *
 * @version 16.8.0
 * @see https://reactjs.org/docs/hooks-reference.html#usecallback
 */
// TODO (TypeScript 3.0): <T extends (...args: never[]) => unknown>
export function useCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: DependencyList
): T

/**
 * `useMemo` will only recompute the memoized value when one of the `deps` has changed.
 *
 * Usage note: if calling `useMemo` with a referentially stable function, also give it as the input in
 * the second argument.
 *
 * ```ts
 * function expensive () { ... }
 *
 * function Component () {
 *   const expensiveResult = useMemo(expensive, [expensive])
 *   return ...
 * }
 * ```
 *
 * @version 16.8.0
 * @see https://reactjs.org/docs/hooks-reference.html#usememo
 */
// allow undefined, but don't make it optional as that is very likely a mistake
export function useMemo<T>(factory: () => T, deps: DependencyList | undefined): T

interface CurrentTarget<T> {
  currentTarget: EventTarget & T
}

type FormEvent = Event
type ChangeEvent = Event

//
// Event Handler Types
// ----------------------------------------------------------------------

type EventHandler<E extends Event, T> = (this: T, event: E & CurrentTarget<T>) => void

type ReactEventHandler<T = Element> = EventHandler<Event, T>

type ClipboardEventHandler<T = Element> = EventHandler<ClipboardEvent, T>
type CompositionEventHandler<T = Element> = EventHandler<CompositionEvent, T>
type DragEventHandler<T = Element> = EventHandler<DragEvent, T>
type FocusEventHandler<T = Element> = EventHandler<FocusEvent, T>
type FormEventHandler<T = Element> = EventHandler<FormEvent, T>
type ChangeEventHandler<T = Element> = EventHandler<ChangeEvent, T>
type KeyboardEventHandler<T = Element> = EventHandler<KeyboardEvent, T>
type MouseEventHandler<T = Element> = EventHandler<MouseEvent, T>
type TouchEventHandler<T = Element> = EventHandler<TouchEvent, T>
type PointerEventHandler<T = Element> = EventHandler<PointerEvent, T>
type UIEventHandler<T = Element> = EventHandler<UIEvent, T>
type WheelEventHandler<T = Element> = EventHandler<WheelEvent, T>
type AnimationEventHandler<T = Element> = EventHandler<AnimationEvent, T>
type TransitionEventHandler<T = Element> = EventHandler<TransitionEvent, T>

export type DetailedHTMLProps<E extends HTMLAttributes<T>, T> = AttrWithRef<T> & E

export interface SVGProps<T> extends SVGAttributes<T>, AttrWithRef<T> {}

interface DOMAttributes<T> {
  children?: ReactNode
  dangerouslySetInnerHTML?: {
    __html: string
  }

  // Clipboard Events
  onCopy?: ClipboardEventHandler<T>
  onCopyCapture?: ClipboardEventHandler<T>
  onCut?: ClipboardEventHandler<T>
  onCutCapture?: ClipboardEventHandler<T>
  onPaste?: ClipboardEventHandler<T>
  onPasteCapture?: ClipboardEventHandler<T>

  // Composition Events
  onCompositionEnd?: CompositionEventHandler<T>
  onCompositionEndCapture?: CompositionEventHandler<T>
  onCompositionStart?: CompositionEventHandler<T>
  onCompositionStartCapture?: CompositionEventHandler<T>
  onCompositionUpdate?: CompositionEventHandler<T>
  onCompositionUpdateCapture?: CompositionEventHandler<T>

  // Focus Events
  onFocus?: FocusEventHandler<T>
  onFocusCapture?: FocusEventHandler<T>
  onBlur?: FocusEventHandler<T>
  onBlurCapture?: FocusEventHandler<T>

  // Form Events
  onChange?: FormEventHandler<T>
  onChangeCapture?: FormEventHandler<T>
  onBeforeInput?: FormEventHandler<T>
  onBeforeInputCapture?: FormEventHandler<T>
  onInput?: FormEventHandler<T>
  onInputCapture?: FormEventHandler<T>
  onReset?: FormEventHandler<T>
  onResetCapture?: FormEventHandler<T>
  onSubmit?: FormEventHandler<T>
  onSubmitCapture?: FormEventHandler<T>
  onInvalid?: FormEventHandler<T>
  onInvalidCapture?: FormEventHandler<T>

  // Image Events
  onLoad?: ReactEventHandler<T>
  onLoadCapture?: ReactEventHandler<T>
  onError?: ReactEventHandler<T> // also a Media Event
  onErrorCapture?: ReactEventHandler<T> // also a Media Event

  // Keyboard Events
  onKeyDown?: KeyboardEventHandler<T>
  onKeyDownCapture?: KeyboardEventHandler<T>
  onKeyPress?: KeyboardEventHandler<T>
  onKeyPressCapture?: KeyboardEventHandler<T>
  onKeyUp?: KeyboardEventHandler<T>
  onKeyUpCapture?: KeyboardEventHandler<T>

  // Media Events
  onAbort?: ReactEventHandler<T>
  onAbortCapture?: ReactEventHandler<T>
  onCanPlay?: ReactEventHandler<T>
  onCanPlayCapture?: ReactEventHandler<T>
  onCanPlayThrough?: ReactEventHandler<T>
  onCanPlayThroughCapture?: ReactEventHandler<T>
  onDurationChange?: ReactEventHandler<T>
  onDurationChangeCapture?: ReactEventHandler<T>
  onEmptied?: ReactEventHandler<T>
  onEmptiedCapture?: ReactEventHandler<T>
  onEncrypted?: ReactEventHandler<T>
  onEncryptedCapture?: ReactEventHandler<T>
  onEnded?: ReactEventHandler<T>
  onEndedCapture?: ReactEventHandler<T>
  onLoadedData?: ReactEventHandler<T>
  onLoadedDataCapture?: ReactEventHandler<T>
  onLoadedMetadata?: ReactEventHandler<T>
  onLoadedMetadataCapture?: ReactEventHandler<T>
  onLoadStart?: ReactEventHandler<T>
  onLoadStartCapture?: ReactEventHandler<T>
  onPause?: ReactEventHandler<T>
  onPauseCapture?: ReactEventHandler<T>
  onPlay?: ReactEventHandler<T>
  onPlayCapture?: ReactEventHandler<T>
  onPlaying?: ReactEventHandler<T>
  onPlayingCapture?: ReactEventHandler<T>
  onProgress?: ReactEventHandler<T>
  onProgressCapture?: ReactEventHandler<T>
  onRateChange?: ReactEventHandler<T>
  onRateChangeCapture?: ReactEventHandler<T>
  onSeeked?: ReactEventHandler<T>
  onSeekedCapture?: ReactEventHandler<T>
  onSeeking?: ReactEventHandler<T>
  onSeekingCapture?: ReactEventHandler<T>
  onStalled?: ReactEventHandler<T>
  onStalledCapture?: ReactEventHandler<T>
  onSuspend?: ReactEventHandler<T>
  onSuspendCapture?: ReactEventHandler<T>
  onTimeUpdate?: ReactEventHandler<T>
  onTimeUpdateCapture?: ReactEventHandler<T>
  onVolumeChange?: ReactEventHandler<T>
  onVolumeChangeCapture?: ReactEventHandler<T>
  onWaiting?: ReactEventHandler<T>
  onWaitingCapture?: ReactEventHandler<T>

  // MouseEvents
  onAuxClick?: MouseEventHandler<T>
  onAuxClickCapture?: MouseEventHandler<T>
  onClick?: MouseEventHandler<T>
  onClickCapture?: MouseEventHandler<T>
  onContextMenu?: MouseEventHandler<T>
  onContextMenuCapture?: MouseEventHandler<T>
  onDoubleClick?: MouseEventHandler<T>
  onDoubleClickCapture?: MouseEventHandler<T>
  onDrag?: DragEventHandler<T>
  onDragCapture?: DragEventHandler<T>
  onDragEnd?: DragEventHandler<T>
  onDragEndCapture?: DragEventHandler<T>
  onDragEnter?: DragEventHandler<T>
  onDragEnterCapture?: DragEventHandler<T>
  onDragExit?: DragEventHandler<T>
  onDragExitCapture?: DragEventHandler<T>
  onDragLeave?: DragEventHandler<T>
  onDragLeaveCapture?: DragEventHandler<T>
  onDragOver?: DragEventHandler<T>
  onDragOverCapture?: DragEventHandler<T>
  onDragStart?: DragEventHandler<T>
  onDragStartCapture?: DragEventHandler<T>
  onDrop?: DragEventHandler<T>
  onDropCapture?: DragEventHandler<T>
  onMouseDown?: MouseEventHandler<T>
  onMouseDownCapture?: MouseEventHandler<T>
  onMouseEnter?: MouseEventHandler<T>
  onMouseLeave?: MouseEventHandler<T>
  onMouseMove?: MouseEventHandler<T>
  onMouseMoveCapture?: MouseEventHandler<T>
  onMouseOut?: MouseEventHandler<T>
  onMouseOutCapture?: MouseEventHandler<T>
  onMouseOver?: MouseEventHandler<T>
  onMouseOverCapture?: MouseEventHandler<T>
  onMouseUp?: MouseEventHandler<T>
  onMouseUpCapture?: MouseEventHandler<T>

  // Selection Events
  onSelect?: ReactEventHandler<T>
  onSelectCapture?: ReactEventHandler<T>

  // Touch Events
  onTouchCancel?: TouchEventHandler<T>
  onTouchCancelCapture?: TouchEventHandler<T>
  onTouchEnd?: TouchEventHandler<T>
  onTouchEndCapture?: TouchEventHandler<T>
  onTouchMove?: TouchEventHandler<T>
  onTouchMoveCapture?: TouchEventHandler<T>
  onTouchStart?: TouchEventHandler<T>
  onTouchStartCapture?: TouchEventHandler<T>

  // Pointer Events
  onPointerDown?: PointerEventHandler<T>
  onPointerDownCapture?: PointerEventHandler<T>
  onPointerMove?: PointerEventHandler<T>
  onPointerMoveCapture?: PointerEventHandler<T>
  onPointerUp?: PointerEventHandler<T>
  onPointerUpCapture?: PointerEventHandler<T>
  onPointerCancel?: PointerEventHandler<T>
  onPointerCancelCapture?: PointerEventHandler<T>
  onPointerEnter?: PointerEventHandler<T>
  onPointerEnterCapture?: PointerEventHandler<T>
  onPointerLeave?: PointerEventHandler<T>
  onPointerLeaveCapture?: PointerEventHandler<T>
  onPointerOver?: PointerEventHandler<T>
  onPointerOverCapture?: PointerEventHandler<T>
  onPointerOut?: PointerEventHandler<T>
  onPointerOutCapture?: PointerEventHandler<T>
  onGotPointerCapture?: PointerEventHandler<T>
  onGotPointerCaptureCapture?: PointerEventHandler<T>
  onLostPointerCapture?: PointerEventHandler<T>
  onLostPointerCaptureCapture?: PointerEventHandler<T>

  // UI Events
  onScroll?: UIEventHandler<T>
  onScrollCapture?: UIEventHandler<T>

  // Wheel Events
  onWheel?: WheelEventHandler<T>
  onWheelCapture?: WheelEventHandler<T>

  // Animation Events
  onAnimationStart?: AnimationEventHandler<T>
  onAnimationStartCapture?: AnimationEventHandler<T>
  onAnimationEnd?: AnimationEventHandler<T>
  onAnimationEndCapture?: AnimationEventHandler<T>
  onAnimationIteration?: AnimationEventHandler<T>
  onAnimationIterationCapture?: AnimationEventHandler<T>

  // Transition Events
  onTransitionEnd?: TransitionEventHandler<T>
  onTransitionEndCapture?: TransitionEventHandler<T>
}

export interface CSSProperties extends CSS.Properties<string | number> {
  /**
   * The index signature was removed to enable closed typing for style
   * using CSSType. You're able to use type assertion or module augmentation
   * to add properties or an index signature of your own.
   *
   * For examples and more information, visit:
   * https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
   */
}

// All the WAI-ARIA 1.1 attributes from https://www.w3.org/TR/wai-aria-1.1/
interface AriaAttributes {
  /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
  "aria-activedescendant"?: string
  /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
  "aria-atomic"?: boolean | "false" | "true"
  /**
   * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
   * presented if they are made.
   */
  "aria-autocomplete"?: "none" | "inline" | "list" | "both"
  /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
  "aria-busy"?: boolean | "false" | "true"
  /**
   * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
   * @see aria-pressed @see aria-selected.
   */
  "aria-checked"?: boolean | "false" | "mixed" | "true"
  /**
   * Defines the total number of columns in a table, grid, or treegrid.
   * @see aria-colindex.
   */
  "aria-colcount"?: number
  /**
   * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
   * @see aria-colcount @see aria-colspan.
   */
  "aria-colindex"?: number
  /**
   * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
   * @see aria-colindex @see aria-rowspan.
   */
  "aria-colspan"?: number
  /**
   * Identifies the element (or elements) whose contents or presence are controlled by the current element.
   * @see aria-owns.
   */
  "aria-controls"?: string
  /** Indicates the element that represents the current item within a container or set of related elements. */
  "aria-current"?: boolean | "false" | "true" | "page" | "step" | "location" | "date" | "time"
  /**
   * Identifies the element (or elements) that describes the object.
   * @see aria-labelledby
   */
  "aria-describedby"?: string
  /**
   * Identifies the element that provides a detailed, extended description for the object.
   * @see aria-describedby.
   */
  "aria-details"?: string
  /**
   * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
   * @see aria-hidden @see aria-readonly.
   */
  "aria-disabled"?: boolean | "false" | "true"
  /**
   * Indicates what functions can be performed when a dragged object is released on the drop target.
   * @deprecated in ARIA 1.1
   */
  "aria-dropeffect"?: "none" | "copy" | "execute" | "link" | "move" | "popup"
  /**
   * Identifies the element that provides an error message for the object.
   * @see aria-invalid @see aria-describedby.
   */
  "aria-errormessage"?: string
  /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
  "aria-expanded"?: boolean | "false" | "true"
  /**
   * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
   * allows assistive technology to override the general default of reading in document source order.
   */
  "aria-flowto"?: string
  /**
   * Indicates an element's "grabbed" state in a drag-and-drop operation.
   * @deprecated in ARIA 1.1
   */
  "aria-grabbed"?: boolean | "false" | "true"

  /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
  "aria-haspopup"?: boolean | "false" | "true" | "menu" | "listbox" | "tree" | "grid" | "dialog"
  /**
   * Indicates whether the element is exposed to an accessibility API.
   * @see aria-disabled.
   */
  "aria-hidden"?: boolean | "false" | "true"
  /**
   * Indicates the entered value does not conform to the format expected by the application.
   * @see aria-errormessage.
   */
  "aria-invalid"?: boolean | "false" | "true" | "grammar" | "spelling"
  /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
  "aria-keyshortcuts"?: string
  /**
   * Defines a string value that labels the current element.
   * @see aria-labelledby.
   */
  "aria-label"?: string
  /**
   * Identifies the element (or elements) that labels the current element.
   * @see aria-describedby.
   */
  "aria-labelledby"?: string
  /** Defines the hierarchical level of an element within a structure. */
  "aria-level"?: number
  /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
  "aria-live"?: "off" | "assertive" | "polite"
  /** Indicates whether an element is modal when displayed. */
  "aria-modal"?: boolean | "false" | "true"
  /** Indicates whether a text box accepts multiple lines of input or only a single line. */
  "aria-multiline"?: boolean | "false" | "true"
  /** Indicates that the user may select more than one item from the current selectable descendants. */
  "aria-multiselectable"?: boolean | "false" | "true"
  /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
  "aria-orientation"?: "horizontal" | "vertical"
  /**
   * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
   * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
   * @see aria-controls.
   */
  "aria-owns"?: string
  /**
   * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
   * A hint could be a sample value or a brief description of the expected format.
   */
  "aria-placeholder"?: string
  /**
   * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
   * @see aria-setsize.
   */
  "aria-posinset"?: number
  /**
   * Indicates the current "pressed" state of toggle buttons.
   * @see aria-checked @see aria-selected.
   */
  "aria-pressed"?: boolean | "false" | "mixed" | "true"
  /**
   * Indicates that the element is not editable, but is otherwise operable.
   * @see aria-disabled.
   */
  "aria-readonly"?: boolean | "false" | "true"
  /**
   * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
   * @see aria-atomic.
   */
  "aria-relevant"?: "additions" | "additions text" | "all" | "removals" | "text"
  /** Indicates that user input is required on the element before a form may be submitted. */
  "aria-required"?: boolean | "false" | "true"
  /** Defines a human-readable, author-localized description for the role of an element. */
  "aria-roledescription"?: string
  /**
   * Defines the total number of rows in a table, grid, or treegrid.
   * @see aria-rowindex.
   */
  "aria-rowcount"?: number
  /**
   * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
   * @see aria-rowcount @see aria-rowspan.
   */
  "aria-rowindex"?: number
  /**
   * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
   * @see aria-rowindex @see aria-colspan.
   */
  "aria-rowspan"?: number
  /**
   * Indicates the current "selected" state of various widgets.
   * @see aria-checked @see aria-pressed.
   */
  "aria-selected"?: boolean | "false" | "true"
  /**
   * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
   * @see aria-posinset.
   */
  "aria-setsize"?: number
  /** Indicates if items in a table or grid are sorted in ascending or descending order. */
  "aria-sort"?: "none" | "ascending" | "descending" | "other"
  /** Defines the maximum allowed value for a range widget. */
  "aria-valuemax"?: number
  /** Defines the minimum allowed value for a range widget. */
  "aria-valuemin"?: number
  /**
   * Defines the current value for a range widget.
   * @see aria-valuetext.
   */
  "aria-valuenow"?: number
  /** Defines the human readable text alternative of aria-valuenow for a range widget. */
  "aria-valuetext"?: string
}

export interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
  // Extension
  namespaceURI?: string
  class?: ClassNames
  innerHTML?: string
  innerText?: string
  textContent?: string
  dataset?: {
    [key: string]: string
  }

  // Standard HTML Attributes
  accessKey?: string
  className?: string
  contentEditable?: Booleanish | "inherit"
  contextMenu?: string
  dir?: string
  draggable?: Booleanish
  hidden?: boolean
  id?: string
  lang?: string
  placeholder?: string
  slot?: string
  spellCheck?: Booleanish
  style?: string | CSSProperties
  tabIndex?: number
  title?: string
  translate?: "yes" | "no"

  // Unknown
  radioGroup?: string // <command>, <menuitem>

  // WAI-ARIA
  role?: string

  // RDFa Attributes
  about?: string
  datatype?: string
  inlist?: any
  prefix?: string
  property?: string
  resource?: string
  typeof?: string
  vocab?: string

  // Non-standard Attributes
  autoCapitalize?: string
  autoCorrect?: string
  autoSave?: string
  color?: string
  itemProp?: string
  itemScope?: boolean
  itemType?: string
  itemID?: string
  itemRef?: string
  results?: number
  security?: string
  unselectable?: "on" | "off"

  // Living Standard
  /**
   * Hints at the type of data that might be entered by the user while editing the element or its contents
   * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
   */
  inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search"
  /**
   * Specify that a standard HTML element should behave like a defined custom built-in element
   * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
   */
  is?: string
}

interface AllHTMLAttributes<T> extends HTMLAttributes<T> {
  // Standard HTML Attributes
  accept?: string
  acceptCharset?: string
  action?: string
  allowFullScreen?: boolean
  allowTransparency?: boolean
  alt?: string
  as?: string
  async?: boolean
  autoComplete?: string
  autoFocus?: boolean
  autoPlay?: boolean
  capture?: boolean | string
  cellPadding?: number | string
  cellSpacing?: number | string
  charSet?: string
  challenge?: string
  checked?: boolean
  cite?: string
  classID?: string
  cols?: number
  colSpan?: number
  content?: string
  controls?: boolean
  coords?: string
  crossOrigin?: string
  data?: string
  dateTime?: string
  default?: boolean
  defer?: boolean
  disabled?: boolean
  download?: any
  encType?: string
  form?: string
  formAction?: string
  formEncType?: string
  formMethod?: string
  formNoValidate?: boolean
  formTarget?: string
  frameBorder?: number | string
  headers?: string
  height?: number | string
  high?: number
  href?: string
  hrefLang?: string
  htmlFor?: string
  httpEquiv?: string
  integrity?: string
  keyParams?: string
  keyType?: string
  kind?: string
  label?: string
  list?: string
  loop?: boolean
  low?: number
  manifest?: string
  marginHeight?: number
  marginWidth?: number
  max?: number | string
  maxLength?: number
  media?: string
  mediaGroup?: string
  method?: string
  min?: number | string
  minLength?: number
  multiple?: boolean
  muted?: boolean
  name?: string
  nonce?: string
  noValidate?: boolean
  open?: boolean
  optimum?: number
  pattern?: string
  placeholder?: string
  playsInline?: boolean
  poster?: string
  preload?: string
  readOnly?: boolean
  rel?: string
  required?: boolean
  reversed?: boolean
  rows?: number
  rowSpan?: number
  sandbox?: string
  scope?: string
  scoped?: boolean
  scrolling?: string
  seamless?: boolean
  selected?: boolean
  shape?: string
  size?: number
  sizes?: string
  span?: number
  src?: string
  srcDoc?: string
  srcLang?: string
  srcSet?: string
  start?: number
  step?: number | string
  summary?: string
  target?: string
  type?: string
  useMap?: string
  value?: string | string[] | number
  width?: number | string
  wmode?: string
  wrap?: string
}

interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
  download?: any
  href?: string
  hrefLang?: string
  media?: string
  ping?: string
  rel?: string
  target?: string
  type?: string
  referrerPolicy?: string
}

// tslint:disable-next-line:no-empty-interface
interface AudioHTMLAttributes<T> extends MediaHTMLAttributes<T> {}

interface AreaHTMLAttributes<T> extends HTMLAttributes<T> {
  alt?: string
  coords?: string
  download?: any
  href?: string
  hrefLang?: string
  media?: string
  rel?: string
  shape?: string
  target?: string
}

interface BaseHTMLAttributes<T> extends HTMLAttributes<T> {
  href?: string
  target?: string
}

interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {
  cite?: string
}

interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
  autoFocus?: boolean
  disabled?: boolean
  form?: string
  formAction?: string
  formEncType?: string
  formMethod?: string
  formNoValidate?: boolean
  formTarget?: string
  name?: string
  type?: "submit" | "reset" | "button"
  value?: string | string[] | number
}

interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
  height?: number | string
  width?: number | string
}

interface ColHTMLAttributes<T> extends HTMLAttributes<T> {
  span?: number
  width?: number | string
}

interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {
  span?: number
}

interface DataHTMLAttributes<T> extends HTMLAttributes<T> {
  value?: string | string[] | number
}

interface DetailsHTMLAttributes<T> extends HTMLAttributes<T> {
  open?: boolean
}

interface DelHTMLAttributes<T> extends HTMLAttributes<T> {
  cite?: string
  dateTime?: string
}

interface DialogHTMLAttributes<T> extends HTMLAttributes<T> {
  open?: boolean
}

interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
  height?: number | string
  src?: string
  type?: string
  width?: number | string
}

interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
  disabled?: boolean
  form?: string
  name?: string
}

interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
  acceptCharset?: string
  action?: string
  autoComplete?: string
  encType?: string
  method?: string
  name?: string
  noValidate?: boolean
  target?: string
}

interface HtmlHTMLAttributes<T> extends HTMLAttributes<T> {
  manifest?: string
}

interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
  allow?: string
  allowFullScreen?: boolean
  allowTransparency?: boolean
  frameBorder?: number | string
  height?: number | string
  marginHeight?: number
  marginWidth?: number
  name?: string
  referrerPolicy?: string
  sandbox?: string
  scrolling?: string
  seamless?: boolean
  src?: string
  srcDoc?: string
  width?: number | string
}

interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
  alt?: string
  crossOrigin?: "anonymous" | "use-credentials" | ""
  decoding?: "async" | "auto" | "sync"
  height?: number | string
  loading?: "eager" | "lazy"
  referrerPolicy?: "no-referrer" | "origin" | "unsafe-url"
  sizes?: string
  src?: string
  srcSet?: string
  useMap?: string
  width?: number | string
}

interface InsHTMLAttributes<T> extends HTMLAttributes<T> {
  cite?: string
  dateTime?: string
}

interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
  accept?: string
  alt?: string
  autoComplete?: string
  autoFocus?: boolean
  capture?: boolean | string // https://www.w3.org/TR/html-media-capture/#the-capture-attribute
  checked?: boolean
  crossOrigin?: string
  disabled?: boolean
  form?: string
  formAction?: string
  formEncType?: string
  formMethod?: string
  formNoValidate?: boolean
  formTarget?: string
  height?: number | string
  list?: string
  max?: number | string
  maxLength?: number
  min?: number | string
  minLength?: number
  multiple?: boolean
  name?: string
  pattern?: string
  placeholder?: string
  readOnly?: boolean
  required?: boolean
  size?: number
  src?: string
  step?: number | string
  type?: string
  value?: string | string[] | number
  width?: number | string

  onChange?: ChangeEventHandler<T>
}

interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {
  autoFocus?: boolean
  challenge?: string
  disabled?: boolean
  form?: string
  keyType?: string
  keyParams?: string
  name?: string
}

interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
  form?: string
  htmlFor?: string
}

interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
  value?: string | string[] | number
}

interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
  as?: string
  crossOrigin?: string
  href?: string
  hrefLang?: string
  integrity?: string
  media?: string
  rel?: string
  sizes?: string
  type?: string
  charSet?: string
}

interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
  name?: string
}

interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
  type?: string
}

interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
  autoPlay?: boolean
  controls?: boolean
  controlsList?: string
  crossOrigin?: string
  loop?: boolean
  mediaGroup?: string
  muted?: boolean
  playsInline?: boolean
  preload?: string
  src?: string
}

interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
  charSet?: string
  content?: string
  httpEquiv?: string
  name?: string
}

interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
  form?: string
  high?: number
  low?: number
  max?: number | string
  min?: number | string
  optimum?: number
  value?: string | string[] | number
}

interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
  cite?: string
}

interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
  classID?: string
  data?: string
  form?: string
  height?: number | string
  name?: string
  type?: string
  useMap?: string
  width?: number | string
  wmode?: string
}

interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
  reversed?: boolean
  start?: number
  type?: "1" | "a" | "A" | "i" | "I"
}

interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
  disabled?: boolean
  label?: string
}

interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
  disabled?: boolean
  label?: string
  selected?: boolean
  value?: string | string[] | number
}

interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
  form?: string
  htmlFor?: string
  name?: string
}

interface ParamHTMLAttributes<T> extends HTMLAttributes<T> {
  name?: string
  value?: string | string[] | number
}

interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
  max?: number | string
  value?: string | string[] | number
}

interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
  async?: boolean
  charSet?: string
  crossOrigin?: string
  defer?: boolean
  integrity?: string
  noModule?: boolean
  nonce?: string
  src?: string
  type?: string
}

interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
  autoComplete?: string
  autoFocus?: boolean
  disabled?: boolean
  form?: string
  multiple?: boolean
  name?: string
  required?: boolean
  size?: number
  value?: string | string[] | number
  onChange?: ChangeEventHandler<T>
}

interface SlotHTMLAttributes<T> extends HTMLAttributes<T> {
  name?: string
}

interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
  media?: string
  sizes?: string
  src?: string
  srcSet?: string
  type?: string
}

interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
  media?: string
  nonce?: string
  scoped?: boolean
  type?: string
}

interface TableHTMLAttributes<T> extends HTMLAttributes<T> {
  cellPadding?: number | string
  cellSpacing?: number | string
  summary?: string
}

interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
  autoComplete?: string
  autoFocus?: boolean
  cols?: number
  dirName?: string
  disabled?: boolean
  form?: string
  maxLength?: number
  minLength?: number
  name?: string
  placeholder?: string
  readOnly?: boolean
  required?: boolean
  rows?: number
  value?: string | string[] | number
  wrap?: string

  onChange?: ChangeEventHandler<T>
}

interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
  align?: "left" | "center" | "right" | "justify" | "char"
  colSpan?: number
  headers?: string
  rowSpan?: number
  scope?: string
  abbr?: string
  valign?: "top" | "middle" | "bottom" | "baseline"
}

interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
  align?: "left" | "center" | "right" | "justify" | "char"
  colSpan?: number
  headers?: string
  rowSpan?: number
  scope?: string
  abbr?: string
}

interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
  dateTime?: string
}

interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
  default?: boolean
  kind?: string
  label?: string
  src?: string
  srcLang?: string
}

interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
  height?: number | string
  playsInline?: boolean
  poster?: string
  width?: number | string
  disablePictureInPicture?: boolean
}

// this list is "complete" in that it contains every SVG attribute
// that React supports, but the types can be improved.
// Full list here: https://facebook.github.io/react/docs/dom-elements.html
//
// The three broad type categories are (in order of restrictiveness):
//   - "number | string"
//   - "string"
//   - union of string literals
interface SVGAttributes<T> extends AriaAttributes, DOMAttributes<T> {
  // Attributes which also defined in HTMLAttributes
  // See comment in SVGDOMPropertyConfig.js
  class?: ClassNames
  className?: string
  color?: string
  height?: number | string
  id?: string
  lang?: string
  max?: number | string
  media?: string
  method?: string
  min?: number | string
  name?: string
  style?: string | CSSProperties
  target?: string
  type?: string
  width?: number | string

  // Other HTML properties supported by SVG elements in browsers
  role?: string
  tabIndex?: number
  crossOrigin?: "anonymous" | "use-credentials" | ""

  // SVG Specific attributes
  accentHeight?: number | string
  accumulate?: "none" | "sum"
  additive?: "replace" | "sum"
  alignmentBaseline?:
    | "auto"
    | "baseline"
    | "before-edge"
    | "text-before-edge"
    | "middle"
    | "central"
    | "after-edge"
    | "text-after-edge"
    | "ideographic"
    | "alphabetic"
    | "hanging"
    | "mathematical"
    | "inherit"
  allowReorder?: "no" | "yes"
  alphabetic?: number | string
  amplitude?: number | string
  arabicForm?: "initial" | "medial" | "terminal" | "isolated"
  ascent?: number | string
  attributeName?: string
  attributeType?: string
  autoReverse?: Booleanish
  azimuth?: number | string
  baseFrequency?: number | string
  baselineShift?: number | string
  baseProfile?: number | string
  bbox?: number | string
  begin?: number | string
  bias?: number | string
  by?: number | string
  calcMode?: number | string
  capHeight?: number | string
  clip?: number | string
  clipPath?: string
  clipPathUnits?: number | string
  clipRule?: number | string
  colorInterpolation?: number | string
  colorInterpolationFilters?: "auto" | "sRGB" | "linearRGB" | "inherit"
  colorProfile?: number | string
  colorRendering?: number | string
  contentScriptType?: number | string
  contentStyleType?: number | string
  cursor?: number | string
  cx?: number | string
  cy?: number | string
  d?: string
  decelerate?: number | string
  descent?: number | string
  diffuseConstant?: number | string
  direction?: number | string
  display?: number | string
  divisor?: number | string
  dominantBaseline?: number | string
  dur?: number | string
  dx?: number | string
  dy?: number | string
  edgeMode?: number | string
  elevation?: number | string
  enableBackground?: number | string
  end?: number | string
  exponent?: number | string
  externalResourcesRequired?: Booleanish
  fill?: string
  fillOpacity?: number | string
  fillRule?: "nonzero" | "evenodd" | "inherit"
  filter?: string
  filterRes?: number | string
  filterUnits?: number | string
  floodColor?: number | string
  floodOpacity?: number | string
  focusable?: Booleanish | "auto"
  fontFamily?: string
  fontSize?: number | string
  fontSizeAdjust?: number | string
  fontStretch?: number | string
  fontStyle?: number | string
  fontVariant?: number | string
  fontWeight?: number | string
  format?: number | string
  from?: number | string
  fx?: number | string
  fy?: number | string
  g1?: number | string
  g2?: number | string
  glyphName?: number | string
  glyphOrientationHorizontal?: number | string
  glyphOrientationVertical?: number | string
  glyphRef?: number | string
  gradientTransform?: string
  gradientUnits?: string
  hanging?: number | string
  horizAdvX?: number | string
  horizOriginX?: number | string
  href?: string
  ideographic?: number | string
  imageRendering?: number | string
  in2?: number | string
  in?: string
  intercept?: number | string
  k1?: number | string
  k2?: number | string
  k3?: number | string
  k4?: number | string
  k?: number | string
  kernelMatrix?: number | string
  kernelUnitLength?: number | string
  kerning?: number | string
  keyPoints?: number | string
  keySplines?: number | string
  keyTimes?: number | string
  lengthAdjust?: number | string
  letterSpacing?: number | string
  lightingColor?: number | string
  limitingConeAngle?: number | string
  local?: number | string
  markerEnd?: string
  markerHeight?: number | string
  markerMid?: string
  markerStart?: string
  markerUnits?: number | string
  markerWidth?: number | string
  mask?: string
  maskContentUnits?: number | string
  maskUnits?: number | string
  mathematical?: number | string
  mode?: number | string
  numOctaves?: number | string
  offset?: number | string
  opacity?: number | string
  operator?: number | string
  order?: number | string
  orient?: number | string
  orientation?: number | string
  origin?: number | string
  overflow?: number | string
  overlinePosition?: number | string
  overlineThickness?: number | string
  paintOrder?: number | string
  panose1?: number | string
  path?: string
  pathLength?: number | string
  patternContentUnits?: string
  patternTransform?: number | string
  patternUnits?: string
  pointerEvents?: number | string
  points?: string
  pointsAtX?: number | string
  pointsAtY?: number | string
  pointsAtZ?: number | string
  preserveAlpha?: Booleanish
  preserveAspectRatio?: string
  primitiveUnits?: number | string
  r?: number | string
  radius?: number | string
  refX?: number | string
  refY?: number | string
  renderingIntent?: number | string
  repeatCount?: number | string
  repeatDur?: number | string
  requiredExtensions?: number | string
  requiredFeatures?: number | string
  restart?: number | string
  result?: string
  rotate?: number | string
  rx?: number | string
  ry?: number | string
  scale?: number | string
  seed?: number | string
  shapeRendering?: number | string
  slope?: number | string
  spacing?: number | string
  specularConstant?: number | string
  specularExponent?: number | string
  speed?: number | string
  spreadMethod?: string
  startOffset?: number | string
  stdDeviation?: number | string
  stemh?: number | string
  stemv?: number | string
  stitchTiles?: number | string
  stopColor?: string
  stopOpacity?: number | string
  strikethroughPosition?: number | string
  strikethroughThickness?: number | string
  string?: number | string
  stroke?: string
  strokeDasharray?: string | number
  strokeDashoffset?: string | number
  strokeLinecap?: "butt" | "round" | "square" | "inherit"
  strokeLinejoin?: "miter" | "round" | "bevel" | "inherit"
  strokeMiterlimit?: number | string
  strokeOpacity?: number | string
  strokeWidth?: number | string
  surfaceScale?: number | string
  systemLanguage?: number | string
  tableValues?: number | string
  targetX?: number | string
  targetY?: number | string
  textAnchor?: string
  textDecoration?: number | string
  textLength?: number | string
  textRendering?: number | string
  to?: number | string
  transform?: string
  u1?: number | string
  u2?: number | string
  underlinePosition?: number | string
  underlineThickness?: number | string
  unicode?: number | string
  unicodeBidi?: number | string
  unicodeRange?: number | string
  unitsPerEm?: number | string
  vAlphabetic?: number | string
  values?: string
  vectorEffect?: number | string
  version?: string
  vertAdvY?: number | string
  vertOriginX?: number | string
  vertOriginY?: number | string
  vHanging?: number | string
  vIdeographic?: number | string
  viewBox?: string
  viewTarget?: number | string
  visibility?: number | string
  vMathematical?: number | string
  widths?: number | string
  wordSpacing?: number | string
  writingMode?: number | string
  x1?: number | string
  x2?: number | string
  x?: number | string
  xChannelSelector?: string
  xHeight?: number | string
  xlinkActuate?: string
  xlinkArcrole?: string
  xlinkHref?: string
  xlinkRole?: string
  xlinkShow?: string
  xlinkTitle?: string
  xlinkType?: string
  xmlBase?: string
  xmlLang?: string
  xmlns?: string
  xmlnsXlink?: string
  xmlSpace?: string
  y1?: number | string
  y2?: number | string
  y?: number | string
  yChannelSelector?: string
  z?: number | string
  zoomAndPan?: string
}

interface WebViewHTMLAttributes<T> extends HTMLAttributes<T> {
  allowFullScreen?: boolean
  allowpopups?: boolean
  autoFocus?: boolean
  autosize?: boolean
  blinkfeatures?: string
  disableblinkfeatures?: string
  disableguestresize?: boolean
  disablewebsecurity?: boolean
  guestinstance?: string
  httpreferrer?: string
  nodeintegration?: boolean
  partition?: string
  plugins?: boolean
  preload?: string
  src?: string
  useragent?: string
  webpreferences?: string
}

//
// DOM
// ----------------------------------------------------------------------
type ReactHTML = HTMLElementTagNameMap

type HTMLWebViewElement = HTMLElement

interface ReactSVG {
  animate: SVGFactory
  circle: SVGFactory
  clipPath: SVGFactory
  defs: SVGFactory
  desc: SVGFactory
  ellipse: SVGFactory
  feBlend: SVGFactory
  feColorMatrix: SVGFactory
  feComponentTransfer: SVGFactory
  feComposite: SVGFactory
  feConvolveMatrix: SVGFactory
  feDiffuseLighting: SVGFactory
  feDisplacementMap: SVGFactory
  feDistantLight: SVGFactory
  feDropShadow: SVGFactory
  feFlood: SVGFactory
  feFuncA: SVGFactory
  feFuncB: SVGFactory
  feFuncG: SVGFactory
  feFuncR: SVGFactory
  feGaussianBlur: SVGFactory
  feImage: SVGFactory
  feMerge: SVGFactory
  feMergeNode: SVGFactory
  feMorphology: SVGFactory
  feOffset: SVGFactory
  fePointLight: SVGFactory
  feSpecularLighting: SVGFactory
  feSpotLight: SVGFactory
  feTile: SVGFactory
  feTurbulence: SVGFactory
  filter: SVGFactory
  foreignObject: SVGFactory
  g: SVGFactory
  image: SVGFactory
  line: SVGFactory
  linearGradient: SVGFactory
  marker: SVGFactory
  mask: SVGFactory
  metadata: SVGFactory
  path: SVGFactory
  pattern: SVGFactory
  polygon: SVGFactory
  polyline: SVGFactory
  radialGradient: SVGFactory
  rect: SVGFactory
  stop: SVGFactory
  svg: SVGFactory
  switch: SVGFactory
  symbol: SVGFactory
  text: SVGFactory
  textPath: SVGFactory
  tspan: SVGFactory
  use: SVGFactory
  view: SVGFactory
}

declare global {
  namespace JSX {
    type Element = ReactElement

    interface ElementAttributesProperty {
      props: {}
    }
    interface ElementChildrenAttribute {
      children: {}
    }

    // tslint:disable-next-line:no-empty-interface
    interface IntrinsicAttributes extends Attributes {}
    // tslint:disable-next-line:no-empty-interface
    interface IntrinsicClassAttributes<T> extends AttrWithRef<T> {}

    interface IntrinsicElements {
      // HTML
      a: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
      abbr: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      address: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      area: DetailedHTMLProps<AreaHTMLAttributes<HTMLAreaElement>, HTMLAreaElement>
      article: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      aside: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      audio: DetailedHTMLProps<AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>
      b: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      base: DetailedHTMLProps<BaseHTMLAttributes<HTMLBaseElement>, HTMLBaseElement>
      bdi: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      bdo: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      big: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      blockquote: DetailedHTMLProps<BlockquoteHTMLAttributes<HTMLElement>, HTMLElement>
      body: DetailedHTMLProps<HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>
      br: DetailedHTMLProps<HTMLAttributes<HTMLBRElement>, HTMLBRElement>
      button: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
      canvas: DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>
      caption: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      cite: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      code: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      col: DetailedHTMLProps<ColHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>
      colgroup: DetailedHTMLProps<
        ColgroupHTMLAttributes<HTMLTableColElement>,
        HTMLTableColElement
      >
      data: DetailedHTMLProps<DataHTMLAttributes<HTMLDataElement>, HTMLDataElement>
      datalist: DetailedHTMLProps<HTMLAttributes<HTMLDataListElement>, HTMLDataListElement>
      dd: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      del: DetailedHTMLProps<DelHTMLAttributes<HTMLElement>, HTMLElement>
      details: DetailedHTMLProps<DetailsHTMLAttributes<HTMLElement>, HTMLElement>
      dfn: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      dialog: DetailedHTMLProps<DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>
      div: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
      dl: DetailedHTMLProps<HTMLAttributes<HTMLDListElement>, HTMLDListElement>
      dt: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      em: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      embed: DetailedHTMLProps<EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>
      fieldset: DetailedHTMLProps<
        FieldsetHTMLAttributes<HTMLFieldSetElement>,
        HTMLFieldSetElement
      >
      figcaption: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      figure: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      footer: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      form: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
      h1: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
      h2: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
      h3: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
      h4: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
      h5: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
      h6: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
      head: DetailedHTMLProps<HTMLAttributes<HTMLHeadElement>, HTMLHeadElement>
      header: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      hgroup: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      hr: DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement>
      html: DetailedHTMLProps<HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement>
      i: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      iframe: DetailedHTMLProps<IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>
      img: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
      input: DetailedHTMLProps<InputHTMLAttributes<HTML.Input>, HTML.Input>
      ins: DetailedHTMLProps<InsHTMLAttributes<HTMLModElement>, HTMLModElement>
      kbd: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      keygen: DetailedHTMLProps<KeygenHTMLAttributes<HTMLElement>, HTMLElement>
      label: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>
      legend: DetailedHTMLProps<HTMLAttributes<HTMLLegendElement>, HTMLLegendElement>
      li: DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>
      link: DetailedHTMLProps<LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>
      main: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      map: DetailedHTMLProps<MapHTMLAttributes<HTMLMapElement>, HTMLMapElement>
      mark: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      menu: DetailedHTMLProps<MenuHTMLAttributes<HTMLElement>, HTMLElement>
      menuitem: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      meta: DetailedHTMLProps<MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>
      meter: DetailedHTMLProps<MeterHTMLAttributes<HTMLElement>, HTMLElement>
      nav: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      noindex: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      noscript: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      object: DetailedHTMLProps<ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement>
      ol: DetailedHTMLProps<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>
      optgroup: DetailedHTMLProps<
        OptgroupHTMLAttributes<HTMLOptGroupElement>,
        HTMLOptGroupElement
      >
      option: DetailedHTMLProps<OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>
      output: DetailedHTMLProps<OutputHTMLAttributes<HTMLElement>, HTMLElement>
      p: DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>
      param: DetailedHTMLProps<ParamHTMLAttributes<HTMLParamElement>, HTMLParamElement>
      picture: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      pre: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>
      progress: DetailedHTMLProps<
        ProgressHTMLAttributes<HTMLProgressElement>,
        HTMLProgressElement
      >
      q: DetailedHTMLProps<QuoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>
      rp: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      rt: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      ruby: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      s: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      samp: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      script: DetailedHTMLProps<ScriptHTMLAttributes<HTMLScriptElement>, HTMLScriptElement>
      section: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      select: DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
      slot: DetailedHTMLProps<SlotHTMLAttributes<HTMLElement>, HTMLSlotElement>
      small: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      source: DetailedHTMLProps<SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>
      span: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
      strong: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      style: DetailedHTMLProps<StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>
      sub: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      summary: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      sup: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      table: DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>
      template: DetailedHTMLProps<HTMLAttributes<HTMLTemplateElement>, HTMLTemplateElement>
      tbody: DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>
      td: DetailedHTMLProps<TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>
      textarea: DetailedHTMLProps<
        TextareaHTMLAttributes<HTMLTextAreaElement>,
        HTMLTextAreaElement
      >
      tfoot: DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>
      th: DetailedHTMLProps<
        ThHTMLAttributes<HTMLTableHeaderCellElement>,
        HTMLTableHeaderCellElement
      >
      thead: DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>
      time: DetailedHTMLProps<TimeHTMLAttributes<HTMLElement>, HTMLElement>
      title: DetailedHTMLProps<HTMLAttributes<HTMLTitleElement>, HTMLTitleElement>
      tr: DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>
      track: DetailedHTMLProps<TrackHTMLAttributes<HTMLTrackElement>, HTMLTrackElement>
      u: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      ul: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>
      var: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      video: DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>
      wbr: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      webview: DetailedHTMLProps<WebViewHTMLAttributes<HTMLWebViewElement>, HTMLWebViewElement>

      // SVG
      svg: SVGProps<SVGSVGElement>

      animate: SVGProps<SVGElement> // TODO: It is SVGAnimateElement but is not in TypeScript's lib.dom.d.ts for now.
      animateMotion: SVGProps<SVGElement>
      animateTransform: SVGProps<SVGElement> // TODO: It is SVGAnimateTransformElement but is not in TypeScript's lib.dom.d.ts for now.
      circle: SVGProps<SVGCircleElement>
      clipPath: SVGProps<SVGClipPathElement>
      defs: SVGProps<SVGDefsElement>
      desc: SVGProps<SVGDescElement>
      ellipse: SVGProps<SVGEllipseElement>
      feBlend: SVGProps<SVGFEBlendElement>
      feColorMatrix: SVGProps<SVGFEColorMatrixElement>
      feComponentTransfer: SVGProps<SVGFEComponentTransferElement>
      feComposite: SVGProps<SVGFECompositeElement>
      feConvolveMatrix: SVGProps<SVGFEConvolveMatrixElement>
      feDiffuseLighting: SVGProps<SVGFEDiffuseLightingElement>
      feDisplacementMap: SVGProps<SVGFEDisplacementMapElement>
      feDistantLight: SVGProps<SVGFEDistantLightElement>
      feDropShadow: SVGProps<SVGFEDropShadowElement>
      feFlood: SVGProps<SVGFEFloodElement>
      feFuncA: SVGProps<SVGFEFuncAElement>
      feFuncB: SVGProps<SVGFEFuncBElement>
      feFuncG: SVGProps<SVGFEFuncGElement>
      feFuncR: SVGProps<SVGFEFuncRElement>
      feGaussianBlur: SVGProps<SVGFEGaussianBlurElement>
      feImage: SVGProps<SVGFEImageElement>
      feMerge: SVGProps<SVGFEMergeElement>
      feMergeNode: SVGProps<SVGFEMergeNodeElement>
      feMorphology: SVGProps<SVGFEMorphologyElement>
      feOffset: SVGProps<SVGFEOffsetElement>
      fePointLight: SVGProps<SVGFEPointLightElement>
      feSpecularLighting: SVGProps<SVGFESpecularLightingElement>
      feSpotLight: SVGProps<SVGFESpotLightElement>
      feTile: SVGProps<SVGFETileElement>
      feTurbulence: SVGProps<SVGFETurbulenceElement>
      filter: SVGProps<SVGFilterElement>
      foreignObject: SVGProps<SVGForeignObjectElement>
      g: SVGProps<SVGGElement>
      image: SVGProps<SVGImageElement>
      line: SVGProps<SVGLineElement>
      linearGradient: SVGProps<SVGLinearGradientElement>
      marker: SVGProps<SVGMarkerElement>
      mask: SVGProps<SVGMaskElement>
      metadata: SVGProps<SVGMetadataElement>
      mpath: SVGProps<SVGElement>
      path: SVGProps<SVGPathElement>
      pattern: SVGProps<SVGPatternElement>
      polygon: SVGProps<SVGPolygonElement>
      polyline: SVGProps<SVGPolylineElement>
      radialGradient: SVGProps<SVGRadialGradientElement>
      rect: SVGProps<SVGRectElement>
      stop: SVGProps<SVGStopElement>
      switch: SVGProps<SVGSwitchElement>
      symbol: SVGProps<SVGSymbolElement>
      text: SVGProps<SVGTextElement>
      textPath: SVGProps<SVGTextPathElement>
      tspan: SVGProps<SVGTSpanElement>
      use: SVGProps<SVGUseElement>
      view: SVGProps<SVGViewElement>
    }
  }
}
