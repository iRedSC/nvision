$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$refs = Join-Path $root "refs"

New-Item -ItemType Directory -Force -Path $refs | Out-Null

$haPath = Join-Path $refs "home-assistant-frontend"
$haRemote = "https://github.com/home-assistant/frontend.git"
$haBranch = "dev"

function Test-SparseCheckout {
  param([string]$Path)
  $sparseFile = Join-Path $Path ".git\info\sparse-checkout"
  if (-not (Test-Path $sparseFile)) { return $false }
  $content = Get-Content $sparseFile -Raw
  return $content.Trim().Length -gt 0
}

if (Test-Path $haPath) {
  if (Test-SparseCheckout $haPath) {
    Write-Host "Removing sparse home-assistant-frontend checkout for full clone..."
    Remove-Item -Recurse -Force $haPath
  } else {
    Write-Host "Updating refs/home-assistant-frontend..."
    Push-Location $haPath
    git fetch origin $haBranch --depth 1
    git checkout $haBranch
    git pull origin $haBranch
    Pop-Location
  }
}

if (-not (Test-Path $haPath)) {
  Write-Host "Cloning full home-assistant-frontend ($haBranch)..."
  git clone --depth 1 --branch $haBranch $haRemote $haPath
}

$mushroomPath = Join-Path $refs "lovelace-mushroom"
if (-not (Test-Path $mushroomPath)) {
  git clone --depth 1 https://github.com/piitaya/lovelace-mushroom.git $mushroomPath
} else {
  Write-Host "refs/lovelace-mushroom already exists, skipping clone"
}

$haNodeModules = Join-Path $haPath "node_modules"
if (-not (Test-Path $haNodeModules)) {
  Write-Host "Installing home-assistant-frontend dependencies (yarn)..."
  Push-Location $haPath
  if (-not (Get-Command corepack -ErrorAction SilentlyContinue)) {
    Write-Warning "corepack not found; ensure Node.js includes corepack or install yarn manually"
  } else {
    corepack enable | Out-Null
  }
  yarn install --immutable
  Pop-Location
} else {
  Write-Host "home-assistant-frontend node_modules present, skipping yarn install"
}

$haBuildTranslations = Join-Path $haPath "build\translations"
$haSrcTranslations = Join-Path $haPath "src\translations"
New-Item -ItemType Directory -Force -Path $haBuildTranslations | Out-Null
Copy-Item -Force (Join-Path $haSrcTranslations "translationMetadata.json") (Join-Path $haBuildTranslations "translationMetadata.json")

Write-Host "Generating home-assistant-frontend build artifacts..."
Push-Location $haPath
yarn gulp gen-icons-json build-translations build-locale-data
Pop-Location

& (Join-Path $root "scripts\patch-ha-gallery-windows.ps1")

Write-Host "References ready in refs/ (gitignored, local only)"
