h1 = document.querySelectorAll("h1");
for (let index = 0; index < h1.length; index++) {
    const element = h1[index];
    element.innerHTML = "Goodbye ";
    
}

console.log(h1);
