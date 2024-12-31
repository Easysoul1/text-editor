function run(){

       let htmlCode = document.getElementById("html-code").value;
       let cssCode = document.getElementById("css-code").value;
       let jsCode = document.getElementById("js-code").value;
       let outPut = document.getElementById("output");
   
       outPut.contentDocument.body.innerHTML = htmlCode + "<style>" + cssCode + "</style>";
       outPut.contentWindow.eval(jsCode);
   
}
const editor = document.getElementById("html-code");

editor.addEventListener('keydown', (e) => {
    const cursorPosition = editor.selectionStart;
    const textBeforeCursor = editor.value.substring(0, cursorPosition);
    const keyword = textBeforeCursor.split(/\s+/).pop();
    const keyWords = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div', '.class', '#id'];

    if (keyWords.includes(keyword)) {
        const nextChar = editor.value.substring(cursorPosition, cursorPosition + 1);
        if (nextChar === '' || /\s|[.,;!?]/.test(nextChar)) {
            const tag = keyword === '.class' || keyword === '#id' ? '' : keyword;
            const autoCompleteCode = `<${tag}>${tag === '' ? '' : `</${tag}>`}`;
            const newText = editor.value.substring(0, cursorPosition - keyword.length) + autoCompleteCode + editor.value.substring(cursorPosition);
            editor.value = newText;
            editor.selectionStart = editor.selectionEnd = cursorPosition - keyword.length + autoCompleteCode.length;
        }
    }
});