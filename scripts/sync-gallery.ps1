$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$haGallery = Join-Path $root "refs\home-assistant-frontend\gallery"
$haPageDest = Join-Path $haGallery "src\pages\nvision"
$nvisionDevDest = Join-Path $haGallery "src\nvision-dev"
$sidebarPath = Join-Path $haGallery "sidebar.js"

if (-not (Test-Path $haGallery)) {
  throw "Missing refs/home-assistant-frontend. Run: npm run fetch-refs"
}

& (Join-Path $root "scripts\patch-ha-gallery-windows.ps1")

New-Item -ItemType Directory -Force -Path $haPageDest | Out-Null
Copy-Item -Force (Join-Path $root "gallery\ha-page\*") $haPageDest

if (Test-Path $nvisionDevDest) {
  Remove-Item -Recurse -Force $nvisionDevDest
}
Copy-Item -Recurse -Force (Join-Path $root "src") $nvisionDevDest
Copy-Item -Force (Join-Path $root "package.json") (Join-Path $nvisionDevDest "package.json")

$nvisionTs = Join-Path $nvisionDevDest "nvision.ts"
$nvisionContent = Get-Content $nvisionTs -Raw
$nvisionContent = $nvisionContent -replace '\.\./package\.json', './package.json'
Set-Content -Path $nvisionTs -Value $nvisionContent -NoNewline

$sidebar = Get-Content $sidebarPath -Raw
if ($sidebar -notmatch 'category:\s*"nvision"') {
  $entry = @"

  {
    category: "nvision",
    icon: mdiViewDashboard,
    header: "nvision",
    pages: ["cards"],
  },
"@
  $sidebar = $sidebar -replace '(export default \[)', "`$1$entry"
  Set-Content -Path $sidebarPath -Value $sidebar -NoNewline
}

Write-Host "Gallery synced to refs/home-assistant-frontend/gallery"
