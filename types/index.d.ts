/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Adapted from React TypeScript definition
 * @see https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts
 * https://github.com/DefinitelyTyped/DefinitelyTyped/commit/e05c7e9d4cf1034467ca7561d8dac71b0546b498
 */
import type * as CSS from "csstype"

export * from "./extra"
export { styled } from "./styled"

export type Booleanish = boolean | "true" | "false"
type CrossOrigin = "anonymous" | "use-credentials" | "" | undefined

export function className(value: ClassNames): string

export { createElement as h, jsx as jsxs }

export interface BasicClassList {
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
  Component: typeof Component
}
export default __defaultExport

export type Key = string | number | bigint

type ClassName = string | { [key: string]: boolean } | false | null | undefined | ClassName[]

export type ClassNames = ClassName | BasicClassList | Iterable<string>

export interface RefObject<T> {
  readonly current: T | null
}
export type RefCallback<T> = (instance: T) => void

export type Ref<T> = RefCallback<T> | RefObject<T> | null

/**
 * @internal You shouldn't need to use this type since you never see these attributes
 * inside your component or have to validate them.
 */
interface Attributes {
  key?: Key | null | undefined
}
interface AttrWithRef<T> extends Attributes {
  ref?: Ref<T> | undefined
}

export type ReactElement = HTMLElement | SVGElement

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

/**
 * @deprecated Inline the type instead to make the intent clear.
 */
type ReactText = string | number
/**
 * @deprecated Inline the type instead to make the intent clear.
 */
type ReactChild = Node | ReactText
type ReactChildren = ReactNodeArray | NodeList | HTMLCollection

/**
 * @deprecated Use either `ReactNode[]` if you need an array or `Iterable<ReactNode>` if its passed to a host component.
 */
interface ReactNodeArray extends Array<ReactNode> {}

export type ReactNode =
  | ReactElement
  | string
  | number
  | Iterable<ReactNode>
  | ReactChildren
  | ShadowRootContainer
  | DocumentFragment
  | Text
  | Comment
  | boolean
  | null
  | undefined

//
// Top Level API
// ----------------------------------------------------------------------
export type HTMLElementTagNames = keyof HTMLElementTagNameMap
export type SVGElementTagNames = keyof ReactSVG

// DOM Elements
export function createFactory<K extends HTMLElementTagNames>(type: K): HTMLFactory<ReactHTML[K]>
export function createFactory(type: SVGElementTagNames): SVGFactory
export function createFactory<T extends Element>(type: string): T

