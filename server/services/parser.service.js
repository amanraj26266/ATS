import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export const extractText = async (file) => {
  // PDF
  if (file.mimetype === "application/pdf") {
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(file.buffer)
    });

    const pdf = await loadingTask.promise;
    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map(item => item.str).join(" ") + " ";
    }

    return text;
  }

  // DOCX
  if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const { value } = await mammoth.extractRawText({
      buffer: file.buffer
    });
    return value;
  }

  throw new Error("Unsupported file format");
};
