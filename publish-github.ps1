# Publish to GitHub Pages
$Gh = "C:\Program Files\GitHub CLI\gh.exe"
$Repo = "chenxingyu12138/kinship-helper"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path

Set-Location $Root
Write-Output "=== Kinship Helper publish ==="

if (-not (Test-Path $Gh)) {
  Write-Output "ERROR: GitHub CLI not found at $Gh"
  exit 1
}

Write-Output "Checking gh auth..."
& $Gh auth status
if ($LASTEXITCODE -ne 0) {
  Write-Output "Run: gh auth login -h github.com -p https -w"
  exit 1
}

Write-Output "Creating repo and pushing..."
& $Gh repo create $Repo --public --description "Chinese kinship helper" --source $Root --remote origin --push
if ($LASTEXITCODE -ne 0) {
  Write-Output "repo create failed, trying git push..."
  git push -u origin main
  if ($LASTEXITCODE -ne 0) { exit 1 }
}

Write-Output ""
Write-Output "Done!"
Write-Output "Repo:  https://github.com/$Repo"
Write-Output "Site:  https://chenxingyu12138.github.io/kinship-helper/"
Write-Output "Wait 1-3 min for Actions deploy, then open the site URL."
