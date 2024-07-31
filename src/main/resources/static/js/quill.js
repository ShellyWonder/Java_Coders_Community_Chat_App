// quill.js: Handles Quill editor initialization and related functionalities.

let quill;

export function initializeQuill(editorElementSelector) {
  const editorElement = document.querySelector(editorElementSelector);
  if (editorElement) {
    quill = new Quill(editorElementSelector, { theme: "snow" });
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
