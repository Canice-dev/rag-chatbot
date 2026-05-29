"use server"

// load pdf-parse dynamically to support both ESM and CJS package builds
import { chunkContent } from "@/lib/chunking";
import { db } from "@/lib/db-config";
import { documents } from "@/lib/db-schema";
import { generateEmbeddings } from "@/lib/embeddings";


export async function processPdfFile(formData: FormData) {
  try {
    const file = formData.get("pdf") as File;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const pdfModule = await import("pdf-parse");
    // pdf-parse v2 exports a `PDFParse` class (ESM) or a callable in older builds.
    const PDFParseClass: any = (pdfModule as any).PDFParse ?? (pdfModule as any).default ?? (pdfModule as any);
    let data: any;
    if (typeof PDFParseClass === "function") {
      // If it's a class, instantiate and call getText()
      const parser = new PDFParseClass({ data: buffer });
      const textResult = await parser.getText();
      // Normalize result to previous pdf-parse output shape
      data = {
        numpages: textResult.total,
        numrender: 0,
        info: {},
        metadata: {},
        version: undefined,
        text: textResult.text,
      };
    } else {
      // Fallback: call as function if possible
      const pdfFn: any = pdfModule as any;
      data = await pdfFn(buffer);
    }

    if(!data.text || data.text.trim().length === 0) {
      return {
        success: false,
        error: "No text found in the PDF."
      };
    }

    const chunks = await chunkContent(data.text);
    const embeddings = await generateEmbeddings(chunks);

    const records = chunks.map((chunk, index) => ({
      content: chunk,
      embedding: embeddings[index]
    }));

    await db.insert(documents).values(records);

    return {
      success: true,
      message: `Created ${records.length} searchable chunks.`
    }

  }catch(error) {
    console.error("PDF processing error:", error);
    return {
      success: false,
      error: "Failed to process PDF file."
    };
  }
}