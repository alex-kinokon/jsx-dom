import type { FunctionComponent, JSX, StyleInput } from "./index"

export type InterpolationFunction<T> = (props: T) => string | number | null

export type StyledComponent<InherentProps> = <AdditionalProps = {}>(
  template: TemplateStringsArray,
  ...interpolations: InterpolationFunction<InherentProps & AdditionalProps>[]
) => FunctionComponent<InherentProps & AdditionalProps>

type HTMLStyledComponentMap = {
  [key in keyof JSX.IntrinsicElements]: StyledComponent<JSX.IntrinsicElements[key]>
}
type CustomStyledComponent = <Props extends { style: any }>(
  customComponent: FunctionComponent<Props>
) => (
  template: TemplateStringsArray,
  ...interpolations: InterpolationFunction<Props>[]
) => FunctionComponent<
  Omit<Props, "style"> & {
    style: StyleInput
  }
>

// type SVGStyledComponentMap = {
//   [key in SVGElementTagNames]: StyledComponent<SVGAttributes<SVGElement>>
// }

declare const styled: HTMLStyledComponentMap & CustomStyledComponent // & SVGStyledComponentMap
