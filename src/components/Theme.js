
 function updateStatusBar(isDark) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', isDark ? '#0f172b' : '#ffffff');
}

function updateTheme(){
    // const body= document.getElementById('app');
    //   body.classList.toggle("dark");
}
export {updateStatusBar,updateTheme}