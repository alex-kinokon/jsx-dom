import { format } from "prettier"
import { prettier as prettierrc } from "../package.json"

export function formatSource(code: string) {
  return format(code, { ...(prettierrc as any), parser: "babel-ts" })
}