// DOM Elements
export function createElement<K extends HTMLElementTagNames, T extends HTMLElementTagNameMap[K]>(
  type: K,
  props?: (HTMLAttributes<T> & AttrWithRef<T>) | null,
  ...children: ReactNode[]
): T
export function createElement<K extends SVGElementTagNames, T extends ReactSVG[K]>(
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
export function createElement<T extends Element, Type extends ComponentClass<any, T>>(
  type: Type,
  props?:
    | (Attributes & PropOfComponent<Type> & { ref?: Ref<InstanceType<Type>> | undefined })
    | null,
  ...children: ReactNode[]
): T
export function createElement<P extends {}, T extends Element, Type extends ComponentClass<P, T>>(
  type: Type,
  props?: (Attributes & P & { ref?: Ref<InstanceType<Type>> | undefined }) | null,
  ...children: ReactNode[]
): T

export function createElement<T extends Element>(
  type: string,
  props?: Attributes | null,
  ...children: ReactNode[]
): T

// Locally scoped JSX types
export namespace createElement {
  export { JSX }
}

// DOM Elements
export function jsx<K extends HTMLElementTagNames, T extends HTMLElementTagNameMap[K]>(
  type: K,
  props?: PropsWithChildren<HTMLAttributes<T> & AttrWithRef<T>> | null,
  key?: string
): T
export function jsx<K extends SVGElementTagNames, T extends ReactSVG[K]>(
  type: K,
  props?: PropsWithChildren<SVGAttributes<T> & AttrWithRef<T>> | null,
  key?: string
): SVGElement
export function jsx<T extends Element>(
  type: string,
  props?: PropsWithChildren<AttrWithRef<T> & DOMAttributes<T>> | null,
  key?: string
): T

// Custom components
export function jsx<P extends {}, T extends Element>(
  type: ComponentType<P, T>,
  props?: PropsWithChildren<Attributes & P> | null,
  key?: string
): T

export function jsx<T extends Element>(
  type: string,
  props?: PropsWithChildren<Attributes> | null,
  key?: string
): T

export function Fragment(props: { children?: ReactNode | undefined }): any // DocumentFragment
export function StrictMode(props: { children?: ReactNode | undefined }): any // DocumentFragment

declare const jsxDomType: unique symbol
declare const enum JsxDomType {
  ShadowRoot = "ShadowRoot",
}

type ShadowRootContainer = ReturnType<typeof ShadowRoot>

export function ShadowRoot(
  props: ShadowRootInit & {
    ref?: RefObject<ShadowRoot> | ((value: ShadowRoot) => void)
    children?: ReactNode | undefined
  }
): {
  [jsxDomType]: JsxDomType
  attr: ShadowRootInit
  ref?: RefObject<ShadowRoot> | ((value: ShadowRoot) => void)
  children: ReactElement | ReactElement[]
}

export interface FunctionComponent<P = {}, T extends Element = JSX.Element> {
  (props: PropsWithChildren<P>, context?: any): T | null
  defaultProps?: Partial<P>
  displayName?: string
}

export { FunctionComponent as FC }

export interface ComponentClass<P = {}, T extends Element = JSX.Element> {
  new (props: P, context?: any): Component<P, T>
  defaultProps?: Partial<P> | undefined
  displayName?: string | undefined
}

export class Component<P = {}, T extends Element = JSX.Element> {
  constructor(props: PropsWithChildren<P> & { ref?: Ref<any> })
  readonly props: PropsWithChildren<P>
  render(): T | null
}

export { Component as PureComponent }

export type PropsWithChildren<P> = P & { children?: ReactNode | undefined }

export type ComponentType<P = {}, T extends Element = JSX.Element> =
  | ComponentClass<P, T>
  | FunctionComponent<P, T>

type PropOfComponent<T> = T extends ComponentType<infer P> ? P : never

//
// React Hooks
// ----------------------------------------------------------------------

// based on the code in https://github.com/facebook/react/pull/13968

type DependencyList = ReadonlyArray<unknown>

export interface MutableRefObject<T> {
  current: T
}

export function createRef<T = any>(): RefObject<T>

/**
 * React compatibility-only API.
 */
export function forwardRef<T = Node, P = {}>(
  render: (props: P, ref: Ref<T>) => ReactNode
): FunctionComponent<P & { ref?: Ref<T> }>

/**
 * `useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument
 * (`initialValue`). The returned object will persist for the full lifetime of the component.
 *
 * Note that `useRef()` is useful for more than the `ref` attribute. It’s handy for keeping any mutable
 * value around similar to how you’d use instance fields in classes.
 *
 * @version 16.8.0
 * @see https://react.dev/reference/react/useRef
 */
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
 * @see https://react.dev/reference/react/useRef
 */
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
 * @see https://react.dev/reference/react/useRef
 */
export function useRef<T = unknown>(): MutableRefObject<T | undefined>

export function useImperativeHandle<T>(ref: Ref<T>, init: () => T, deps?: DependencyList): void

// I made 'inputs' required here and in useMemo as there's no point to memoizing without the memoization key
// useCallback(X) is identical to just using X, useMemo(() => Y) is identical to just using Y.
/**
 * `useCallback` will return a memoized version of the callback that only changes if one of the `inputs`
 * has changed.
 *
 * @version 16.8.0
 * @see https://react.dev/reference/react/useCallback
 */
export function useCallback<T extends (...args: never[]) => any>(
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
 * @see https://react.dev/reference/react/useMemo
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

export type ReactEventHandler<T = Element> = EventHandler<Event, T>

export type ClipboardEventHandler<T = Element> = EventHandler<ClipboardEvent, T>
export type CompositionEventHandler<T = Element> = EventHandler<CompositionEvent, T>
export type DragEventHandler<T = Element> = EventHandler<DragEvent, T>
export type FocusEventHandler<T = Element> = EventHandler<FocusEvent, T>
export type FormEventHandler<T = Element> = EventHandler<FormEvent, T>
export type ChangeEventHandler<T = Element> = EventHandler<ChangeEvent, T>
export type KeyboardEventHandler<T = Element> = EventHandler<KeyboardEvent, T>
export type MouseEventHandler<T = Element> = EventHandler<MouseEvent, T>
export type TouchEventHandler<T = Element> = EventHandler<TouchEvent, T>
export type PointerEventHandler<T = Element> = EventHandler<PointerEvent, T>
export type UIEventHandler<T = Element> = EventHandler<UIEvent, T>
export type WheelEventHandler<T = Element> = EventHandler<WheelEvent, T>
export type AnimationEventHandler<T = Element> = EventHandler<AnimationEvent, T>
export type TransitionEventHandler<T = Element> = EventHandler<TransitionEvent, T>

export type DetailedHTMLProps<E extends HTMLAttributes<T>, T> = AttrWithRef<T> & E

export interface SVGProps<T> extends SVGAttributes<T>, AttrWithRef<T> {}

interface SVGLineElementAttributes<T> extends SVGProps<T> {}
interface SVGTextElementAttributes<T> extends SVGProps<T> {}

interface EventHandlers<T> {
  // Clipboard Events
  copy?: ClipboardEventHandler<T> | undefined
  cut?: ClipboardEventHandler<T> | undefined
  paste?: ClipboardEventHandler<T> | undefined

  // Composition Events
  compositionend?: CompositionEventHandler<T> | undefined
  compositionstart?: CompositionEventHandler<T> | undefined
  compositionupdate?: CompositionEventHandler<T> | undefined

  // Focus Events
  focus?: FocusEventHandler<T> | undefined
  blur?: FocusEventHandler<T> | undefined

  // Form Events
  change?: FormEventHandler<T> | undefined
  beforeinput?: FormEventHandler<T> | undefined
  input?: FormEventHandler<T> | undefined
  reset?: FormEventHandler<T> | undefined
  submit?: FormEventHandler<T> | undefined
  invalid?: FormEventHandler<T> | undefined

  // Image Events
  load?: ReactEventHandler<T> | undefined
  error?: ReactEventHandler<T> | undefined // also a Media Event

  // Keyboard Events
  keydown?: KeyboardEventHandler<T> | undefined
  keypress?: KeyboardEventHandler<T> | undefined
  keyup?: KeyboardEventHandler<T> | undefined

  // Media Events
  abort?: ReactEventHandler<T> | undefined
  canplay?: ReactEventHandler<T> | undefined
  canplaythrough?: ReactEventHandler<T> | undefined
  durationchange?: ReactEventHandler<T> | undefined
  emptied?: ReactEventHandler<T> | undefined
  encrypted?: ReactEventHandler<T> | undefined
  ended?: ReactEventHandler<T> | undefined
  loadeddata?: ReactEventHandler<T> | undefined
  loadedmetadata?: ReactEventHandler<T> | undefined
  loadstart?: ReactEventHandler<T> | undefined
  pause?: ReactEventHandler<T> | undefined
  play?: ReactEventHandler<T> | undefined
  playing?: ReactEventHandler<T> | undefined
  progress?: ReactEventHandler<T> | undefined
  ratechange?: ReactEventHandler<T> | undefined
  seeked?: ReactEventHandler<T> | undefined
  seeking?: ReactEventHandler<T> | undefined
  stalled?: ReactEventHandler<T> | undefined
  suspend?: ReactEventHandler<T> | undefined
  timeupdate?: ReactEventHandler<T> | undefined
  volumechange?: ReactEventHandler<T> | undefined
  waiting?: ReactEventHandler<T> | undefined

  // MouseEvents
  auxclick?: MouseEventHandler<T> | undefined
  click?: MouseEventHandler<T> | undefined
  contextmenu?: MouseEventHandler<T> | undefined
  doubleclick?: MouseEventHandler<T> | undefined
  drag?: DragEventHandler<T> | undefined
  dragend?: DragEventHandler<T> | undefined
  dragenter?: DragEventHandler<T> | undefined
  dragexit?: DragEventHandler<T> | undefined
  dragleave?: DragEventHandler<T> | undefined
  dragover?: DragEventHandler<T> | undefined
  dragstart?: DragEventHandler<T> | undefined
  drop?: DragEventHandler<T> | undefined
  mousedown?: MouseEventHandler<T> | undefined
  mouseenter?: MouseEventHandler<T> | undefined
  mouseleave?: MouseEventHandler<T> | undefined
  mousemove?: MouseEventHandler<T> | undefined
  mouseout?: MouseEventHandler<T> | undefined
  mouseover?: MouseEventHandler<T> | undefined
  mouseup?: MouseEventHandler<T> | undefined

  // Selection Events
  select?: ReactEventHandler<T> | undefined

  // Touch Events
  touchcancel?: TouchEventHandler<T> | undefined
  touchend?: TouchEventHandler<T> | undefined
  touchmove?: TouchEventHandler<T> | undefined
  touchstart?: TouchEventHandler<T> | undefined

  // Pointer Events
  pointerdown?: PointerEventHandler<T> | undefined
  pointermove?: PointerEventHandler<T> | undefined
  pointerup?: PointerEventHandler<T> | undefined
  pointercancel?: PointerEventHandler<T> | undefined
  pointerenter?: PointerEventHandler<T> | undefined
  pointerleave?: PointerEventHandler<T> | undefined
  pointerover?: PointerEventHandler<T> | undefined
  pointerout?: PointerEventHandler<T> | undefined

  // UI Events
  scroll?: UIEventHandler<T> | undefined

  // Wheel Events
  wheel?: WheelEventHandler<T> | undefined

  // Animation Events
  animationstart?: AnimationEventHandler<T> | undefined
  animationend?: AnimationEventHandler<T> | undefined
  animationiteration?: AnimationEventHandler<T> | undefined

  // Transition Events
  transitionend?: TransitionEventHandler<T> | undefined

  // Custom events
  [K: string]: EventHandler<any, T> | undefined
}

export interface DOMAttributes<T> {
  children?: ReactNode | undefined
  dangerouslySetInnerHTML?: { __html: string } | undefined

  on?: EventHandlers<T> | undefined
  onCapture?: EventHandlers<T> | undefined

  // Clipboard Events
  onCopy?: ClipboardEventHandler<T> | undefined
  onCopyCapture?: ClipboardEventHandler<T> | undefined
  onCut?: ClipboardEventHandler<T> | undefined
  onCutCapture?: ClipboardEventHandler<T> | undefined
  onPaste?: ClipboardEventHandler<T> | undefined
  onPasteCapture?: ClipboardEventHandler<T> | undefined

  // Composition Events
  onCompositionEnd?: CompositionEventHandler<T> | undefined
  onCompositionEndCapture?: CompositionEventHandler<T> | undefined
  onCompositionStart?: CompositionEventHandler<T> | undefined
  onCompositionStartCapture?: CompositionEventHandler<T> | undefined
  onCompositionUpdate?: CompositionEventHandler<T> | undefined
  onCompositionUpdateCapture?: CompositionEventHandler<T> | undefined

  // Focus Events
  onFocus?: FocusEventHandler<T> | undefined
  onFocusCapture?: FocusEventHandler<T> | undefined
  onBlur?: FocusEventHandler<T> | undefined
  onBlurCapture?: FocusEventHandler<T> | undefined

  // Form Events
  onChange?: FormEventHandler<T> | undefined
  onChangeCapture?: FormEventHandler<T> | undefined
  onBeforeInput?: FormEventHandler<T> | undefined
  onBeforeInputCapture?: FormEventHandler<T> | undefined
  onInput?: FormEventHandler<T> | undefined
  onInputCapture?: FormEventHandler<T> | undefined
  onReset?: FormEventHandler<T> | undefined
  onResetCapture?: FormEventHandler<T> | undefined
  onSubmit?: FormEventHandler<T> | undefined
  onSubmitCapture?: FormEventHandler<T> | undefined
  onInvalid?: FormEventHandler<T> | undefined
  onInvalidCapture?: FormEventHandler<T> | undefined

  // Image Events
  onLoad?: ReactEventHandler<T> | undefined
  onLoadCapture?: ReactEventHandler<T> | undefined
  onError?: ReactEventHandler<T> | undefined // also a Media Event
  onErrorCapture?: ReactEventHandler<T> | undefined // also a Media Event

  // Keyboard Events
  onKeyDown?: KeyboardEventHandler<T> | undefined
  onKeyDownCapture?: KeyboardEventHandler<T> | undefined
  /** @deprecated */
  onKeyPress?: KeyboardEventHandler<T> | undefined
  /** @deprecated */
  onKeyPressCapture?: KeyboardEventHandler<T> | undefined
  onKeyUp?: KeyboardEventHandler<T> | undefined
  onKeyUpCapture?: KeyboardEventHandler<T> | undefined

  // Media Events
  onAbort?: ReactEventHandler<T> | undefined
  onAbortCapture?: ReactEventHandler<T> | undefined
  onCanPlay?: ReactEventHandler<T> | undefined
  onCanPlayCapture?: ReactEventHandler<T> | undefined
  onCanPlayThrough?: ReactEventHandler<T> | undefined
  onCanPlayThroughCapture?: ReactEventHandler<T> | undefined
  onDurationChange?: ReactEventHandler<T> | undefined
  onDurationChangeCapture?: ReactEventHandler<T> | undefined
  onEmptied?: ReactEventHandler<T> | undefined
  onEmptiedCapture?: ReactEventHandler<T> | undefined
  onEncrypted?: ReactEventHandler<T> | undefined
  onEncryptedCapture?: ReactEventHandler<T> | undefined
  onEnded?: ReactEventHandler<T> | undefined
  onEndedCapture?: ReactEventHandler<T> | undefined
  onLoadedData?: ReactEventHandler<T> | undefined
  onLoadedDataCapture?: ReactEventHandler<T> | undefined
  onLoadedMetadata?: ReactEventHandler<T> | undefined
  onLoadedMetadataCapture?: ReactEventHandler<T> | undefined
  onLoadStart?: ReactEventHandler<T> | undefined
  onLoadStartCapture?: ReactEventHandler<T> | undefined
  onPause?: ReactEventHandler<T> | undefined
  onPauseCapture?: ReactEventHandler<T> | undefined
  onPlay?: ReactEventHandler<T> | undefined
  onPlayCapture?: ReactEventHandler<T> | undefined
  onPlaying?: ReactEventHandler<T> | undefined
  onPlayingCapture?: ReactEventHandler<T> | undefined
  onProgress?: ReactEventHandler<T> | undefined
  onProgressCapture?: ReactEventHandler<T> | undefined
  onRateChange?: ReactEventHandler<T> | undefined
  onRateChangeCapture?: ReactEventHandler<T> | undefined
  onResize?: ReactEventHandler<T> | undefined
  onResizeCapture?: ReactEventHandler<T> | undefined
  onSeeked?: ReactEventHandler<T> | undefined
  onSeekedCapture?: ReactEventHandler<T> | undefined
  onSeeking?: ReactEventHandler<T> | undefined
  onSeekingCapture?: ReactEventHandler<T> | undefined
  onStalled?: ReactEventHandler<T> | undefined
  onStalledCapture?: ReactEventHandler<T> | undefined
  onSuspend?: ReactEventHandler<T> | undefined
  onSuspendCapture?: ReactEventHandler<T> | undefined
  onTimeUpdate?: ReactEventHandler<T> | undefined
  onTimeUpdateCapture?: ReactEventHandler<T> | undefined
  onVolumeChange?: ReactEventHandler<T> | undefined
  onVolumeChangeCapture?: ReactEventHandler<T> | undefined
  onWaiting?: ReactEventHandler<T> | undefined
  onWaitingCapture?: ReactEventHandler<T> | undefined

  // MouseEvents
  onAuxClick?: MouseEventHandler<T> | undefined
  onAuxClickCapture?: MouseEventHandler<T> | undefined
  onClick?: MouseEventHandler<T> | undefined
  onClickCapture?: MouseEventHandler<T> | undefined
  onContextMenu?: MouseEventHandler<T> | undefined
  onContextMenuCapture?: MouseEventHandler<T> | undefined
  onDblClick?: MouseEventHandler<T> | undefined
  onDblClickCapture?: MouseEventHandler<T> | undefined
  onDoubleClick?: MouseEventHandler<T> | undefined
  onDoubleClickCapture?: MouseEventHandler<T> | undefined
  onDrag?: DragEventHandler<T> | undefined
  onDragCapture?: DragEventHandler<T> | undefined
  onDragEnd?: DragEventHandler<T> | undefined
  onDragEndCapture?: DragEventHandler<T> | undefined
  onDragEnter?: DragEventHandler<T> | undefined
  onDragEnterCapture?: DragEventHandler<T> | undefined
  onDragExit?: DragEventHandler<T> | undefined
  onDragExitCapture?: DragEventHandler<T> | undefined
  onDragLeave?: DragEventHandler<T> | undefined
  onDragLeaveCapture?: DragEventHandler<T> | undefined
  onDragOver?: DragEventHandler<T> | undefined
  onDragOverCapture?: DragEventHandler<T> | undefined
  onDragStart?: DragEventHandler<T> | undefined
  onDragStartCapture?: DragEventHandler<T> | undefined
  onDrop?: DragEventHandler<T> | undefined
  onDropCapture?: DragEventHandler<T> | undefined
  onMouseDown?: MouseEventHandler<T> | undefined
  onMouseDownCapture?: MouseEventHandler<T> | undefined
  onMouseEnter?: MouseEventHandler<T> | undefined
  onMouseLeave?: MouseEventHandler<T> | undefined
  onMouseMove?: MouseEventHandler<T> | undefined
  onMouseMoveCapture?: MouseEventHandler<T> | undefined
  onMouseOut?: MouseEventHandler<T> | undefined
  onMouseOutCapture?: MouseEventHandler<T> | undefined
  onMouseOver?: MouseEventHandler<T> | undefined
  onMouseOverCapture?: MouseEventHandler<T> | undefined
  onMouseUp?: MouseEventHandler<T> | undefined
  onMouseUpCapture?: MouseEventHandler<T> | undefined

  // Selection Events
  onSelect?: ReactEventHandler<T> | undefined
  onSelectCapture?: ReactEventHandler<T> | undefined

  // Touch Events
  onTouchCancel?: TouchEventHandler<T> | undefined
  onTouchCancelCapture?: TouchEventHandler<T> | undefined
  onTouchEnd?: TouchEventHandler<T> | undefined
  onTouchEndCapture?: TouchEventHandler<T> | undefined
  onTouchMove?: TouchEventHandler<T> | undefined
  onTouchMoveCapture?: TouchEventHandler<T> | undefined
  onTouchStart?: TouchEventHandler<T> | undefined
  onTouchStartCapture?: TouchEventHandler<T> | undefined

  // Pointer Events
  onPointerDown?: PointerEventHandler<T> | undefined
  onPointerDownCapture?: PointerEventHandler<T> | undefined
  onPointerMove?: PointerEventHandler<T> | undefined
  onPointerMoveCapture?: PointerEventHandler<T> | undefined
  onPointerUp?: PointerEventHandler<T> | undefined
  onPointerUpCapture?: PointerEventHandler<T> | undefined
  onPointerCancel?: PointerEventHandler<T> | undefined
  onPointerCancelCapture?: PointerEventHandler<T> | undefined
  onPointerEnter?: PointerEventHandler<T> | undefined
  onPointerEnterCapture?: PointerEventHandler<T> | undefined
  onPointerLeave?: PointerEventHandler<T> | undefined
  onPointerLeaveCapture?: PointerEventHandler<T> | undefined
  onPointerOver?: PointerEventHandler<T> | undefined
  onPointerOverCapture?: PointerEventHandler<T> | undefined
  onPointerOut?: PointerEventHandler<T> | undefined
  onPointerOutCapture?: PointerEventHandler<T> | undefined
  onGotPointerCapture?: PointerEventHandler<T> | undefined
  onGotPointerCaptureCapture?: PointerEventHandler<T> | undefined
  onLostPointerCapture?: PointerEventHandler<T> | undefined
  onLostPointerCaptureCapture?: PointerEventHandler<T> | undefined

  // UI Events
  onScroll?: UIEventHandler<T> | undefined
  onScrollCapture?: UIEventHandler<T> | undefined

  // Wheel Events
  onWheel?: WheelEventHandler<T> | undefined
  onWheelCapture?: WheelEventHandler<T> | undefined

  // Animation Events
  onAnimationStart?: AnimationEventHandler<T> | undefined
  onAnimationStartCapture?: AnimationEventHandler<T> | undefined
  onAnimationEnd?: AnimationEventHandler<T> | undefined
  onAnimationEndCapture?: AnimationEventHandler<T> | undefined
  onAnimationIteration?: AnimationEventHandler<T> | undefined
  onAnimationIterationCapture?: AnimationEventHandler<T> | undefined

  // Transition Events
  onTransitionEnd?: TransitionEventHandler<T> | undefined
  onTransitionEndCapture?: TransitionEventHandler<T> | undefined
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
export interface AriaAttributes {
  /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
  "aria-activedescendant"?: string | undefined
  /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
  "aria-atomic"?: Booleanish | undefined
  /**
   * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
   * presented if they are made.
   */
  "aria-autocomplete"?: "none" | "inline" | "list" | "both" | undefined
  /**
   * Defines a string value that labels the current element, which is intended to be converted into Braille.
   * @see aria-label.
   */
  "aria-braillelabel"?: string | undefined
  /**
   * Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.
   * @see aria-roledescription.
   */
  "aria-brailleroledescription"?: string | undefined
  /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
  "aria-busy"?: Booleanish | undefined
  /**
   * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
   * @see aria-pressed @see aria-selected.
   */
  "aria-checked"?: boolean | "false" | "mixed" | "true" | undefined
  /**
   * Defines the total number of columns in a table, grid, or treegrid.
   * @see aria-colindex.
   */
  "aria-colcount"?: number | undefined
  /**
   * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
   * @see aria-colcount @see aria-colspan.
   */
  "aria-colindex"?: number | undefined
  /**
   * Defines a human readable text alternative of aria-colindex.
   * @see aria-rowindextext.
   */
  "aria-colindextext"?: string | undefined
  /**
   * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
   * @see aria-colindex @see aria-rowspan.
   */
  "aria-colspan"?: number | undefined
  /**
   * Identifies the element (or elements) whose contents or presence are controlled by the current element.
   * @see aria-owns.
   */
  "aria-controls"?: string | undefined
  /** Indicates the element that represents the current item within a container or set of related elements. */
  "aria-current"?: Booleanish | "page" | "step" | "location" | "date" | "time" | undefined
  /**
   * Identifies the element (or elements) that describes the object.
   * @see aria-labelledby
   */
  "aria-describedby"?: string | undefined
  /**
   * Defines a string value that describes or annotates the current element.
   * @see related aria-describedby.
   */
  "aria-description"?: string | undefined
  /**
   * Identifies the element that provides a detailed, extended description for the object.
   * @see aria-describedby.
   */
  "aria-details"?: string | undefined
  /**
   * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
   * @see aria-hidden @see aria-readonly.
   */
  "aria-disabled"?: Booleanish | undefined
  /**
   * Indicates what functions can be performed when a dragged object is released on the drop target.
   * @deprecated in ARIA 1.1
   */
  "aria-dropeffect"?: "none" | "copy" | "execute" | "link" | "move" | "popup" | undefined
  /**
   * Identifies the element that provides an error message for the object.
   * @see aria-invalid @see aria-describedby.
   */
  "aria-errormessage"?: string | undefined
  /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
  "aria-expanded"?: Booleanish | undefined
  /**
   * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
   * allows assistive technology to override the general default of reading in document source order.
   */
  "aria-flowto"?: string | undefined
  /**
   * Indicates an element's "grabbed" state in a drag-and-drop operation.
   * @deprecated in ARIA 1.1
   */
  "aria-grabbed"?: Booleanish | undefined

  /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
  "aria-haspopup"?: Booleanish | "menu" | "listbox" | "tree" | "grid" | "dialog" | undefined
  /**
   * Indicates whether the element is exposed to an accessibility API.
   * @see aria-disabled.
   */
  "aria-hidden"?: Booleanish | undefined
  /**
   * Indicates the entered value does not conform to the format expected by the application.
   * @see aria-errormessage.
   */
  "aria-invalid"?: Booleanish | "grammar" | "spelling" | undefined
  /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
  "aria-keyshortcuts"?: string | undefined
  /**
   * Defines a string value that labels the current element.
   * @see aria-labelledby.
   */
  "aria-label"?: string | undefined
  /**
   * Identifies the element (or elements) that labels the current element.
   * @see aria-describedby.
   */
  "aria-labelledby"?: string | undefined
  /** Defines the hierarchical level of an element within a structure. */
  "aria-level"?: number | undefined
  /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
  "aria-live"?: "off" | "assertive" | "polite" | undefined
  /** Indicates whether an element is modal when displayed. */
  "aria-modal"?: Booleanish | undefined
  /** Indicates whether a text box accepts multiple lines of input or only a single line. */
  "aria-multiline"?: Booleanish | undefined
  /** Indicates that the user may select more than one item from the current selectable descendants. */
  "aria-multiselectable"?: Booleanish | undefined
  /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
  "aria-orientation"?: "horizontal" | "vertical" | undefined
  /**
   * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
   * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
   * @see aria-controls.
   */
  "aria-owns"?: string | undefined
  /**
   * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
   * A hint could be a sample value or a brief description of the expected format.
   */
  "aria-placeholder"?: string | undefined
  /**
   * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
   * @see aria-setsize.
   */
  "aria-posinset"?: number | undefined
  /**
   * Indicates the current "pressed" state of toggle buttons.
   * @see aria-checked @see aria-selected.
   */
  "aria-pressed"?: boolean | "false" | "mixed" | "true" | undefined
  /**
   * Indicates that the element is not editable, but is otherwise operable.
   * @see aria-disabled.
   */
  "aria-readonly"?: Booleanish | undefined

  /**
   * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
   * @see aria-atomic.
   */
  "aria-relevant"?:
    | "additions"
    | "additions removals"
    | "additions text"
    | "all"
    | "removals"
    | "removals additions"
    | "removals text"
    | "text"
    | "text additions"
    | "text removals"
    | undefined

  /** Indicates that user input is required on the element before a form may be submitted. */
  "aria-required"?: Booleanish | undefined
  /** Defines a human-readable, author-localized description for the role of an element. */
  "aria-roledescription"?: string | undefined
  /**
   * Defines the total number of rows in a table, grid, or treegrid.
   * @see aria-rowindex.
   */
  "aria-rowcount"?: number | undefined
  /**
   * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
   * @see aria-rowcount @see aria-rowspan.
   */
  "aria-rowindex"?: number | undefined
  /**
   * Defines a human readable text alternative of aria-rowindex.
   * @see aria-colindextext.
   */
  "aria-rowindextext"?: string | undefined
  /**
   * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
   * @see aria-rowindex @see aria-colspan.
   */
  "aria-rowspan"?: number | undefined
  /**
   * Indicates the current "selected" state of various widgets.
   * @see aria-checked @see aria-pressed.
   */
  "aria-selected"?: Booleanish | undefined
  /**
   * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
   * @see aria-posinset.
   */
  "aria-setsize"?: number | undefined
  /** Indicates if items in a table or grid are sorted in ascending or descending order. */
  "aria-sort"?: "none" | "ascending" | "descending" | "other" | undefined
  /** Defines the maximum allowed value for a range widget. */
  "aria-valuemax"?: number | undefined
  /** Defines the minimum allowed value for a range widget. */
  "aria-valuemin"?: number | undefined
  /**
   * Defines the current value for a range widget.
   * @see aria-valuetext.
   */
  "aria-valuenow"?: number | undefined
  /** Defines the human readable text alternative of aria-valuenow for a range widget. */
  "aria-valuetext"?: string | undefined
}

// All the WAI-ARIA 1.1 role attribute values from https://www.w3.org/TR/wai-aria-1.1/#role_definitions
type AriaRole =
  | "alert"
  | "alertdialog"
  | "application"
  | "article"
  | "banner"
  | "button"
  | "cell"
  | "checkbox"
  | "columnheader"
  | "combobox"
  | "complementary"
  | "contentinfo"
  | "definition"
  | "dialog"
  | "directory"
  | "document"
  | "feed"
  | "figure"
  | "form"
  | "grid"
  | "gridcell"
  | "group"
  | "heading"
  | "img"
  | "link"
  | "list"
  | "listbox"
  | "listitem"
  | "log"
  | "main"
  | "marquee"
  | "math"
  | "menu"
  | "menubar"
  | "menuitem"
  | "menuitemcheckbox"
  | "menuitemradio"
  | "navigation"
  | "none"
  | "note"
  | "option"
  | "presentation"
  | "progressbar"
  | "radio"
  | "radiogroup"
  | "region"
  | "row"
  | "rowgroup"
  | "rowheader"
  | "scrollbar"
  | "search"
  | "searchbox"
  | "separator"
  | "slider"
  | "spinbutton"
  | "status"
  | "switch"
  | "tab"
  | "table"
  | "tablist"
  | "tabpanel"
  | "term"
  | "textbox"
  | "timer"
  | "toolbar"
  | "tooltip"
  | "tree"
  | "treegrid"
  | "treeitem"
  | (string & {})

export type StyleInput = string | CSSProperties | (string | CSSProperties)[]

export interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
  // Extension
  namespaceURI?: string | undefined
  class?: ClassNames | undefined
  innerHTML?: string | undefined
  innerText?: string | undefined
  textContent?: string | undefined
  dataset?: { [key: string]: string } | undefined

  // Standard HTML Attributes
  accessKey?: string | undefined
  autoFocus?: boolean | undefined
  className?: ClassNames | undefined
  contentEditable?: Booleanish | "inherit" | "plaintext-only" | undefined
  contextMenu?: string | undefined
  dir?: string | undefined
  draggable?: Booleanish | undefined
  hidden?: boolean | undefined
  id?: string | undefined
  lang?: string | undefined
  nonce?: string | undefined
  placeholder?: string | undefined
  slot?: string | undefined
  spellCheck?: Booleanish | undefined
  style?: StyleInput | undefined
  tabIndex?: number | undefined
  title?: string | undefined
  translate?: "yes" | "no" | undefined

  // Unknown
  radioGroup?: string | undefined // <command>, <menuitem>

  // WAI-ARIA
  role?: AriaRole | undefined

  // RDFa Attributes
  about?: string | undefined
  content?: string | undefined
  datatype?: string | undefined
  inlist?: any | undefined
  prefix?: string | undefined
  property?: string | undefined
  rel?: string | undefined
  resource?: string | undefined
  rev?: string | undefined
  typeof?: string | undefined
  vocab?: string | undefined

  // Non-standard Attributes
  autoCapitalize?: string | undefined
  autoCorrect?: string | undefined
  autoSave?: string | undefined
  color?: string | undefined
  itemProp?: string | undefined
  itemScope?: boolean | undefined
  itemType?: string | undefined
  itemID?: string | undefined
  itemRef?: string | undefined
  results?: number | undefined
  security?: string | undefined
  unselectable?: "on" | "off" | undefined

  // Living Standard
  /**
   * Hints at the type of data that might be entered by the user while editing the element or its contents
   * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
   */
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search"
    | undefined
  /**
   * Specify that a standard HTML element should behave like a defined custom built-in element
   * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
   */
  is?: string | undefined
}

export interface AllHTMLAttributes<T> extends HTMLAttributes<T> {
  // Standard HTML Attributes
  accept?: string | undefined
  acceptCharset?: string | undefined
  action?: string | undefined
  allowFullScreen?: boolean | undefined
  allowTransparency?: boolean | undefined
  alt?: string | undefined
  as?: string | undefined
  async?: boolean | undefined
  autoComplete?: string | undefined
  autoFocus?: boolean | undefined
  autoPlay?: boolean | undefined
  capture?: boolean | "user" | "environment" | undefined
  cellPadding?: number | string | undefined
  cellSpacing?: number | string | undefined
  charSet?: string | undefined
  challenge?: string | undefined
  checked?: boolean | undefined
  cite?: string | undefined
  classID?: string | undefined
  cols?: number | undefined
  colSpan?: number | undefined
  content?: string | undefined
  controls?: boolean | undefined
  coords?: string | undefined
  crossOrigin?: CrossOrigin
  data?: string | undefined
  dateTime?: string | undefined
  default?: boolean | undefined
  defer?: boolean | undefined
  disabled?: boolean | undefined
  download?: any
  encType?: string | undefined
  form?: string | undefined
  formAction?: string | undefined
  formEncType?: string | undefined
  formMethod?: string | undefined
  formNoValidate?: boolean | undefined
  formTarget?: string | undefined
  frameBorder?: number | string | undefined
  headers?: string | undefined
  height?: number | string | undefined
  high?: number | undefined
  href?: string | undefined
  hrefLang?: string | undefined
  htmlFor?: string | undefined
  httpEquiv?: string | undefined
  integrity?: string | undefined
  keyParams?: string | undefined
  keyType?: string | undefined
  kind?: string | undefined
  label?: string | undefined
  list?: string | undefined
  loop?: boolean | undefined
  low?: number | undefined
  manifest?: string | undefined
  marginHeight?: number | undefined
  marginWidth?: number | undefined
  max?: number | string | undefined
  maxLength?: number | undefined
  media?: string | undefined
  mediaGroup?: string | undefined
  method?: string | undefined
  min?: number | string | undefined
  minLength?: number | undefined
  multiple?: boolean | undefined
  muted?: boolean | undefined
  name?: string | undefined
  noValidate?: boolean | undefined
  open?: boolean | undefined
  optimum?: number | undefined
  pattern?: string | undefined
  placeholder?: string | undefined
  playsInline?: boolean | undefined
  poster?: string | undefined
  preload?: string | undefined
  readOnly?: boolean | undefined
  required?: boolean | undefined
  reversed?: boolean | undefined
  rows?: number | undefined
  rowSpan?: number | undefined
  sandbox?: string | undefined
  scope?: string | undefined
  scoped?: boolean | undefined
  scrolling?: string | undefined
  seamless?: boolean | undefined
  selected?: boolean | undefined
  shape?: string | undefined
  size?: number | undefined
  sizes?: string | undefined
  span?: number | undefined
  src?: string | undefined
  srcDoc?: string | undefined
  srcLang?: string | undefined
  srcSet?: string | undefined
  start?: number | undefined
  step?: number | string | undefined
  summary?: string | undefined
  target?: string | undefined
  type?: string | undefined
  useMap?: string | undefined
  value?: string | number | undefined
  width?: number | string | undefined
  wmode?: string | undefined
  wrap?: string | undefined
}

export type HTMLAttributeReferrerPolicy =
  | ""
  | "no-referrer"
  | "no-referrer-when-downgrade"
  | "origin"
  | "origin-when-cross-origin"
  | "same-origin"
  | "strict-origin"
  | "strict-origin-when-cross-origin"
  | "unsafe-url"

export type HTMLAttributeAnchorTarget = "_self" | "_blank" | "_parent" | "_top" | (string & {})

interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
  download?: any | undefined
  href?: string | undefined
  hrefLang?: string | undefined
  media?: string | undefined
  ping?: string | undefined
  target?: HTMLAttributeAnchorTarget | undefined
  type?: string | undefined
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined
}

interface AudioHTMLAttributes<T> extends MediaHTMLAttributes<T> {}

interface AreaHTMLAttributes<T> extends HTMLAttributes<T> {
  alt?: string | undefined
  coords?: string | undefined
  download?: any | undefined
  href?: string | undefined
  hrefLang?: string | undefined
  media?: string | undefined
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined
  shape?: string | undefined
  target?: string | undefined
}

interface BaseHTMLAttributes<T> extends HTMLAttributes<T> {
  href?: string | undefined
  target?: string | undefined
}

interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {
  cite?: string | undefined
}

interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
  disabled?: boolean | undefined
  form?: string | undefined
  formAction?: string | undefined
  formEncType?: string | undefined
  formMethod?: string | undefined
  formNoValidate?: boolean | undefined
  formTarget?: string | undefined
  name?: string | undefined
  type?: "submit" | "reset" | "button" | undefined
  value?: string | number | undefined
}

interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
  height?: number | string | undefined
  width?: number | string | undefined
}

interface ColHTMLAttributes<T> extends HTMLAttributes<T> {
  span?: number | undefined
  width?: number | string | undefined
}

interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {
  span?: number | undefined
}

interface DataHTMLAttributes<T> extends HTMLAttributes<T> {
  value?: string | number | undefined
}

interface DetailsHTMLAttributes<T> extends HTMLAttributes<T> {
  open?: boolean | undefined
  onToggle?: ReactEventHandler<T> | undefined
}

interface DelHTMLAttributes<T> extends HTMLAttributes<T> {
  cite?: string | undefined
  dateTime?: string | undefined
}

interface DialogHTMLAttributes<T> extends HTMLAttributes<T> {
  onCancel?: ReactEventHandler<T> | undefined
  onClose?: ReactEventHandler<T> | undefined
  open?: boolean | undefined
}

interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
  height?: number | string | undefined
  src?: string | undefined
  type?: string | undefined
  width?: number | string | undefined
}

interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
  disabled?: boolean | undefined
  form?: string | undefined
  name?: string | undefined
}

interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
  acceptCharset?: string | undefined
  action?: string | undefined
  autoComplete?: string | undefined
  encType?: string | undefined
  method?: string | undefined
  name?: string | undefined
  noValidate?: boolean | undefined
  target?: string | undefined
}

