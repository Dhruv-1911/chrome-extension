const btn = document.querySelector(".pickcolor");
const colorgrid = document.querySelector(".colorgrid");
const colorvalue = document.querySelector(".colorvalue");

btn.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    console.log('tab: ', tab);

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: pickcolor,
    }, async (injectionresult) => {
        let [data] = injectionresult;
        if (data.result) {
            let color = data.result.sRGBHex
            colorgrid.style.background = color,
                colorvalue.innerText = color
                try {
                    await navigator.clipboard.writeText(color)
                } catch (error) {
                    console.error(error)
                }
        }
        console.log(injectionresult);
    });
})

async function pickcolor() {
    try {
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open()

    } catch (error) {
        console.error(error)
    }
}