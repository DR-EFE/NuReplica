
Add-Type -AssemblyName System.Drawing

$srcPath = "D:\Github\NuReplica\src\img\LogoNu.png"
$src = [System.Drawing.Image]::FromFile($srcPath)

function Create-SquareIcon {
    param(
        [string]$outPath,
        [int]$size,
        [int]$logoW,
        [int]$logoH,
        [System.Drawing.Color]$bgColor
    )
    $bmp = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    if ($bgColor -ne [System.Drawing.Color]::Transparent) {
        $brush = New-Object System.Drawing.SolidBrush($bgColor)
        $g.FillRectangle($brush, 0, 0, $size, $size)
        $brush.Dispose()
    } else {
        $g.Clear([System.Drawing.Color]::Transparent)
    }

    $x = ($size - $logoW) / 2
    $y = ($size - $logoH) / 2
    $g.DrawImage($src, $x, $y, $logoW, $logoH)
    $g.Dispose()

    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Output "Saved $outPath ($size x $size)"
}

# 1. assets/images/icon.png: 1024x1024 with solid purple background #820AD1 (RGB: 130, 10, 209)
$nuPurple = [System.Drawing.Color]::FromArgb(255, 130, 10, 209)
# In 1024x1024, let the logo be approx 600x594
Create-SquareIcon "D:\Github\NuReplica\assets\images\icon.png" 1024 600 594 $nuPurple

# 2. assets/images/android-icon-foreground.png: 512x512 transparent with logo centered in adaptive icon safe zone (approx 280x277)
Create-SquareIcon "D:\Github\NuReplica\assets\images\android-icon-foreground.png" 512 280 277 ([System.Drawing.Color]::Transparent)

# 3. assets/images/splash-icon.png: 512x512
Create-SquareIcon "D:\Github\NuReplica\assets\images\splash-icon.png" 512 280 277 ([System.Drawing.Color]::Transparent)

# 4. assets/images/favicon.png: 192x192
Create-SquareIcon "D:\Github\NuReplica\assets\images\favicon.png" 192 140 138 $nuPurple

$src.Dispose()
Write-Output "Done generating all icons!"