interface HtmlHTMLAttributes<T> extends HTMLAttributes<T> {
  manifest?: string | undefined
}

interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
  allow?: string | undefined
  allowFullScreen?: boolean | undefined
  allowTransparency?: boolean | undefined
  /** @deprecated */
  frameBorder?: number | string | undefined
  height?: number | string | undefined
  loading?: "eager" | "lazy" | undefined
  /** @deprecated */
  marginHeight?: number | undefined
  /** @deprecated */
  marginWidth?: number | undefined
  name?: string | undefined
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined
  sandbox?: string | undefined
  /** @deprecated */
  scrolling?: string | undefined
  seamless?: boolean | undefined
  src?: string | undefined
  srcDoc?: string | undefined
  width?: number | string | undefined
}

interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
  alt?: string | undefined
  crossOrigin?: CrossOrigin
  decoding?: "async" | "auto" | "sync" | undefined
  height?: number | string | undefined
  loading?: "eager" | "lazy" | undefined
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined
  sizes?: string | undefined
  src?: string | undefined
  srcSet?: string | undefined
  useMap?: string | undefined
  width?: number | string | undefined
}

interface InsHTMLAttributes<T> extends HTMLAttributes<T> {
  cite?: string | undefined
  dateTime?: string | undefined
}

