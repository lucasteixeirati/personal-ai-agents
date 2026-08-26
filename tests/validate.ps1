param(
    [string]$RepositoryRoot = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[Console]::OutputEncoding = $utf8NoBom
$OutputEncoding = $utf8NoBom
$failures = [System.Collections.Generic.List[string]]::new()
$agentDir = Join-Path $RepositoryRoot 'agents'
$testDir = Join-Path $RepositoryRoot 'tests'
$requiredAgentKeys = @(
    'id', 'name', 'version', 'status', 'domain', 'risk_level', 'language', 'updated', 'tags'
)

function Get-Frontmatter {
    param([string]$Path)

    $lines = Get-Content -LiteralPath $Path -Encoding UTF8
    if ($lines.Count -lt 3 -or $lines[0] -ne '---') {
        return $null
    }

    $closing = -1
    for ($index = 1; $index -lt $lines.Count; $index++) {
        if ($lines[$index] -eq '---') {
            $closing = $index
            break
        }
    }
    if ($closing -lt 2) {
        return $null
    }

    $data = @{}
    foreach ($line in $lines[1..($closing - 1)]) {
        if ($line -match '^([A-Za-z_][A-Za-z0-9_-]*):\s*(.*)$') {
            $data[$Matches[1]] = $Matches[2].Trim()
        }
    }
    return $data
}

$agentFiles = Get-ChildItem -LiteralPath $agentDir -Filter '*.md' -File |
    Where-Object { $_.Name -ne 'catalogo.md' } |
    Sort-Object Name
$ids = @{}

foreach ($file in $agentFiles) {
    $frontmatter = Get-Frontmatter -Path $file.FullName
    if ($null -eq $frontmatter) {
        $failures.Add("Frontmatter ausente ou inválido: $($file.Name)")
        continue
    }

    foreach ($key in $requiredAgentKeys) {
        if (-not $frontmatter.ContainsKey($key) -or [string]::IsNullOrWhiteSpace($frontmatter[$key])) {
            $failures.Add("Campo '$key' ausente: $($file.Name)")
        }
    }

    $id = $frontmatter['id']
    if ($ids.ContainsKey($id)) {
        $failures.Add("ID duplicado '$id': $($file.Name) e $($ids[$id])")
    } else {
        $ids[$id] = $file.Name
    }

    $casePath = Join-Path $testDir "$id.cases.md"
    if (-not (Test-Path -LiteralPath $casePath)) {
        $failures.Add("Casos ausentes para '$id'")
        continue
    }

    $caseFrontmatter = Get-Frontmatter -Path $casePath
    if ($null -eq $caseFrontmatter) {
        $failures.Add("Frontmatter ausente nos casos de '$id'")
        continue
    }
    if ($caseFrontmatter['agent'] -ne $id) {
        $failures.Add("ID divergente nos casos de '$id'")
    }
    if ($caseFrontmatter['agent_version'] -ne $frontmatter['version']) {
        $failures.Add("Versão divergente entre agente e casos: '$id'")
    }

    $caseText = Get-Content -Raw -LiteralPath $casePath -Encoding UTF8
    $caseMatches = [regex]::Matches(
        $caseText,
        '(?ms)^## ([A-Z]{3}-\d{2})\b.*?(?=^## [A-Z]{3}-\d{2}\b|\z)'
    )
    $caseCount = $caseMatches.Count
    if ($caseCount -lt 4) {
        $failures.Add("Menos de quatro cenários para '$id'")
    }
    foreach ($caseMatch in $caseMatches) {
        if ($caseMatch.Value -notmatch '`cr.tico`') {
            $caseId = $caseMatch.Groups[1].Value
            $failures.Add("Cenário '$caseId' sem critério crítico para '$id'")
        }
    }
}

$catalogText = Get-Content -Raw -LiteralPath (Join-Path $agentDir 'catalogo.md') -Encoding UTF8
$startText = Get-Content -Raw -LiteralPath (Join-Path $RepositoryRoot '00-inicio.md') -Encoding UTF8
$testReadmeText = Get-Content -Raw -LiteralPath (Join-Path $testDir 'README.md') -Encoding UTF8

foreach ($id in $ids.Keys) {
    if ($catalogText -notmatch [regex]::Escape("[[$id]]")) {
        $failures.Add("Agente '$id' ausente do catálogo")
    }
    if ($startText -notmatch [regex]::Escape("[[agents/$id]]")) {
        $failures.Add("Agente '$id' ausente da página inicial")
    }
    if ($testReadmeText -notmatch [regex]::Escape("[[$id.cases]]")) {
        $failures.Add("Casos de '$id' ausentes do índice de testes")
    }
}

$requiredEntryPaths = @(
    'AGENTS.md',
    'CLAUDE.md',
    '.github/copilot-instructions.md',
    'adapters/instrucoes-genericas.md',
    'docs/arquitetura.md'
)
foreach ($relativePath in $requiredEntryPaths) {
    if (-not (Test-Path -LiteralPath (Join-Path $RepositoryRoot $relativePath))) {
        $failures.Add("Ponto de entrada ausente: '$relativePath'")
    }
}

$requiredPublicationPaths = @(
    'LICENSE',
    'CODE_OF_CONDUCT.md',
    'CHANGELOG.md',
    'SECURITY.md',
    'CONTRIBUTING.md',
    'context/fonte-de-contexto.template.md',
    'docs/contexto-privado-e-continuidade.md',
    'docs/checklist-publicacao.md',
    '.github/workflows/validate.yml',
    '.github/social-preview.png'
)
foreach ($relativePath in $requiredPublicationPaths) {
    if (-not (Test-Path -LiteralPath (Join-Path $RepositoryRoot $relativePath))) {
        $failures.Add("Artefato de publicação ausente: '$relativePath'")
    }
}

foreach ($relativePath in @(
    'AGENTS.md',
    'CLAUDE.md',
    '.github/copilot-instructions.md',
    'adapters/instrucoes-genericas.md'
)) {
    $entryPath = Join-Path $RepositoryRoot $relativePath
    if (-not (Test-Path -LiteralPath $entryPath)) {
        continue
    }
    $entryText = Get-Content -Raw -LiteralPath $entryPath -Encoding UTF8
    if ($entryText -notmatch [regex]::Escape('agents/orquestrador-pessoal.md')) {
        $failures.Add("Ponto de entrada não referencia o orquestrador: '$relativePath'")
    }
    if ($entryText -notmatch [regex]::Escape('.private/')) {
        $failures.Add("Ponto de entrada não protege contexto privado: '$relativePath'")
    }
}

$markdownFiles = [System.Collections.Generic.List[System.IO.FileInfo]]::new()
Get-ChildItem -LiteralPath $RepositoryRoot -Filter '*.md' -File |
    ForEach-Object { $markdownFiles.Add($_) }
foreach ($folderName in @('.github', 'adapters', 'agents', 'context', 'docs', 'sessions', 'templates', 'tests')) {
    $folderPath = Join-Path $RepositoryRoot $folderName
    if (Test-Path -LiteralPath $folderPath) {
        Get-ChildItem -LiteralPath $folderPath -Filter '*.md' -File -Recurse |
            ForEach-Object { $markdownFiles.Add($_) }
    }
}

foreach ($file in $markdownFiles) {
    $content = Get-Content -Raw -LiteralPath $file.FullName -Encoding UTF8
    foreach ($match in [regex]::Matches($content, '\[\[([^\]|#]+)')) {
        $target = $match.Groups[1].Value
        $candidates = @(
            (Join-Path $file.DirectoryName "$target.md"),
            (Join-Path $RepositoryRoot "$target.md")
        )
        $resolved = $candidates | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
        if (-not $resolved -and $target -notmatch '[\\/]') {
            $resolved = $markdownFiles | Where-Object { $_.BaseName -eq $target } | Select-Object -First 1
        }
        if (-not $resolved) {
            $relative = [System.IO.Path]::GetRelativePath($RepositoryRoot, $file.FullName)
            $failures.Add("Link não resolvido em '$relative': [[$target]]")
        }
    }
}

if ($failures.Count -gt 0) {
    $failures | ForEach-Object { Write-Error $_ }
    exit 1
}

$totalCases = 0
foreach ($caseFile in Get-ChildItem -LiteralPath $testDir -Filter '*.cases.md' -File) {
    $text = Get-Content -Raw -LiteralPath $caseFile.FullName -Encoding UTF8
    $totalCases += ([regex]::Matches($text, '(?m)^## [A-Z]{3}-\d{2}')).Count
}

Write-Output "PASS: $($agentFiles.Count) agentes, $totalCases cenários, frontmatter, versões e links válidos."
