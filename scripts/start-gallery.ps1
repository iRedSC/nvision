$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$haRoot = Join-Path $root "refs\home-assistant-frontend"

& (Join-Path $root "scripts\fetch-refs.ps1")
& (Join-Path $root "scripts\sync-gallery.ps1")

Write-Host ""
Write-Host "Starting Home Assistant gallery on http://localhost:8100/#/nvision/cards"
Write-Host "Press Ctrl+C to stop."
Write-Host ""

Push-Location $haRoot
& yarn gulp develop-gallery
Pop-Location
