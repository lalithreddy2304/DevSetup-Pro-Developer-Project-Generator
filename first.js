let folders=[]

function addFolder(){

let input=document.getElementById("customFolder")

if(input.value==="") return

folders.push(input.value)

renderFolders()

input.value=""

}

function renderFolders(){

let list=document.getElementById("folderList")

list.innerHTML=""

folders.forEach(f=>{

let li=document.createElement("li")

li.textContent=f

list.appendChild(li)

})

}

function toggleTheme(){

document.body.classList.toggle("light")

}

function generateProject(){

let name=document.getElementById("projectName").value
let template=document.getElementById("template").value

if(name===""){

alert("Enter project name")

return

}

let zip=new JSZip()

let folder=zip.folder(name)

let structure=name+"/\n"

if(template==="web"){

folder.file("index.html","<h1>Hello Developer 🚀</h1>")
folder.file("style.css","body{font-family:Arial}")
folder.file("script.js","console.log('App started')")

structure+=" ├ index.html\n ├ style.css\n └ script.js\n"

}

if(template==="node"){

folder.file("index.js","console.log('Node project started')")
folder.file("package.json",
`{
"name":"${name}",
"version":"1.0.0",
"main":"index.js"
}`)

structure+=" ├ index.js\n └ package.json\n"

}

if(template==="python"){

folder.file("main.py","print('Python project started')")

structure+=" └ main.py\n"

}

if(template==="portfolio"){

folder.file("index.html","<h1>My Portfolio</h1>")
folder.file("style.css","body{font-family:sans-serif}")

structure+=" ├ index.html\n └ style.css\n"

}

folders.forEach(f=>{

folder.folder(f)

structure+=" ├ "+f+"/\n"

})

document.getElementById("preview").textContent=structure

zip.generateAsync({type:"blob"}).then(content=>{

let link=document.createElement("a")

link.href=URL.createObjectURL(content)

link.download=name+".zip"

link.click()

})

}
