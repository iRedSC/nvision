$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)

& (Join-Path $root "scripts\fetch-refs.ps1")
& (Join-Path $root "scripts\sync-gallery.ps1")

Write-Host ""
Write-Host "Gallery: http://localhost:8100/#/nvision/cards"
Write-Host "Re-run npm run sync-gallery after card changes, then refresh the browser."
Write-Host ""

Push-Location (Join-Path $root "refs\home-assistant-frontend")
yarn gulp develop-gallery
Pop-Location
