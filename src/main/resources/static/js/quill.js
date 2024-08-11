// quill.js: Handles Quill editor initialization and related functionalities.

let quill;

export function getQuill() {
  return quill;
} 

export function initializeQuill(editorElement) {
  if (editorElement) {
    quill = new Quill(editorElement, { theme: "snow" });
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