type HTMLInputTypeAttribute =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week"
  | (string & {})

interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
  accept?: string | undefined
  alt?: string | undefined
  autoComplete?: string | undefined
  autoFocus?: boolean | undefined
  capture?: boolean | "user" | "environment" | undefined // https://www.w3.org/TR/html-media-capture/#the-capture-attribute
  checked?: boolean | undefined
  disabled?: boolean | undefined
  enterKeyHint?: "enter" | "done" | "go" | "next" | "previous" | "search" | "send" | undefined
  form?: string | undefined
  formAction?: string | undefined
  formEncType?: string | undefined
  formMethod?: string | undefined
  formNoValidate?: boolean | undefined
  formTarget?: string | undefined
  height?: number | string | undefined
  list?: string | undefined
  max?: number | string | undefined
  maxLength?: number | undefined
  min?: number | string | undefined
  minLength?: number | undefined
  multiple?: boolean | undefined
  name?: string | undefined
  pattern?: string | undefined
  placeholder?: string | undefined
  readOnly?: boolean | undefined
  required?: boolean | undefined
  size?: number | undefined
  src?: string | undefined
  step?: number | string | undefined
  type?: HTMLInputTypeAttribute | undefined
  value?: string | readonly string[] | number | undefined
  width?: number | string | undefined

  onChange?: ChangeEventHandler<T> | undefined
}

interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {
  challenge?: string | undefined
  disabled?: boolean | undefined
  form?: string | undefined
  keyType?: string | undefined
  keyParams?: string | undefined
  name?: string | undefined
}

interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
  form?: string | undefined
  htmlFor?: string | undefined
}

interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
  value?: number | undefined
}

interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
  as?: string | undefined
  crossOrigin?: CrossOrigin
  disabled?: boolean
  fetchPriority?: "high" | "low" | "auto"
  href?: string | undefined
  hrefLang?: string | undefined
  integrity?: string | undefined
  media?: string | undefined
  imageSrcSet?: string | undefined
  imageSizes?: string | undefined
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined
  sizes?: string | undefined
  type?: string | undefined
  charSet?: string | undefined
}

interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
  name?: string | undefined
}

interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
  type?: string | undefined
}

interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
  autoPlay?: boolean | undefined
  controls?: boolean | undefined
  controlsList?: string | undefined
  loop?: boolean | undefined
  mediaGroup?: string | undefined
  muted?: boolean | undefined
  playsInline?: boolean | undefined
  preload?: string | undefined
  src?: string | undefined
}

interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
  charSet?: string | undefined
  content?: string | undefined
  httpEquiv?: string | undefined
  name?: string | undefined
  media?: string | undefined
}

interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
  form?: string | undefined
  high?: number | undefined
  low?: number | undefined
  max?: number | string | undefined
  min?: number | string | undefined
  optimum?: number | undefined
  value?: number | undefined
}

interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
  cite?: string | undefined
}

interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
  classID?: string | undefined
  data?: string | undefined
  form?: string | undefined
  height?: number | string | undefined
  name?: string | undefined
  type?: string | undefined
  useMap?: string | undefined
  width?: number | string | undefined
  wmode?: string | undefined
}

interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
  reversed?: boolean | undefined
  start?: number | undefined
  type?: "1" | "a" | "A" | "i" | "I" | undefined
}

interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
  disabled?: boolean | undefined
  label?: string | undefined
}

interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
  disabled?: boolean | undefined
  label?: string | undefined
  selected?: boolean | undefined
  value?: string | number | undefined
}

interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
  form?: string | undefined
  htmlFor?: string | undefined
  name?: string | undefined
}

interface ParamHTMLAttributes<T> extends HTMLAttributes<T> {
  name?: string | undefined
  value?: string | readonly string[] | number | undefined
}

interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
  max?: number | string | undefined
  value?: number | undefined
}

interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
  async?: boolean | undefined
  /** @deprecated */
  charSet?: string | undefined
  crossOrigin?: CrossOrigin
  defer?: boolean | undefined
  integrity?: string | undefined
  noModule?: boolean | undefined
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined
  src?: string | undefined
  type?: string | undefined
}

interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
  autoComplete?: string | undefined
  disabled?: boolean | undefined
  form?: string | undefined
  multiple?: boolean | undefined
  name?: string | undefined
  required?: boolean | undefined
  size?: number | undefined
  value?: string | readonly string[] | number | undefined
  onChange?: ChangeEventHandler<T> | undefined
}

interface SlotHTMLAttributes<T> extends HTMLAttributes<T> {
  name?: string | undefined
}

interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
  height?: number | string | undefined
  media?: string | undefined
  sizes?: string | undefined
  src?: string | undefined
  srcSet?: string | undefined
  type?: string | undefined
  width?: number | string | undefined
}

interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
  media?: string | undefined
  scoped?: boolean | undefined
  type?: string | undefined
}

interface TableHTMLAttributes<T> extends HTMLAttributes<T> {
  align?: "left" | "center" | "right" | undefined
  bgcolor?: string | undefined
  border?: number | undefined
  cellPadding?: number | string | undefined
  cellSpacing?: number | string | undefined
  frame?: boolean | undefined
  rules?: "none" | "groups" | "rows" | "columns" | "all" | undefined
  summary?: string | undefined
  width?: number | string | undefined
}

interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
  autoComplete?: string | undefined
  cols?: number | undefined
  dirName?: string | undefined
  disabled?: boolean | undefined
  form?: string | undefined
  maxLength?: number | undefined
  minLength?: number | undefined
  name?: string | undefined
  placeholder?: string | undefined
  readOnly?: boolean | undefined
  required?: boolean | undefined
  rows?: number | undefined
  value?: string | number | undefined
  wrap?: string | undefined

  onChange?: ChangeEventHandler<T> | undefined
}

interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
  align?: "left" | "center" | "right" | "justify" | "char" | undefined
  colSpan?: number | undefined
  headers?: string | undefined
  rowSpan?: number | undefined
  scope?: string | undefined
  abbr?: string | undefined
  height?: number | string | undefined
  width?: number | string | undefined
  valign?: "top" | "middle" | "bottom" | "baseline" | undefined
}

interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
  align?: "left" | "center" | "right" | "justify" | "char" | undefined
  colSpan?: number | undefined
  headers?: string | undefined
  rowSpan?: number | undefined
  scope?: string | undefined
  abbr?: string | undefined
}

interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
  dateTime?: string | undefined
}

interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
  default?: boolean | undefined
  kind?: string | undefined
  label?: string | undefined
  src?: string | undefined
  srcLang?: string | undefined
}

interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
  height?: number | string | undefined
  playsInline?: boolean | undefined
  poster?: string | undefined
  width?: number | string | undefined
  disablePictureInPicture?: boolean | undefined
  disableRemotePlayback?: boolean | undefined
}

// this list is "complete" in that it contains every SVG attribute
// that React supports, but the types can be improved.
// Full list here: https://facebook.github.io/react/docs/dom-elements.html
//
// The three broad type categories are (in order of restrictiveness):
//   - "number | string"
//   - "string"
//   - union of string literals
export interface SVGAttributes<T> extends AriaAttributes, DOMAttributes<T> {
  // React-specific Attributes, noop in jsx-dom
  suppressHydrationWarning?: boolean | undefined

  // Attributes which also defined in HTMLAttributes
  // See comment in SVGDOMPropertyConfig.js
  class?: ClassNames | undefined
  className?: ClassNames | undefined
  color?: string | undefined
  height?: number | string | undefined
  id?: string | undefined
  lang?: string | undefined
  max?: number | string | undefined
  media?: string | undefined
  method?: string | undefined
  min?: number | string | undefined
  name?: string | undefined
  slot?: string | undefined
  style?: string | CSSProperties | undefined
  target?: string | undefined
  type?: string | undefined
  width?: number | string | undefined

  // Other HTML properties supported by SVG elements in browsers
  role?: AriaRole | undefined
  tabIndex?: number | undefined
  crossOrigin?: CrossOrigin

  // SVG Specific attributes
  accentHeight?: number | string | undefined
  accumulate?: "none" | "sum" | undefined
  additive?: "replace" | "sum" | undefined
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
    | undefined
  allowReorder?: "no" | "yes" | undefined
  alphabetic?: number | string | undefined
  amplitude?: number | string | undefined
  arabicForm?: "initial" | "medial" | "terminal" | "isolated" | undefined
  ascent?: number | string | undefined
  attributeName?: string | undefined
  attributeType?: string | undefined
  autoReverse?: Booleanish | undefined
  azimuth?: number | string | undefined
  baseFrequency?: number | string | undefined
  baselineShift?: number | string | undefined
  baseProfile?: number | string | undefined
  bbox?: number | string | undefined
  begin?: number | string | undefined
  bias?: number | string | undefined
  by?: number | string | undefined
  calcMode?: number | string | undefined
  capHeight?: number | string | undefined
  clip?: number | string | undefined
  clipPath?: string | undefined
  clipPathUnits?: number | string | undefined
  clipRule?: number | string | undefined
  colorInterpolation?: number | string | undefined
  colorInterpolationFilters?: "auto" | "sRGB" | "linearRGB" | "inherit" | undefined
  colorProfile?: number | string | undefined
  colorRendering?: number | string | undefined
  contentScriptType?: number | string | undefined
  contentStyleType?: number | string | undefined
  cursor?: number | string | undefined
  cx?: number | string | undefined
  cy?: number | string | undefined
  d?: string | undefined
  decelerate?: number | string | undefined
  descent?: number | string | undefined
  diffuseConstant?: number | string | undefined
  direction?: number | string | undefined
  display?: number | string | undefined
  divisor?: number | string | undefined
  dominantBaseline?: number | string | undefined
  dur?: number | string | undefined
  dx?: number | string | undefined
  dy?: number | string | undefined
  edgeMode?: number | string | undefined
  elevation?: number | string | undefined
  enableBackground?: number | string | undefined
  end?: number | string | undefined
  exponent?: number | string | undefined
  externalResourcesRequired?: Booleanish | undefined
  fill?: string | undefined
  fillOpacity?: number | string | undefined
  fillRule?: "nonzero" | "evenodd" | "inherit" | undefined
  filter?: string | undefined
  filterRes?: number | string | undefined
  filterUnits?: number | string | undefined
  floodColor?: number | string | undefined
  floodOpacity?: number | string | undefined
  focusable?: Booleanish | "auto" | undefined
  fontFamily?: string | undefined
  fontSize?: number | string | undefined
  fontSizeAdjust?: number | string | undefined
  fontStretch?: number | string | undefined
  fontStyle?: number | string | undefined
  fontVariant?: number | string | undefined
  fontWeight?: number | string | undefined
  format?: number | string | undefined
  fr?: number | string | undefined
  from?: number | string | undefined
  fx?: number | string | undefined
  fy?: number | string | undefined
  g1?: number | string | undefined
  g2?: number | string | undefined
  glyphName?: number | string | undefined
  glyphOrientationHorizontal?: number | string | undefined
  glyphOrientationVertical?: number | string | undefined
  glyphRef?: number | string | undefined
  gradientTransform?: string | undefined
  gradientUnits?: string | undefined
  hanging?: number | string | undefined
  horizAdvX?: number | string | undefined
  horizOriginX?: number | string | undefined
  href?: string | undefined
  ideographic?: number | string | undefined
  imageRendering?: number | string | undefined
  in2?: number | string | undefined
  in?: string | undefined
  intercept?: number | string | undefined
  k1?: number | string | undefined
  k2?: number | string | undefined
  k3?: number | string | undefined
  k4?: number | string | undefined
  k?: number | string | undefined
  kernelMatrix?: number | string | undefined
  kernelUnitLength?: number | string | undefined
  kerning?: number | string | undefined
  keyPoints?: number | string | undefined
  keySplines?: number | string | undefined
  keyTimes?: number | string | undefined
  lengthAdjust?: number | string | undefined
  letterSpacing?: number | string | undefined
  lightingColor?: number | string | undefined
  limitingConeAngle?: number | string | undefined
  local?: number | string | undefined
  markerEnd?: string | undefined
  markerHeight?: number | string | undefined
  markerMid?: string | undefined
  markerStart?: string | undefined
  markerUnits?: number | string | undefined
  markerWidth?: number | string | undefined
  mask?: string | undefined
  maskContentUnits?: number | string | undefined
  maskUnits?: number | string | undefined
  mathematical?: number | string | undefined
  mode?: number | string | undefined
  numOctaves?: number | string | undefined
  offset?: number | string | undefined
  opacity?: number | string | undefined
  operator?: number | string | undefined
  order?: number | string | undefined
  orient?: number | string | undefined
  orientation?: number | string | undefined
  origin?: number | string | undefined
  overflow?: number | string | undefined
  overlinePosition?: number | string | undefined
  overlineThickness?: number | string | undefined
  paintOrder?: number | string | undefined
  panose1?: number | string | undefined
  path?: string | undefined
  pathLength?: number | string | undefined
  patternContentUnits?: string | undefined
  patternTransform?: number | string | undefined
  patternUnits?: string | undefined
  pointerEvents?: number | string | undefined
  points?: string | undefined
  pointsAtX?: number | string | undefined
  pointsAtY?: number | string | undefined
  pointsAtZ?: number | string | undefined
  preserveAlpha?: Booleanish | undefined
  preserveAspectRatio?: string | undefined
  primitiveUnits?: number | string | undefined
  r?: number | string | undefined
  radius?: number | string | undefined
  refX?: number | string | undefined
  refY?: number | string | undefined
  renderingIntent?: number | string | undefined
  repeatCount?: number | string | undefined
  repeatDur?: number | string | undefined
  requiredExtensions?: number | string | undefined
  requiredFeatures?: number | string | undefined
  restart?: number | string | undefined
  result?: string | undefined
  rotate?: number | string | undefined
  rx?: number | string | undefined
  ry?: number | string | undefined
  scale?: number | string | undefined
  seed?: number | string | undefined
  shapeRendering?: number | string | undefined
  slope?: number | string | undefined
  spacing?: number | string | undefined
  specularConstant?: number | string | undefined
  specularExponent?: number | string | undefined
  speed?: number | string | undefined
  spreadMethod?: string | undefined
  startOffset?: number | string | undefined
  stdDeviation?: number | string | undefined
  stemh?: number | string | undefined
  stemv?: number | string | undefined
  stitchTiles?: number | string | undefined
  stopColor?: string | undefined
  stopOpacity?: number | string | undefined
  strikethroughPosition?: number | string | undefined
  strikethroughThickness?: number | string | undefined
  string?: number | string | undefined
  stroke?: string | undefined
  strokeDasharray?: string | number | undefined
  strokeDashoffset?: string | number | undefined
  strokeLinecap?: "butt" | "round" | "square" | "inherit" | undefined
  strokeLinejoin?: "miter" | "round" | "bevel" | "inherit" | undefined
  strokeMiterlimit?: number | string | undefined
  strokeOpacity?: number | string | undefined
  strokeWidth?: number | string | undefined
  surfaceScale?: number | string | undefined
  systemLanguage?: number | string | undefined
  tableValues?: number | string | undefined
  targetX?: number | string | undefined
  targetY?: number | string | undefined
  textAnchor?: string | undefined
  textDecoration?: number | string | undefined
  textLength?: number | string | undefined
  textRendering?: number | string | undefined
  to?: number | string | undefined
  transform?: string | undefined
  u1?: number | string | undefined
  u2?: number | string | undefined
  underlinePosition?: number | string | undefined
  underlineThickness?: number | string | undefined
  unicode?: number | string | undefined
  unicodeBidi?: number | string | undefined
  unicodeRange?: number | string | undefined
  unitsPerEm?: number | string | undefined
  vAlphabetic?: number | string | undefined
  values?: string | undefined
  vectorEffect?: number | string | undefined
  version?: string | undefined
  vertAdvY?: number | string | undefined
  vertOriginX?: number | string | undefined
  vertOriginY?: number | string | undefined
  vHanging?: number | string | undefined
  vIdeographic?: number | string | undefined
  viewBox?: string | undefined
  viewTarget?: number | string | undefined
  visibility?: number | string | undefined
  vMathematical?: number | string | undefined
  widths?: number | string | undefined
  wordSpacing?: number | string | undefined
  writingMode?: number | string | undefined
  x1?: number | string | undefined
  x2?: number | string | undefined
  x?: number | string | undefined
  xChannelSelector?: string | undefined
  xHeight?: number | string | undefined
  xlinkActuate?: string | undefined
  xlinkArcrole?: string | undefined
  xlinkHref?: string | undefined
  xlinkRole?: string | undefined
  xlinkShow?: string | undefined
  xlinkTitle?: string | undefined
  xlinkType?: string | undefined
  xmlBase?: string | undefined
  xmlLang?: string | undefined
  xmlns?: string | undefined
  xmlnsXlink?: string | undefined
  xmlSpace?: string | undefined
  y1?: number | string | undefined
  y2?: number | string | undefined
  y?: number | string | undefined
  yChannelSelector?: string | undefined
  z?: number | string | undefined
  zoomAndPan?: string | undefined
}

