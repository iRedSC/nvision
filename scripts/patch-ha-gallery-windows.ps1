$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$galleryJs = Join-Path $root "refs\home-assistant-frontend\build-scripts\gulp\gallery.js"

if (-not (Test-Path $galleryJs)) {
  return
}

$content = Get-Content $galleryJs -Raw

if ($content -notmatch "pathToFileURL") {
  $content = $content -replace 'import path from "path";', "import path from `"path`";`nimport { pathToFileURL } from `"url`";"
  $content = $content -replace '\(await import\(sidebarPath\)\)', '(await import(pathToFileURL(sidebarPath).href))'
}

if ($content -notmatch "path\.relative\(pageDir, file\)") {
  $content = $content -replace 'const pageId = file\.substring\(pageDir\.length \+ 1, file\.lastIndexOf\("\."\)\);', @'
const pageId = path
      .relative(pageDir, file)
      .split(path.sep)
      .join("/")
      .replace(/\.[^/.]+$/, "");
'@
}

if ($content -match 'glob\(path\.resolve\(pageDir, "\*\*/\*"\)\)') {
  $content = $content -replace 'const files = await glob\(path\.resolve\(pageDir, "\*\*/\*"\)\);', 'const files = await glob(path.join(pageDir, "**/*").replace(/\\/g, "/"));'
}

Set-Content -Path $galleryJs -Value $content -NoNewline
