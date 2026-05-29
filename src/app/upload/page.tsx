"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { processPdfFile } from "./actions";

export  default function PDFUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setMessage(null);

    try{
      const formData = new FormData();
      formData.append("pdf", file);

      const result = await processPdfFile(formData);  

      if(result.success) {
        setMessage({
          type: "success",
          text: result.message || "PDF processed successfully."
        });
        e.target.value = "";
      } else {
        setMessage({
          type: "error",
          text: result.error || "An error occurred while processing the PDF."
        })
      }
    }catch(error){
      setMessage({
        type: "error",
        text: "Failed to upload and process the PDF file."
      })
    } finally {
      setIsLoading(false);
    }
  }


  return <div>
    <div>
      <h1>PDF Upload</h1>

      <Card>
        <CardContent>
          <div>
            <Label>Upload PDF file</Label>
            <Input
              id="pdf-upload"
              type="file"
              accept="pdf"
              onChange={handleFileUpload}
              disabled={isLoading}
              className="mt-2"
            />
          </div>
          {
            isLoading && (
              <div>
                <Loader2 />
                <span>Uploading...</span>
              </div>
            )
          }

          {
            message && (
              <Alert variant={message.type === "error" ? "destructive" : "default"}>
                <AlertTitle>
                  {message.type === "error" ? "Error" : "Success"}
                </AlertTitle>
                <AlertDescription>
                  {message.text}
                </AlertDescription>
              </Alert>

            )
          }
        </CardContent>
      </Card>
    </div>
  </div>;
}