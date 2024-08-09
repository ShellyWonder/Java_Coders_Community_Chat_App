// quill.js: Handles Quill editor initialization and related functionalities.

let quill;

export function initializeQuill(editorElement) {
  const editorElement = document.querySelector('#editor');
  if (editorElement) {
    quill = new Quill('#editor', { theme: "snow" });
  }
}

export function getQuillContent() {
  return quill ? quill.root.innerHTML.trim() : "";
}

export function resetQuillContent() {
  if (quill) {
    quill.setText("");
  }
}
