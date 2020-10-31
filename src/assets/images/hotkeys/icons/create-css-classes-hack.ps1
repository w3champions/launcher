$hackFile = ".\hack-classes.txt"

New-Item $hackFile -Force

$pictures = Get-ChildItem -Path "./all"
foreach ($pic in $pictures){
    $picName = $pic.Name.split(".")[0]

    Add-Content $hackFile ".$picName {"
    Add-Content $hackFile "  background: url('~@/assets/images/hotkeys/icons/all/$picName.jpg') no-repeat center;"
    Add-Content $hackFile "  background-size: cover;"
    Add-Content $hackFile "}`n"
}
