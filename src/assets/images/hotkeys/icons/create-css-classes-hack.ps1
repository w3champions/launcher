$hackFileReforged = ".\hack-classes-reforged.txt"
$hackFileClassic = ".\hack-classes-classic.txt"

New-Item $hackFileReforged -Force
New-Item $hackFileClassic -Force

$pictures = Get-ChildItem -Path "./reforged"
foreach ($pic in $pictures){
    $picName = $pic.Name.split(".")[0]

    Add-Content $hackFileReforged ".$picName {"
    Add-Content $hackFileReforged "  background: url('~@/assets/images/hotkeys/icons/reforged/$picName.jpg') no-repeat center;"
    Add-Content $hackFileReforged "  background-size: cover;"
    Add-Content $hackFileReforged "}`n"
}

$pictures = Get-ChildItem -Path "./classic"
foreach ($pic in $pictures){
    $picName = $pic.Name.split(".")[0]

    Add-Content $hackFileClassic ".$picName-classic {"
    Add-Content $hackFileClassic "  background: url('~@/assets/images/hotkeys/icons/classic/$picName.png') no-repeat center;"
    Add-Content $hackFileClassic "  background-size: cover;"
    Add-Content $hackFileClassic "}`n"
}
