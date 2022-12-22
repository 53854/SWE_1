function handleMouseMove(value) {
    const rangeValueElement = document.querySelector("#range-value")
    const inputElement = document.querySelector('input[type="range"]')
    const fillAreaElement = document.querySelector(".fill-area")
    
    const hueRotate = "hue-rotate(" + value + "deg)"
    
    rangeValueElement.textContent = value
    rangeValueElement.style.filter = hueRotate
    
    inputElement.style.filter = hueRotate
    
    fillAreaElement.style.left = value + "vw"
    fillAreaElement.style.width = (100-value) + "vw"
    fillAreaElement.style.filter = hueRotate
  }
  
  