interface WebViewHTMLAttributes<T> extends HTMLAttributes<T> {
  allowFullScreen?: boolean | undefined
  allowpopups?: boolean | undefined
  autosize?: boolean | undefined
  blinkfeatures?: string | undefined
  disableblinkfeatures?: string | undefined
  disableguestresize?: boolean | undefined
  disablewebsecurity?: boolean | undefined
  guestinstance?: string | undefined
  httpreferrer?: string | undefined
  nodeintegration?: boolean | undefined
  partition?: string | undefined
  plugins?: boolean | undefined
  preload?: string | undefined
  src?: string | undefined
  useragent?: string | undefined
  webpreferences?: string | undefined
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

type JSXElementConstructor<P> = ((props: P) => ReactNode) | (new (props: P) => Component<any, any>)

export namespace JSX {
  // We don't just alias React.ElementType because React.ElementType
  // historically does more than we need it to.
  // E.g. it also contains .propTypes and so TS also verifies the declared
  // props type does match the declared .propTypes.
  // But if libraries declared their .propTypes but not props type,
  // or they mismatch, you won't be able to use the class component
  // as a JSX.ElementType.
  // We could fix this everywhere but we're ultimately not interested in
  // .propTypes assignability so we might as well drop it entirely here to
  //  reduce the work of the type-checker.
  // TODO: Check impact of making React.ElementType<P = any> = React.JSXElementConstructor<P>
  type ElementType = string | JSXElementConstructor<any>
  type Element = ReactElement

  interface ElementAttributesProperty {
    props: {}
  }
  interface ElementChildrenAttribute {
    children: {}
  }

  interface IntrinsicAttributes extends Attributes {}
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
    blockquote: DetailedHTMLProps<BlockquoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>
    body: DetailedHTMLProps<HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>
    br: DetailedHTMLProps<HTMLAttributes<HTMLBRElement>, HTMLBRElement>
    button: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
    canvas: DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>
    caption: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    center: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    cite: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    code: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    col: DetailedHTMLProps<ColHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>
    colgroup: DetailedHTMLProps<ColgroupHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>
    data: DetailedHTMLProps<DataHTMLAttributes<HTMLDataElement>, HTMLDataElement>
    datalist: DetailedHTMLProps<HTMLAttributes<HTMLDataListElement>, HTMLDataListElement>
    dd: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    del: DetailedHTMLProps<DelHTMLAttributes<HTMLModElement>, HTMLModElement>
    details: DetailedHTMLProps<DetailsHTMLAttributes<HTMLDetailsElement>, HTMLDetailsElement>
    dfn: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    dialog: DetailedHTMLProps<DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>
    div: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    dl: DetailedHTMLProps<HTMLAttributes<HTMLDListElement>, HTMLDListElement>
    dt: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    em: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    embed: DetailedHTMLProps<EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>
    fieldset: DetailedHTMLProps<FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>
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
    input: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
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
    meter: DetailedHTMLProps<MeterHTMLAttributes<HTMLMeterElement>, HTMLMeterElement>
    nav: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    noindex: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    noscript: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    object: DetailedHTMLProps<ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement>
    ol: DetailedHTMLProps<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>
    optgroup: DetailedHTMLProps<OptgroupHTMLAttributes<HTMLOptGroupElement>, HTMLOptGroupElement>
    option: DetailedHTMLProps<OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>
    output: DetailedHTMLProps<OutputHTMLAttributes<HTMLOutputElement>, HTMLOutputElement>
    p: DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>
    param: DetailedHTMLProps<ParamHTMLAttributes<HTMLParamElement>, HTMLParamElement>
    picture: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    pre: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>
    progress: DetailedHTMLProps<ProgressHTMLAttributes<HTMLProgressElement>, HTMLProgressElement>
    q: DetailedHTMLProps<QuoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>
    rp: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    rt: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    ruby: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    s: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    samp: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    search: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
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
    textarea: DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
    tfoot: DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>
    th: DetailedHTMLProps<ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>
    thead: DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>
    time: DetailedHTMLProps<TimeHTMLAttributes<HTMLTimeElement>, HTMLTimeElement>
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
    line: SVGLineElementAttributes<SVGLineElement>
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
    text: SVGTextElementAttributes<SVGTextElement>
    textPath: SVGProps<SVGTextPathElement>
    tspan: SVGProps<SVGTSpanElement>
    use: SVGProps<SVGUseElement>
    view: SVGProps<SVGViewElement>
  }
}
