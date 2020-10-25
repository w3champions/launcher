$hackFile = ".\hack-classes.txt"

function writeClasses($folder){
    $pictures = Get-ChildItem -Path "./$folder"
    foreach ($pic in $pictures){
        $picName = $pic.Name.split(".")[0]

        Add-Content $hackFile ".$folder-$picName {"
        Add-Content $hackFile "  background: url('~@/assets/images/hotkeys/icons/$folder/$picName.jpg') no-repeat center;"
        Add-Content $hackFile "  background-size: cover;"
        Add-Content $hackFile "}`n"
    }
}

New-Item $hackFile -Force

writeClasses('human')
writeClasses('orc')
writeClasses('undead')
writeClasses('nightelf')
writeClasses('neutral')