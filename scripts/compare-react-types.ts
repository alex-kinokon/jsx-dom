#!/usr/bin/env tsx

import assert from "node:assert"
import { execSync } from "node:child_process"
import { writeFileSync, rmSync, mkdirSync, readFileSync } from "node:fs"
import { join } from "node:path"

import ky from "ky"

// Compare React TypeScript definitions between two commits from DefinitelyTyped.
interface CommitInfo {
  sha: string
  commit: {
    message: string
  }
}

async function fetchLatestCommitHash(): Promise<string> {
  const commits = await ky
    .get(
      "https://api.github.com/repos/DefinitelyTyped/DefinitelyTyped/commits?path=types/react/index.d.ts&per_page=1"
    )
    .json<CommitInfo[]>()
  return commits[0].sha.substring(0, 7)
}

async function downloadFile(url: string): Promise<string> {
  return await ky.get(url).text()
}

function extractBaselineCommit(filePath: string): string {
  const match = readFileSync(filePath, "utf-8").match(
    /https:\/\/github\.com\/DefinitelyTyped\/DefinitelyTyped\/commit\/([a-f0-9]{40})/
  )
  assert(match)
  return match[1]
}

const projectRoot = process.cwd()
const compareDir = join(projectRoot, "compare")

console.log("🧹 Cleaning compare directory...")
rmSync(compareDir, { recursive: true, force: true })
mkdirSync(compareDir, { recursive: true })

const baselineCommit = extractBaselineCommit(join(projectRoot, "types", "index.d.ts"))
const baselineHash = baselineCommit.substring(0, 7)

console.log(`📌 Baseline: ${baselineHash}`)

const currentHash = await fetchLatestCommitHash()
console.log(`📌 Current: ${currentHash}`)

console.log("⬇️ Downloading baseline version...")
const baselineUrl = `https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/${baselineCommit}/types/react/index.d.ts`
const baselineContent = await downloadFile(baselineUrl)
const baselineFile = join(compareDir, `baseline-${baselineHash}.d.ts`)
writeFileSync(baselineFile, baselineContent)
console.log(`💾 Saved: ${baselineFile}`)

console.log("⬇️ Downloading current version...")
const currentContent = await downloadFile(
  "https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/types/react/index.d.ts"
)
const currentFile = join(compareDir, `${currentHash}-current.d.ts`)
writeFileSync(currentFile, currentContent)
console.log(`💾 Saved: ${currentFile}`)

console.log("🔍 Generating diff...")
const diffFile = join(compareDir, "changes.diff")
try {
  execSync(`diff -u "${baselineFile}" "${currentFile}" > "${diffFile}"`, { stdio: "ignore" })
} catch (error) {
  // diff returns non-zero exit code when files differ, which is expected
  console.log(`📄 Diff generated: ${diffFile}`)
}

console.log("✅ Process completed successfully!")
console.log(`📁 Files created in ./compare/:`)
console.log(`  - 📜 ${baselineHash}.d.ts (baseline)`)
console.log(`  - 📜 ${currentHash}.d.ts (current)`)
console.log(`  - 📄 changes.diff (unified diff)`)
