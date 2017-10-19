window.addEventListener('load', function () {
    let inactiveStars = document.getElementById('rate_background'),
        activeStars = document.getElementById('rate_bar'),
        blockWidth = getComputedStyle(inactiveStars).width.slice(0,-2);
   inactiveStars.addEventListener('click',function (e) {
       e = e || window.event;
       let scale = (e.clientX - inactiveStars.offsetLeft)*100/blockWidth;
       activeStars.style.width = Math.ceil(scale)+"%";
       console.log(scale);
   })
});